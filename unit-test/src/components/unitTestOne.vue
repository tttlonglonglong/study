<template>
  <div class="hello">
 	<h1 class="hello-title">{{ msg }}</h1>
    <h2 class="hello-content">{{ content }}</h2>										
   
   
  </div>
</template>

<script>
export default {
  name: "unitTestOne",
    props: {
    content: String
  },
  data() {
    return {
      msg: "Welcome to Your 单元测试一"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
