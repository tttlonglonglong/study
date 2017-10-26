<template>
  <div class="box-card-body">
	地理位置 <el-cascader
      :options="zones"
      :props="{
        value: 'zone_id',
        label: 'zone_name',
        children: 'list'
      }"
      change-on-select
      @change="handleItemChange"
      placeholder="省/市/区/"
    ></el-cascader>
    小区类型 <el-select v-model="filter.zone_type" placeholder="小区类型">
      <el-option
        v-for="item in zoneTypes"
        :key="item"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    设备类型 <el-select v-model="filter.device_type" placeholder="设备类型">
      <el-option
        v-for="item in deviceTypes"
        :key="item"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
	<el-button type="info" @click="search">查询</el-button>
  </div>
</template>

<script type="text/babel">

import { mapActions } from 'vuex'

  export default {

    name: 'DeviceAdFilter',

    componentName: 'DeviceAdFilter',

    data() {
      return {
          screenTypes:[{
	        label:'7 寸',
	        value:'7'
	      },{
	        label:'14 寸',
	        value:'14'
	      }],

	      zoneTypes:[{
	        label:'== 小区类型 ==',
	        value:0
	      },{
	        label:'商业小区',
	        value:'1'
	      },{
	        label:'城中村',
	        value:'2'
	      },{
	        label:'工业厂房',
	        value:'3'
	      },{
	        label:'写字楼',
	        value:'4'
	      }],

	      deviceTypes:[{
	        label:'== 设备类型 ==',
	        value:0
	      },{
	        label:'门禁机',
	        value:'1'
	      },{
	        label:'围墙机',
	        value:'2'
	      }],

	      filter:{
	        zone_pid:'',
	        zone_pid_path:'',
	        zone_type: 0,
	        device_type: 0
	      },
	      zones:[]
      }
    },

    methods: {	
	    handleItemChange(v){
	      this.filter.zone_pid = v[v.length - 1]
	      this.filter.zone_pid_path = v.join('-')
	      v.length < 3 && this.getZoneList({zone_pid:v[v.length-1]}).then(( response = [])=>{
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
	          fn(v.slice(), this.zones)
	      })
	    },
	    search(){
	    	let data = {}
	    	if( this.filter.zone_pid_path ){
	    		data.zone_pid = this.filter.zone_pid
	    		data.zone_pid_path = this.filter.zone_pid_path
	    	}
	    	if( this.filter.zone_type ){
	    		data.zone_type = this.filter.zone_type
	    	}
	    	if( this.filter.device_type ){
	    		data.device_type = this.filter.device_type
	    	}
	    	this.$emit('search', data)
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
