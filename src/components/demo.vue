<template>
	<div class="main">
		<div id="paramter">
			<label for="input">
				<div>
					<img src="../assets/plus.svg" />
				</div>
			</label>
			<div>

			</div>
			<input id='input' type="file" @change="change($event)" style="display: none;" accept="image/*" />
			<div style="display: flex;flex-direction: column;justify-content: center;height: 200px;width: 250px;">
				<div class="ycenter" style="margin-bottom: 10px;">
					<div style="width: 130px;text-align: right;font-size: 20px;height: 30px;line-height: 30px;font-weight: bolder;margin-right: 10px;">缩放/scale</div>
					<input type="number" max="1" min="0" step="0.01" style="width:70px;border: #303133 2px solid;height: 25px;padding: 5px;"
					 v-model="scale" />
				</div>

				<div class="ycenter" style="margin-bottom: 10px;">
					<div style="width: 130px;text-align: right;font-size: 20px;height: 30px;line-height: 30px;font-weight: bolder;margin-right: 10px;">质量/quality</div>
					<input type="number" max="1" min="0" step="0.01" style="width:70px;border: #303133 2px solid;height: 25px;padding: 5px;"
					 v-model="quality" />
				</div>

				<div class="ycenter">
					<div style="margin-right: 20px;" class="ycenter mybutton" @click="change()">
						应用/apply
					</div>
					<div class="ycenter mybutton" @click="reset()">
						重置/reset
					</div>
				</div>
			</div>

		</div>
		<div>
			<img v-if="mysrc" :src="mysrc" class="img" width="400px" />
		</div>
		<div>
			<img :src="url" />
		</div>


	</div>
</template>

<script lang='ts'>
import zipper from '../plugin/zipper'
import { Component, Vue} from 'vue-property-decorator';

interface param{

}
interface inputFile extends Element{
	files:Array<any>
}

@Component
export default class demo extends Vue {
	file:File|null =null
	mysrc:string=''
	url:string=''
	scale:number=1.0
	quality:number=0.82

	change() {
		var myfile = (document.querySelector('#input') as inputFile).files[0];
		let p={
			file:myfile,
			callback:this.callback,
			scale:this.scale,
			quality:this.quality
		}
		zipper(p)
	}
	callback(blob:Blob, url:string) {
		console.log(blob)
		this.mysrc = url
	}
	reset() {
		this.scale = 1;
		this.quality = .82;
	}
	disableBlob() {
		alert("The current system does not support 'canvas.toBlob',please try to set the paramter 'disableBlob'")
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main {
		height: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.img {
		box-shadow: #303133 2px 2px 5px 3px;
	}

	#paramter {
		display: flex;
		justify-content: center;
	}

	.ycenter {
		display: flex;
		align-items: center;
	}

	.mybutton {
		width: 80px;
		background: #2C3E50;
		color: white;
		height: 30px;
		padding: 5px 10px;
		border-radius: 5px;
		font-weight: bolder;
		cursor: pointer;
		box-shadow: crimson 2px 2px 2px 1px;
		border: salmon 1px solid;
		transition: all .2s;
	}

	.mybutton:active {
		box-shadow: none;
		transform: translate(2px, 2px);
	}

	.mybutton:hover {
		border: white 1px solid;
	}
</style>
