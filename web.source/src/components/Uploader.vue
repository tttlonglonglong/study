<template>
	<el-upload
      class="avatar-uploader"
      action="http://up-z0.qiniu.com/"
      :list-type="types"
      :data="data"
      :show-file-list="show"
      :on-success="onSuccess"
      :file-list="picList"
      :before-upload="onBeforeUpload">
      <img v-if="!!src" :src="src" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__text" v-show="!!tips">{{ tips }}</div>
    </el-upload>
</template>

<script>
	
import { mapAction } from 'vuex'
import moment from 'moment'

export default {

	data(){
		return {
			data:{
				token:'',
				key:''
			}
		}
	},
	props:{
		prefix : {
			type:String,
			default: 'AD_'
		},
		tips : {
			type:String,
			default: ''
		},
		src : {
			type:String,
			default: ''
		},
		size:{
			type:Array,
			default(){
				return []
			}
		},
		types:{
			type:String,
			default(){
				return 'text'
			}
		},
		show: {
			type:Boolean,
			default(){
				return false
			}
			
		},
		picList: {
			type:Array,
			default(){
				return []
			}
		}
	},
	computed:{
  	  token(){
        	return this.$store.state.qiniu.token
      },
      domain(){
           return this.$store.state.qiniu.domain
      }
  	},
  	methods:{
  		onBeforeUpload(file){
  			let ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
  			this.data = {
  				key: this.prefix + (+moment()) + ext,
  				token: this.token
  			}
  			if( this.size.length === 2 ){
  				return this.checkImageSize(file,this.size[0],this.size[1] )
  			}else{
  				return Promise.resolve(file)
  			} 			
  		},
  		checkImageSize(file, width,height){
	      return new Promise((resolve,reject) => {
	        let img = new Image()
	        img.onload = e =>{
	          if(img.width == width && img.height == height ){
	            resolve(true)
	          }else{
	            this.$message.error('图片尺寸不对，请重新选择');
	            reject(false)
	          }
	        }
	        img.onerror = e =>{
	          reject(false)
	        }
	        let reader = new FileReader();
	        reader.onload = (evt) => {
	          img.src = evt.target.result
	        }
	        reader.readAsDataURL(file);
	      })    
	    },
  		onSuccess(res){
  			res.prefix = this.prefix
  			res.url = this.domain + res.key
  			this.$emit('onSuccess', res)
  		}
  	}
}

</script>
<style type="text/css">
	.el-upload--picture-card{
		width: auto !important;
		height: auto !important;
	}
	.el-upload--picture-card{
		line-height: 36px !important;
	}
	.el-upload-list--picture-card .el-upload-list__item {
		width: 178px !important;
		height: 214px !important;
	}
</style>