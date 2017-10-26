<template>
  <div class="hello">
    <h1>{{ msg }}</h1>									
   <div>
    <span class="init-num">初始值为{{ InitNum }}</span><br>
    <span class="click-num">点击了{{ ClickNum }}次</span><br>
    <span class="result-num">最终结果为{{ ResultNum }}</span><br>
    <button @click="add">累加{{ AddNum }}</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "unitTestTwo",
  props: {
    AddNum: {
      type: Number,
      default: 1
    },
    InitNum: {
      type: Number,
      default: 1
	},
	x: Number,
	y:Number
  },
  data() {
    return {
      msg: "Welcome to Your 单元测试二",
      ClickNum: 0,
      ResultNum: 0
    };
  },
  mounted() {
    this.ResultNum = this.InitNum;
  },
  methods: {
    add() {
      this.ResultNum += this.AddNum;
      this.ClickNum++;
      this.$emit("result", {
        ClickNum: this.ClickNum,
        ResultNum: this.ResultNum
      });
    },
    multiplication(x, y) {
      return x*y;
    }
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
