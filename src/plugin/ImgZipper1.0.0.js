
(()=>{
	if (!HTMLCanvasElement.prototype.toBlob) {
		Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
			value: function(callback, type, quality) {
				var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
					len = binStr.length,
					arr = new Uint8Array(len);
				for (var i = 0; i < len; i++) {
					arr[i] = binStr.charCodeAt(i);
				}
				callback(new Blob([arr], {
					type: type || 'image/png'
				}));
			}
		});
	}
})()
const getOrientation = (buffer) => {
	const dataview = new DataView(buffer);
	let flag = 2;
	let orientation = false;
	// 检测是否是 JPEG
	if (buffer.length < 2 || dataview.getUint16(0) !== 0xFFD8) {
		return false;
	}
	let maxBytes = dataview.byteLength;
	// 遍历文件内容，找到 APP1, 即 EXIF 所在的标识
	while (flag < maxBytes - 2) {
		let Uint16 = dataview.getUint16(flag);
		if (Uint16 == 0xFFE1) {
			maxBytes = dataview.getUint16(flag += 2) - 2;
			let littleEndian = dataview.getUint16(flag += 8) == 0x4949 ? true : false; //处理字节序标识
			flag += 10;
			while (flag < maxBytes) {
				let uint16 = dataview.getUint16(flag, littleEndian);
				if (uint16 == 0x0112) {
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
const compress = (img, scale, quality, type, callback, orientation, width, height, callbackParameter) => {

	let imgcar = new Image();
	imgcar.onload = function() {
		let canvas = document.createElement('canvas');
		let drawer = canvas.getContext("2d");
		let ow, oh;
		
		if (width || height) {
			if (orientation == 8 || orientation == 6) {
				ow = height ? height : (this.width / this.height * width) ;
				oh = width ? width : (this.height / this.width * height);
			} else {
				ow = width ? width : (this.width / this.height * height);
				oh = height ? height : (this.height / this.width * width);
			}
		} else {
			ow = this.width ;
			oh = this.height ;
		}
		oh*=scale;
		ow*=scale;
		
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

		let direction = orientation || 1;
		let Canvasoption = canvasoption.get(direction);
		canvas.width = Canvasoption.width;
		canvas.height = Canvasoption.height;
		drawer.translate(Canvasoption.width / 2, Canvasoption.height / 2);
		drawer.rotate(Canvasoption.angel);
		drawer.drawImage(imgcar, -ow / 2, -oh / 2, ow, oh);

		canvas.toBlob(blob => {
			callback ? callback(blob, URL.createObjectURL(blob), callbackParameter) : null;
		}, type, quality);
	}
	imgcar.src = img;
}
const ImgZipper = (file, Callback, option) => {
	if (file) {
		const Scale =  parseFloat(option.scale) || 1;
		const Quality = parseFloat(option.quality) || .82;
		const Type =  option.type || 'image/jpeg';
		const Exif = option.exif==false?false:true;
		const Width = option.width||false;
		const Height = option.height||false;
		const CallbackParameter = option.callbackParameter|| null;

		const reader = new FileReader();
			
		if (Exif) {
			let exifreader = new FileReader();
			exifreader.readAsArrayBuffer(file);
			exifreader.onload = (E) => {
				const Orientation = getOrientation(E.target.result)
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					compress(e.target.result, Scale, Quality, Type, Callback, Orientation, Width, Height,
						CallbackParameter)
				}
			}
		} else {
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				compress(e.target.result, Scale, Quality, Type, Callback, false, Width, Height, CallbackParameter)
			}
		}
	}

	return false;
}