<template>
  <div
    class="el-select-dropdown"
    :class="[ popperClass]">
    <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          >
          <li v-for="n in list"><el-checkbox v-model="checkeds" :label="n.value">{{ n.label }}</el-checkbox></li>
    </el-scrollbar>
    <div class="multiple-select-menu-bottom">
      	<el-checkbox v-model="checkedAll">全选</el-checkbox>
      	<el-button size="small" type="info" class="pull-right" @click="getChecked">  确定</el-button>
     </div>
  </div>
</template>

<script type="text/babel">
	import Popper from 'element-ui/lib/utils/vue-popper'
  export default {
    name: 'MultipleSelectMenu',
    componentName: 'MultipleSelectMenu',
    mixins: [Popper],
    props: {
      placement: {
        default: 'bottom-start'
      },

      boundariesPadding: {
        default: 0
      },

      popperOptions: {
        default() {
          return {
            forceAbsolute: true,
            gpuAcceleration: false
          };
        }
      },
      data: {
      	type:Array
      },
      prop:{
      	type:Object
      },
      keywords:{
      	type:String
      }
    },
    data(){
    	return {
    		// list:[],
    		checkeds: [],
    		checkedAll:false
    	}
    },
    watch:{
    	checkedAll(v){
    		if(v){
    			this.list.forEach(item=>{
    				this.checkeds.push(item.value)
    			})
    		}else{
    			this.checkeds = []
    		}
    	}
    },
    computed: {
      popperClass() {
        return this.$parent.popperClass;
      },
      list(){
      	return this.data.filter(item=>{
      		return item[this.prop.label].indexOf(this.keywords) > -1
      	}).map(item=>{
      		item.checked = false
      		item.label = item[this.prop.label]
      		item.value = item[this.prop.value]
      		return item
      	})
      }
    },
    methods:{
    	getChecked(){
    		var values = []
    		this.list.forEach(item=>{
    			this.checkeds.findIndex(itm=> itm == item.value) > -1 && values.push(item)
    		})    		
        this.$emit('checked',values)
    	}
    },
    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', this.updatePopper);
      this.$on('destroyPopper', this.destroyPopper);
      // this.list = this.data.map(item=>{
      // 		item.label = item[this.prop.label]
      // 		item.value = item[this.prop.value]
      // 		return item
      // 	})
    }
  };
</script>
<style lang="scss">
	.el-select-dropdown{
		position:absolute;
		min-width: 218px;
		min-height: 180px;
		padding-bottom: 28px;
		li{
			padding:4px 8px
		}
		.multiple-select-menu-bottom{
			position:absolute;
			bottom:0;
			left:0;
			right:0;
			height:28px;
			padding:4px 6px;
			box-shadow:-2px -2px 4px  #e5e5e5 ;
		}
	}
</style>
