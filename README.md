# imgzipper

## Usage

```
import Imgzipper from 'Impzipper'

Impzipper({
    file: File, // File类型的图片源（必选)
    callback: (blob,url)=>{do something} // 用于接收处理后返回的图片（必选），传入blob和base64两种类型
	scale: number, //缩放系数，默认为1
	quality: number, //质量系数，默认为0.82
	exif: boolean, //是否进行拍摄方向校正，默认为true
	type: string, //转换后的图片格式，默认为'image/jpeg'
	width: number, //转换后的宽度，不设置高度时将保持原比例
	height: number, //转换后的高度，不设置宽度时将保持原比例
	callbackParameter: any, //设置callback函数的额外参数
})
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
