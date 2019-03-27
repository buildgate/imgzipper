# [imgzipper](https://github.com/B1LLGATE/imgzipper)

## 安装 / install
```
$ npm install imgzipper --save
```

[demo](https://b1llgate.github.io/imgzipper/dist/index.html)

## 使用 / use
**按需在文件中引入即可**
```
import ImgZipper form 'imgzipper'
```

**或者直接引用img-zipper.js**
```
<script src="./lib/imgzipper.js"></script> 
```

### 插件使用
```
ImgZipper( file, //原始图像文件
						callback, //压缩成功回调函数 
					{ scale: 0.9, //生成图像缩放大小
						quality: 0.82, //生成图像的质量
            disableBlob: null, //canvas.toBlob方法失败后调用函数
            type: 'image/jpeg', //生成图像格式
            exif: true, // 是否使用调整相机旋转
						width: xxx, //生成图像的宽度
						height: xxx, //生成图像的高度
		})
```

## 参数 / parameter
- **file (必填/required)**
  - **类型** : File
  - **默认值** : 无 
  - **注释** : 当file输入为空是函数不执行，file只能是单文件且类型为 imgae/*

- **callback (必填/required)**
  - **类型** : Function(blob,url){...}
  - **默认值** : 无
  - **注释** : 本插件采用异步生成图片的方式，函数成功压缩图片后会对callback函数进行调用，并且输入blob（压缩后的图片blob文件类型）和url（压缩后的图片base64文件类型）两个参数

- **scale (选填/optional)**
  - **类型** : Float
  - **默认值** : 1 (0.1.x版本为0.9)
  - **注释** : 定义压缩后的图片尺寸相对大小，基于源图像的尺寸进行缩放，如果用于压缩图像请设置在0~1之间，压缩效果显著

- **quality (选填/optional)**
  - **类型** : Float
  - **默认值** : 0.82
  - **注释** : 定义压缩后的图片质量，影响整体清晰度，如果用于压缩图像建议设置在0~0.82之间，压缩效果不明显

- **disableBlob (选填/optional)**
  - **类型** : Function(canvas){...}
  - **默认值** : 无
  - **注释** : 由于部分低版本的浏览器不兼容canvas.toBlob()方法，当canvas.toBlob()调用失败时会调用callback函数，输入参数为canvas（压缩图像的canvas类型），用户可以视乎情况设置该函数

- **type (选填/optional)**
  - **类型** : String
  - **默认值** : 'image/jpeg'
  - **注释** : 定义压缩后的图片格式，建议使用默认值，使用其他格式将不能确保文件大小有压缩效果

- **exif (选填/optional)**
  - **类型** : Boolean
  - **默认值** : true
  - **注释** : 如果图片为拍摄图片会存在拍摄方向的问题，该参数用于解决图片转向问题，默认开启将图片调整至正确方向，如果不需要此项功能请设置false,**注意此参数只接受布尔类型**

- **width (选填/optional)** 新增new!
  - **类型** : number
  - **默认值** : 无
  - **注释** : 定义压缩后的图片宽度，如果只设置width和height其中一个参数，则生成图片保留原来的比例

- **height (选填/optional)** 新增new!
  - **类型** : number
  - **默认值** : 无
  - **注释** : 定义压缩后的图片高度，如果只设置width和height其中一个参数，则生成图片保留原来的比例