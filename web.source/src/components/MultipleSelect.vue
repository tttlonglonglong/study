<template>
  <div
    class="el-select"
    v-clickoutside="handleClose">
    
    <el-input
    	ref="reference"
    	v-model="keywords"
    	:placeholder="placeholder"
    	:icon="iconClass"
    	@focus="visible = true"></el-input>
    <transition
      name="el-zoom-in-top">
      <multiple-select-menu
        ref="popper"
        v-show="visible"
        :prop="prop"
        :data="data"
        :keywords="keywords"
        @checked="onChecked"
        >
        <slot></slot>
      </multiple-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
  import Emitter from 'element-ui/lib/mixins/emitter';
  import Locale from 'element-ui/lib/mixins/locale';
  import Clickoutside from 'element-ui/lib/utils/clickoutside';
  import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'

  import MultipleSelectMenu from './MultipleSelectMenu'

  export default {
    mixins: [Emitter, Locale],

    name: 'MultipleSelect',

    componentName: 'MultipleSelect',

    components:{
    	MultipleSelectMenu
    },

    computed: {
      iconClass() {
        return this.visible ? 'caret-top is-reverse' : 'caret-top';
      }
    },
    directives: { Clickoutside },

    props: {
      value:Array,
      data:Array,
      prop:{
      	type:Object,
      	default(){
      		return {
      			label:'label',
      			value:'value'
      		}
      	}
      },
      placeholder:String
    },

    data() {
      return {
        visible: false,
        keywords: ''
      };
    },

    watch: {
     
      visible(val) {
      	val && this.broadcast('MultipleSelectMenu', 'updatePopper');
      }

    },

    methods: {	
	    onChecked(v){
	    	this.$emit('checked',v)
	    	this.handleClose()
	    },
     
      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },

      handleClose() {
        this.visible = false;
      }
    }
  };
</script>
