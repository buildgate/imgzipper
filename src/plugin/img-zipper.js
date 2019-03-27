
const ImgZipper = (file, Callback, option) => {
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
	
	const compress = (img, scale, quality, type, callback, disableBlob, orientation, width, height) => {
		let imgcar = new Image();
		imgcar.onload = function() {
			let canvas = document.createElement('canvas');
			let drawer = canvas.getContext("2d");
			let ow,oh;
			if(width||height){
				ow=(width?width:(this.width/this.height*height))*scale;
				oh=(height?height:(this.height/this.width*width))*scale;
			}
			else{
				ow = this.width * scale;
				oh = this.height * scale;
			}
			 
			let canvasoption = [];
			canvasoption[6] = {
				width: oh,
				height: ow,
				angel: Math.PI / 2
			};
			canvasoption[8] = {
				width: oh,
				height: ow,
				angel: -Math.PI / 2
			};
			canvasoption[3] = {
				width: ow,
				height: oh,
				angel: Math.PI
			};
			canvasoption[1] = {
				width: ow,
				height: oh,
				angel: 0
			};
	
			let direction = orientation ? orientation : 1
			canvas.width = canvasoption[direction].width;
			canvas.height = canvasoption[direction].height;
			drawer.translate(canvasoption[direction].width / 2, canvasoption[direction].height / 2);
			drawer.rotate(canvasoption[direction].angel);
			drawer.drawImage(imgcar, -ow / 2, -oh / 2, ow, oh);
	
			try {
				canvas.toBlob(blob => {
					callback ? callback(blob, URL.createObjectURL(blob)) : null;
				}, type, quality);
			} catch (e) {
				disableBlob ? disableBlob(canvas) : console.log(
					"The current system does not support 'canvas.toBlob',please try to set the paramter 'disableBlob'");
			}
		}
		imgcar.src = img;
	}
	
	if (file) {
		const Scale = (option && option.scale) ? parseFloat(option.scale) : 1;
		const Quality = (option && option.quality) ? parseFloat(option.quality) : .82;
		const DisableBlob = (option && option.disableBlob) ? option.disableBlob : null;
		const Type = (option && option.type) ? option.type : 'image/jpeg';
		const Exif = (option && option.exif==false) ? false : true;
		const Width = (option && option.width) ? option.width : false;
		const Height = (option && option.height) ? option.height : false;
		const reader = new FileReader(),
			exifreader = new FileReader();
		if (Exif) {
			exifreader.readAsArrayBuffer(file);
			exifreader.onload = (E) => {
				const Orientation = getOrientation(E.target.result)
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					compress(e.target.result, Scale, Quality, Type, Callback, DisableBlob, Orientation,Width,Height)
				}
			}
		} else {
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				compress(e.target.result, Scale, Quality, Type, Callback, DisableBlob,false,Width,Height)
			}
		}
	}

	return;
}

