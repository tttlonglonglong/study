<template>
  <div class="container">
	<el-card>
	  404
	</el-card>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      form:{
      	name:'',
      	password:''
      }
    }
  },
  methods:{
  	submit(){}
  }
}
</script>
<style lang="scss" scoped>
	.container{
		width:500px;
		margin: 50px auto;
	}
</style>