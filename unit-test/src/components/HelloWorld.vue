<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
 									
	 <router-link to="/unitTestOne" tag='div' class="router-link">单元测试Demo1</router-link>
	 <router-link to="/unitTestTwo" tag='div' class="router-link">单元测试Demo2</router-link>
	 <router-link to="/unitTestThree" tag='div' class="router-link">单元测试Demo3</router-link>
	 <router-link to="/unitTestFour" tag='div' class="router-link">单元测试Demo4</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to UNIT TEST'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.router-link{
	padding: 10px  0;
	font-weight: bold;
	cursor: pointer;
}
.router-link:hover{
	color: red;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
