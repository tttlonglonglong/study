<template>
  <div class="container">
  <el-card class="box-card">
		<div slot="header" class="clearfix">
	    	<span> 编辑商品 </span>
	    	<el-button type="primary" size="small" class="pull-right" @click="back">返回</el-button>	
	  	</div>
  		<el-form ref="form" :model="form" label-width="120px">
		  <el-form-item label="商品名称">
		    <el-input v-model="form.goods_name"></el-input>
		  </el-form-item>
		  <el-form-item label="商品规格">
		    <el-input v-model="form.goods_specification"></el-input>
		  </el-form-item>
		  <el-form-item label="条形码">
		    <el-input v-model="form.goods_barcode"></el-input>
		  </el-form-item>
		  <el-form-item label="参考价格">
		    <el-input v-model="form.goods_proposed_price"></el-input>
		  </el-form-item>

		  <el-form-item label="营业资质">
		    	<el-upload
				  action="http://up-z2.qiniu.com/"
				  list-type="picture-card"
				  :before-upload="onBeforeUpload"
				  :multiple="false" 
				  :data="uploaddata"
				  >
				  <i class="el-icon-plus"></i>
				</el-upload>
		  </el-form-item>

		  <el-form-item>
		    <el-button type="primary" @click="submit">立即创建</el-button>
		    <el-button @click="reset">重置</el-button>
		  </el-form-item>
		</el-form>
		</el-card>
  </div>
</template>

<script>
import moment from 'moment'

import { mapActions } from 'vuex'

export default {
  name: 'merchant-edit',
  data () {
    return {
        uploaddata:{
        	token:''
        }
    }
  },
  computed:{
  	token(){
  		return this.$store.state.qiniu.token
  	},
  	form(){
  		return this.$store.state.merchant.info
  	}
  },
  methods:{
  
  	onBeforeUpload(){
  		this.uploaddata.token = this.token
  	},
  	reset(){
  		this.$refs.form.resetFields();
  	},
  	submit(){
        let data = Object.assign({},this.form)
  		data.merchant_delivery_start += ':00'
  		data.merchant_delivery_end += ':00'

  		this.editMerchant(data).then(res=>{
  			if( res.status == 1 ){
  				this.$message({
		          message: '保存成功',
		          type: 'success',
		          onClose(){
		          	this.reset()
		          	this.back()
		          }
		        });
  			}else{
  				this.$message.error('保存失败，请稍后再试');
  			}
  		},err =>{
  			this.$message.error('未知错误，请稍后再试');
  		})
  	},
  	...mapActions(['getMerchant','editMerchant'])
  },
  mounted(){
  	this.getMerchant({ merchant_id: this.$route.params.id  })
  }
}
</script>
<style lang="scss">
</style>