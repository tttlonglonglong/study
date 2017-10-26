<template>
	<div class="navbar">
  		<el-menu theme="dark" :default-active="activeIndex" mode="horizontal" @select="select">
		  	<el-menu-item class="pull-right" index="1">退出</el-menu-item>
			<el-menu-item index="99" v-show="width < 768"> <i class="el-icon-menu"></i></el-menu-item>
		</el-menu>
	</div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'navbar',
  data () {
    return {
      activeIndex: '1',
      width: 1200
    }
  },
  computed:{
  	showMiniSidebar(){
  		return !!this.$store.state.system.sidebar
  	}
  },
  methods:{
  	select(v){
  		switch(v){
  			case '99':
  				this.toggleSidebar()
  			break
        case '1':
          this.$confirm('退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.logout()
          })
          break
  		}
  	},
  	calc(){
  		let { width } =window.getComputedStyle( document.body )
  		this.width = parseFloat(width)
  	},
  	...mapActions(['toggleSidebar','logout'])
  },
  mounted(){
  	window.addEventListener('resize', this.calc )
  	this.calc()
  }
}
</script>

<style lang="scss" rel="stylesheet/less">
	.navbar{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 60px;
		padding-left: 240px;
		transition: all .3s;
		box-sizing:border-box;
		.el-menu{
			border-radius: 0
		}
		@media (max-width: 768px){
			padding-left: 0;
		}
	}
</style>
