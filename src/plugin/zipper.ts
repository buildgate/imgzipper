(()=>{
	if (!HTMLCanvasElement.prototype.toBlob) {
		Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
			value:function(callback:(blob:any)=>any, type:string, quality:number):void {
				let binStr = atob(this.toDataURL(type, quality).split(',')[1]);
				let	len = binStr.length;
				let	arr = new Uint8Array(len);
				for (let i = 0; i < len; i++) {
					arr[i] = binStr.charCodeAt(i);
				}
				callback(new Blob([arr], {
					type: type || 'image/png'
				}));
			}
		});
	}
})()

const getOrientation = (buffer:any) => {
	const dataview:DataView = new DataView(buffer);
	let flag:number = 2;
	let orientation:number|boolean = false;
	// 检测是否是 JPEG
	if (buffer.length < 2 || dataview.getUint16(0) !== 0xFFD8) {
		return false;
	}
	let maxBytes:number = dataview.byteLength;
	// 遍历文件内容，找到 APP1, 即 EXIF 所在的标识
	while (flag < maxBytes - 2) {
		let Uint16:number = dataview.getUint16(flag);
		if (Uint16 === 0xFFE1) {
			maxBytes = dataview.getUint16(flag += 2) - 2;
			let littleEndian:boolean = dataview.getUint16(flag += 8) === 0x4949 ? true : false; //处理字节序标识
			flag += 10;
			while (flag < maxBytes) {
				let uint16:number = dataview.getUint16(flag, littleEndian);
				if (uint16 === 0x0112) {
					orientation = dataview.getUint16(flag + 8, littleEndian);
					return orientation;
				}
				flag += 12;
			}
		}
		flag += 2;
	}
	return orientation;
}

interface optional {
    orientation:number|boolean,
    scale:number,
    quality:number,
	exif:boolean,
    type:string,
    width:number|false,
    height:number|false,
    callbackParameter:any,
}
interface required{
    callback:(blob:Blob|null,url:string,cp?:any)=>void,
    file:any,
}

const compress = (param:optional & required) => {

	let imgcar= new Image();
	imgcar.onload = function() {
		let canvas = document.createElement('canvas');
		let drawer = canvas.getContext("2d");
		let ow:number, oh:number;
		
		if (param.width || param.height) {
			if (param.orientation === 8 || param.orientation === 6) {
				ow = param.height || (imgcar.width / imgcar.height * (param.width as number)) ;
				oh = param.width || (imgcar.height / imgcar.width * (param.height as number));
			} else {
				ow = param.width  ||  (imgcar.width / imgcar.height * (param.height as number));
				oh = param.height || (imgcar.height / imgcar.width * (param.width as number));
			}
		} else {
			ow = imgcar.width ;
			oh = imgcar.height ;
		}
		oh*=param.scale;
		ow*=param.scale;
		
		let canvasoption = new Map();

		canvasoption.set(1, {
			width: ow,
			height: oh,
			angel: 0
		});
		canvasoption.set(3, {
			width: ow,
			height: oh,
			angel: Math.PI
		});
		canvasoption.set(6, {
			width: oh,
			height: ow,
			angel: Math.PI / 2
		});
		canvasoption.set(8, {
			width: oh,
			height: ow,
			angel: -Math.PI / 2
		});

		let direction:number|boolean = param.orientation || 1;
		let Canvasoption = canvasoption.get(direction);
		canvas.width = Canvasoption.width;
		canvas.height = Canvasoption.height;
		(drawer as CanvasRenderingContext2D).translate(Canvasoption.width / 2, Canvasoption.height / 2);
		(drawer as CanvasRenderingContext2D).rotate(Canvasoption.angel);
		(drawer as CanvasRenderingContext2D).drawImage(imgcar, -ow / 2, -oh / 2, ow, oh);

		canvas.toBlob(blob => {
			param.callback ? param.callback(blob, URL.createObjectURL(blob),param.callbackParameter) : null;
		}, param.type, param.quality);
	}
	imgcar.src = param.file;
}

const ImgZipper = <T extends (Partial<optional> & required)>(param:T) => {
	if (param.file) {
		let p:Partial<optional> & required ={...param}
		
		p.scale =  p.scale || 1;
		p.quality = p.quality || .82;
		p.type =  p.type || 'image/jpeg';
		p.exif = p.exif===false?false:true;
		p.width = p.width||false;
		p.height = p.height||false;
		p.callbackParameter = p.callbackParameter|| null;

		let reader = new FileReader();
			
		if (p.exif) {
			let exifreader = new FileReader();
			exifreader.readAsArrayBuffer(p.file);
			exifreader.onload = (E) => {
				const Orientation = getOrientation((E.target as FileReader).result)
				reader.readAsDataURL(p.file);
				reader.onload = (e) => {
					p.file=(e.target as FileReader).result
					compress((p as optional & required))
				}
			}
		} else {
			reader.readAsDataURL(p.file);
			reader.onload = (e) => {
				p.file=(e.target as FileReader).result
				compress((p as optional & required))
			}
		}
	}
	return false;
}

export default ImgZipper;