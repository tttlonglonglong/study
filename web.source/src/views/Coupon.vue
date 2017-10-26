<template>
  <div class="container">
    <el-card class="box-card">
      <el-form ref="form" label-width="120px">
        <el-form-item label="邀请码输入框">
          <el-switch
            v-model="val"
            on-color="#13ce66"
            off-color="#666"
            @change="change">
          </el-switch>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                val:false
            }
        },
        methods: {
          change(v){
              console.log(v)
          }
        },
        mounted(){
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
