<template>
  <div class="container">
	<el-card>
	  <div slot="header" class="clearfix">
	    <span>登录</span>
	  </div>
	  <el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="账号">
		    <el-input v-model="form.admin_mobile"></el-input>
		  </el-form-item>
		  <el-form-item label="密码">
		    <el-input type="password" v-model="form.admin_pwd"></el-input>
		  </el-form-item>

			  <el-form-item>
			    <el-button type="primary" @click="submit">登录</el-button>
			    <el-button>取消</el-button>
			  </el-form-item>
			</el-form>
	</el-card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      form:{
        admin_mobile:'',
        admin_pwd:''
      }
    }
  },
  methods:{
  	submit(){
  	    if( this.form.admin_mobile && this.form.admin_pwd ){
  	        this.login(this.form).then(res=>{
              if( res.code == '0' ){
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$router.push({path:'/'})
              }else{
                this.$message.error('账号不存在或者密码错误');
              }
            })
        }
    },
    ...mapActions(['login'])
  }
}
</script>
<style lang="scss" scoped>
	.container{
		width:500px;
		margin: 50px auto;
	}
</style>
