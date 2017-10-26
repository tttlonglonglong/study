<template>
	<el-cascader
      ref="cascader"
	    :value="v"
      :options="zones"
      :props="{
        value: 'zone_id',
        label: 'zone_name',
        children: 'list'
      }"
      clearable
      change-on-select
      @change="handleItemChange"
      placeholder="省/市/区/"
    ></el-cascader>
</template>

<script type="text/babel">

import { mapActions } from 'vuex'

export default {
    name: 'ZoneCascader',
    componentName: 'ZoneCascader',
    data() {
    	return {
		    zones:[],
		    v:[]
    	}
	},
	methods: {
      reset(){
        this.v = []
      },
	    handleItemChange(v){
	      // this.filter.zone_pid = v[v.length - 1]
	      // this.filter.zone_pid_path = v.join('-')
	      v.length && v.length < 3 && this.getZoneList({zone_pid:v[v.length-1]}).then(( response = [])=>{
	          let fn = (pids, list) => {
	              let id = pids.shift()
	              let item = list.find(item => item.zone_id == id)
	              if (pids.length) {
	                  item && item.list && fn(pids, item.list)
	              } else {
	                  v.length < 2 && response.map(item=>{
	                    item.list = []
	                    return item
	                  })
	                  item.list = response
	              }
	          }
	          fn(v.concat(), this.zones)
	      })
	      this.$emit('search',{zone_pid_path:v.join('-'),zone_pid:v[v.length - 1]})
	    },
	    ...mapActions(['getZoneList'])
	},
    mounted(){
    	this.getZoneList({zone_pid:0}).then( (list = [])=>{
	      list.map(item=>{
	        item.list = []
	        return item
	      })
	      this.zones = list
	    })
    }
}

</script>
