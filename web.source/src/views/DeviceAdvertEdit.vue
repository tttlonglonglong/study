<template>
  <div class="container">
  <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span> 编辑设备广告 </span>
        <el-button type="primary" size="small" class="pull-right" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="设备广告名称">
        <el-input v-model="form.ad_name"></el-input>
      </el-form-item>

      <el-form-item label="屏幕尺寸">
        <el-select v-model="form.device_type" placeholder="请选择">
          <el-option
            v-for="item in screenTypes"
            :key="item"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="投放时间">
        <el-date-picker
        v-model="form.ad_date_range"
        type="daterange"
        placeholder="选择日期范围">
      </el-date-picker>

      <el-time-select
        v-model="form.ad_time_start"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00'
        }"
        placeholder="选择时间">
      </el-time-select>

      <el-time-select
        v-model="form.ad_time_end"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00',
          minTime: form.ad_time_start
        }"
        placeholder="选择时间">
      </el-time-select>
      </el-form-item>

      <el-form-item label="广告图片">
        <el-upload
          class="avatar-uploader"
          action="http://up-z0.qiniu.com/"
          :data="uploaddata"
          :show-file-list="false"
          :on-success="onBeforeSuccess"
          :before-upload="onBeforeUpload">
          <img v-if="!!form.ad_image" :src="form.ad_image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p v-show="form.device_type == '7'"> <i class="el-icon-information"></i> 7寸屏幕图片尺寸：1024*600  </p>
        <p v-show="form.device_type == '14'"> <i class="el-icon-information"></i> 14寸屏幕图片尺寸：768*1334  </p>

      </el-form-item>

      <el-form-item label="轮播间隔">
        <el-input v-model="form.ad_interval"><template slot="append">秒</template></el-input>
      </el-form-item>

      <el-form-item label="推送对象">
        <el-radio-group v-model="form.device_receive">
          <el-radio label="Y">全部设备</el-radio>
          <el-radio label="N">部分设备</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-show="form.device_receive == 'N'">
        推送对象
        <zone-cascader @search="zoneSelected"></zone-cascader>
         <el-select v-model="filter.zone_type" placeholder="小区类型">
          <el-option
            v-for="item in zoneTypes"
            :key="item"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <!-- <el-select v-model="filter.device_type" placeholder="设备类型">
          <el-option
            v-for="item in deviceTypes"
            :key="item"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-button type="info" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item v-show="form.device_receive == 'N' && zones.length > 0">
        小区名称
        <multiple-select placeholder="选择小区" :data="zones" :prop="{ label:'zone_name',value:'zone_id' }" @checked="onZoneChecked"></multiple-select>
        <span v-show="devices.length">
          选择设备
          <multiple-select placeholder="选择设备" :data="devices" :prop="{ label:'device_name',value:'device_id' }" @checked="onDeviceChecked"></multiple-select>
        </span>
      </el-form-item>

      <el-form-item label="已选择" v-show="form.device_receive == 'N' && selected.list.length > 0">
        <el-card :body-style="{padding:'0',position:'relative'}">
          <div class="card-body el-select-dropdown__wrap">
            <ul class="select-dropdown__list">
              <li class="el-select-dropdown__item"
                v-for="(device,idx) in selected.list"
                :key="device.device_id"
              >{{ device.device_name }} <a href="javascript:;" @click="onClose(device.device_id)"> <i class="el-icon-close"></i></a></li>
            </ul>
          </div>
          <div class="card-footer" v-if="dev_ids.length > 0" @click="getDeviceListByDevIds"><i class="el-icon-caret-bottom"></i></div>
        </el-card>

      </el-form-item>

      <el-form-item label="共计" v-show="form.device_receive == 'N' && selected.list.length > 0">
          {{ selected.deviceCount }}设备  {{ selected.commCount }}房屋  {{ selected.dwellerCount }}人
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">立即保存</el-button>
        <!-- <el-button @click="reset">重置</el-button> -->
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'

import { mapActions } from 'vuex'

import ZoneCascader from '@/components/ZoneCascader'
import MultipleSelect from '@/components/MultipleSelect'

export default {
  name: 'device-advert-edit',
  components:{
    MultipleSelect,ZoneCascader
  },
  data () {
    return {

      screenTypes:[{
        label:'7 寸',
        value:'7'
      },{
        label:'14 寸',
        value:'14'
      }],

      zoneTypes:[{
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
        value:'CAUFE-V3F7',
        label:'三代7寸机'
      },{
        value:'CAUFE-V4F7',
        label:'四代7寸机'
      },{
        value:'CAUFE-V4F14',
        label:'四代14寸机'
      }],


      form:{
        ad_name:'',
        ad_interval: 8,
        ad_date_range:[],
        ad_time_start:'00:00',
        ad_time_end:'24:00',
        ad_pay_time:'',
        device_type: '7',
        device_receive: 'N',
        ad_image:''
      },

      uploaddata:{
        token:'',
        key:''
      },

      filter:{
        zone_pid:'',
        zone_pid_path:'',
        zone_type:'',
        device_type:'',
        zone_ids:[],
        devices:[]
      },

      zones:[],
      devices:[],
      selected:{
        list:[],
        deviceCount:0,
        commCount:0,
        dwellerCount:0
      },



      dev_ids : []
    }
  },
  computed:{
      token(){
        return this.$store.state.qiniu.token
      },
      domain(){
          return this.$store.state.qiniu.domain
      }
  },
  methods:{
    zoneSelected(v){
      this.filter = Object.assign(this.filter,v)
    },
    onBeforeUpload(file){
      var ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      this.uploaddata.key = 'AD_' + moment().format('YYYYMMDDHHmmsss') + ext
      this.uploaddata.token = this.token
      return new Promise((resolve,reject) => {
        let img = new Image()
        img.onload = e =>{
          if(this.form.device_type == 7 && img.width == 1024 && img.height == 600 || this.form.device_type == 14 && img.width == 768 && img.height == 1334){
            resolve(true)
          }else{
            this.$message.error('图片尺寸不对，请重新选择');
            reject(false)
          }
        }
        img.onerror = e =>{
          reject(false)
        }
        let reader = new FileReader();
        reader.onload = (evt) => {
          img.src = evt.target.result
        }
        reader.readAsDataURL(file);
      })
    },
    onBeforeSuccess(data){
      if( data.key ){
        this.form.ad_image = this.domain + data.key
      }
    },
    search(){
      let { zone_pid_path,zone_type,device_type } = this.filter
      let data = { zone_pid_path, zone_level:4 }
      zone_type && (data.zone_type = zone_type)
      data.device_type = this.form.device_type
      this.getZoneList(data).then( (list = [])=>{
        list.map(item=>{
          item.zone_name = `${item.zone_name}-(${item.deviceCount}设备)`
        })
        this.zones = list
        this.devices = []
      })
    },

    getDeviceListByDevIds(){
      let dev_ids = this.dev_ids.splice(0, 20)
      if( dev_ids.length ){
        let data = {dev_ids:dev_ids.join(','),device_type:this.form.device_type}
        this.getDeviceList(data).then(list=>{
          list.forEach(item=>{
            item.device_name = `${item.device_name}-(${item.commCount}房屋)`
            this.selected.list.push(item)
          })
        })
      }
    },
    onZoneChecked(v){
      this.filter.zone_ids = v.map(item=>{
        return item.value
      })

      this.getDeviceList({ zone_ids: this.filter.zone_ids.join(','),device_type:this.form.device_type }).then(list=>{
         this.devices = list.map(item=>{
            item.device_name = `${item.device_name}-(${item.commCount}房屋)`
            return item
          })
      })
    },
    onDeviceChecked(v ,megre){
      v.forEach(item=>{
        this.selected.list.findIndex(zone => zone.device_id == item.device_id && zone.comm_id == item.comm_id) === -1 && this.selected.list.push(item)
        // this.selected.list.findIndex(zone => zone.device_id == item.device_id) === -1 && this.selected.list.push(item)
      })
      // this.selected.list = v.concat(this.selected.list)
      let dev_ids = (this.dev_ids.concat( this.selected.list.slice().map(item => item.device_id)) )
      this.selected.deviceCount = dev_ids.length
      dev_ids = [...new Set(dev_ids)].join(',')
      this.batchGetDeviceInfo({ dev_ids,device_type:this.form.device_type }).then(res =>{
        this.selected.commCount = res.commCount
        this.selected.dwellerCount = res.dwellerCount
      })
    },
    onClose(dev_id){
      this.selected.list = this.selected.list.filter(item=>{
        return item.device_id != dev_id
      })

      this.dev_ids = this.dev_ids.filter(item=>{
        return item != dev_id
      })
      this.onDeviceChecked([])
    },
    // reset(){
    //   this.$store.dispatch('showMessage','哈哈')
    //   // this.$refs.form.resetFields();
    // },

    submit(){
      if( this.form.ad_date_range.length < 2 ){
        return this.$message.error('请选择投放时间');
      }

      let devIds = this.selected.list.slice().map(v => v.device_id).concat(this.dev_ids.slice())
      devIds = [...new Set(devIds)]

      if( this.form.device_receive == 'N' && devIds.length == 0 ){
        return this.$message.error('请选择投放设备')
      }

      let data = Object.assign({},this.form,{
        ad_pay_time: this.form.ad_time_start+','+this.form.ad_time_end,
        ad_begin: moment(this.form.ad_date_range[0]).unix(),
        ad_end: moment(this.form.ad_date_range[1]).unix(),
        dev_ids: this.form.device_receive == 'N' ? devIds : []
      })

      this.editDeviceAdvert(data).then(res=>{
          const vm = this
        if( res.code == '0' ){
          this.$message({
              message: '保存成功',
              type: 'success',
              onClose(){
                // this.reset()
                vm.back()
              }
            });
        }else{
          this.$message.error(res.msg);
        }
      },err =>{
        this.$message.error('未知错误，请稍后再试');
      })
    },
    ...mapActions(['getDeviceAdvert','getDeviceList','getZoneList','getQiniuToken','editDeviceAdvert','batchGetDeviceInfo'])
  },
  beforeRouteEnter( {params}, from, next){
    next( vm=>{
      params.id && vm.getDeviceAdvert({ ad_id: params.id }).then( ad =>{
         let times = ad.ad_pay_time.indexOf(',') > -1 ? ad.ad_pay_time.split(',') : ['00:00','24:00']
         vm.form = Object.assign({}, vm.form, ad, {
            ad_time_start: times[0],
            ad_time_end: times[1],
            ad_date_range: [ new Date(ad.ad_begin * 1000), new Date(ad.ad_end * 1000)]
         })

         vm.selected.deviceCount = ad.dev_ids.length
         vm.selected.commCount = ad.commCount
         vm.selected.dwellerCount = ad.dwellerCount


         if( ad.device_receive == 'N' ){
            vm.dev_ids = ad.dev_ids.slice()
            vm.getDeviceListByDevIds()
         }

      })
    })
  },
  watch:{
    'form.device_type'(){
      this.form.device_receive == 'N' && this.search()
    }
  },
  mounted(){
    this.getQiniuToken()
  }
}
</script>
<style lang="scss">

</style>
