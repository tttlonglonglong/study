<template>
  <div class="container">
  <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span> 弹框广告 -- 编辑 </span>
        <el-button type="primary" size="small" class="pull-right" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="广告名称">
        <el-input v-model="form.ad_name"></el-input>
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

          <!-- <uploader v-for="item in uploads" :key="item.prefix" :size="item.size" :tips="item.tips" :src="item.src" :prefix="item.prefix" @onSuccess="onSuccess"></uploader> -->
          <uploader
           :types="'picture-card'"
           :show="true"
           :picList="picList"
           :key="img_info.prefix"  :tips="img_info.tips" :src="img_info.src" :prefix="img_info.prefix" @onSuccess="onSuccess"></uploader>

      </el-form-item>

      <el-form-item label="跳转链接">
        <el-input v-model="form.ad_link"></el-input>
      </el-form-item>

      <el-form-item label="轮播间隔">
        <el-input v-model="form.ad_interval"><template slot="append">秒</template></el-input>
      </el-form-item>

      <el-form-item label="推送对象">
        <el-radio-group v-model="form.zone_receive">
          <el-radio label="Y">全部用户</el-radio>
          <el-radio label="N">部分用户</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-show="form.zone_receive == 'N'">
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

        <el-button type="info" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item v-show="form.zone_receive == 'N' && zones.length > 0">
        小区名称
        <multiple-select placeholder="选择小区" :data="zones" :prop="{ label:'zone_name',value:'zone_id' }" @checked="onZoneChecked"></multiple-select>
        <!-- <span v-show="devices.length">
          选择设备
          <multiple-select placeholder="选择设备" :data="devices" :prop="{ label:'device_name',value:'device_id' }" @checked="onDeviceChecked"></multiple-select>
        </span> -->
      </el-form-item>

      <el-form-item label="已选择" v-show="form.zone_receive == 'N' && selected.list.length > 0">
        <el-card :body-style="{padding:'0',position:'relative'}">
          <div class="card-body el-select-dropdown__wrap">
            <ul class="select-dropdown__list">
              <li class="el-select-dropdown__item"
                v-for="(zone,idx) in selected.list"
                :key="zone.zone_id"
              >{{ zone.zone_name }} <a href="javascript:;" @click="onClose(idx)"> <i class="el-icon-close"></i></a></li>
            </ul>
          </div>
          <div class="card-footer" v-if="zone_ids.length > 0" @click="getZoneListByZoneIds"><i class="el-icon-caret-bottom"></i></div>
        </el-card>
      </el-form-item>

      <el-form-item label="共计" v-show="selected.list.length > 0">
          {{ selected.dwellerCount }}人
      </el-form-item>

      <el-form-item label="普通用户可见">
          <el-radio-group v-model="form.ad_visitor">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
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
import Uploader from '@/components/Uploader'

export default {
  name: 'key-advert-edit',
  components:{
    MultipleSelect,ZoneCascader,Uploader
  },
  data () {
    return {

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

      form:{
        ad_name:'',
        ad_interval: 8,
        ad_date_range:[],
        ad_time_start:'00:00',
        ad_time_end:'24:00',
        ad_pay_time:'',
        ad_link: '',
        zone_receive: 'Y',
        ad_image:[],
        ad_type: 5,
        ad_visitor: ''
      },
      img_info: {
        size:[656, 952],
        prefix:'AD_ALERT_656x952_',
        tips:'尺寸:任意尺寸,注意比例'
      },
      uploads: [],
      imgs: [],
      filter:{
        zone_pid:'',
        zone_pid_path:'',
        zone_type:''
      },

      picList:[],
      zone_ids: [],
      zones:[],
      selected:{
        list:[],
        dwellerCount:0
      }
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
    onSuccess(res){
        this.imgs.push(res.url)
    },
    search(){
      let { zone_pid_path,zone_type } = this.filter
      let data = { zone_pid_path, zone_level:4 }
      zone_type && (data.zone_type = zone_type)
      this.getZoneList(data).then( (list = [])=>{
        list.map(item=>{
          item.zone_name = ('dwellerCount' in item) ? `${item.zone_name}-(${item.dwellerCount}人)` : item.zone_name
        })
        this.zones = list
      })
    },
    getZoneListByZoneIds(){
      let zone_ids = this.zone_ids.splice(0, 20)
      if( zone_ids.length ){
        this.getZoneList({ zone_ids:zone_ids.join(','), zone_level: 4}).then(list=>{
          list.forEach(item=>{
            item.zone_name = ('dwellerCount' in item) ? `${item.zone_name}-(${item.dwellerCount}人)` : item.zone_name
            this.selected.list.push(item)
          })
        })
      }
    },
    onZoneChecked(v){
      v.forEach(item=>{
        this.selected.list.findIndex(zone => zone.zone_id == item.zone_id) === -1 && this.selected.list.push(item)
      })
      let zone_ids = (this.selected.list.slice().map(item=> item.zone_id).concat(this.zone_ids)).join(',')
      this.batchGetZoneInfo({ zone_ids, zone_level: 4 }).then(res =>{
        this.selected.dwellerCount = res.dwellerCount
      })
    },
    onClose(idx){
      this.selected.list.splice(idx,1)
      this.onZoneChecked(this.selected.list)
    },
    submit(){
      if( this.imgs.length < 1 ){
        return this.$message.error('请上传图片');
      }
      this.form.ad_image = this.imgs;
      
      // let imgs = []
      // this.uploads.forEach(item=>{
      //   item.src && imgs.push(item.src)
      // })

      // if( imgs.length < 6 ){
      //   return this.$message.error('请上传图片');
      // }
      // this.form.ad_image = {
      //   ios : imgs.slice(0,4),
      //   android : imgs.slice(4,6)
      // }

      if( this.form.ad_date_range.length < 2 ){
        return this.$message.error('请选择投放时间');
      }
      if( this.form.zone_receive == 'N' && this.selected.list.length == 0 ){
        return this.$message.error('请选择投放住户')
      }

      let data = Object.assign({},this.form,{
        ad_pay_time: this.form.ad_time_start+','+this.form.ad_time_end,
        ad_begin: moment(this.form.ad_date_range[0]).unix(),
        ad_end: moment(this.form.ad_date_range[1]).unix(),
        zone_ids: this.selected.list.slice().map(item=>item.zone_id).concat(this.zone_ids)
      })

      this.editAppAdvert(data).then(res=>{
        if( res.code == '0' ){
          const vm = this
          this.$message({
              message: '保存成功',
              type: 'success',
              onClose(){
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
    ...mapActions(['getZoneList','getQiniuToken','editAppAdvert','batchGetZoneInfo','getAppAdvert'])
  },
  beforeRouteEnter({params}, from, next){
    next( vm=>{
      params.id && vm.getAppAdvert({ ad_id: params.id }).then( ad =>{
         let times = ad.ad_pay_time && ad.ad_pay_time.indexOf(',') > -1 ? ad.ad_pay_time.split(',') : ['00:00','24:00']
         vm.form = Object.assign({}, vm.form, ad, {
            ad_time_start: times[0],
            ad_time_end: times[1],
            ad_date_range: [ new Date(ad.ad_begin * 1000), new Date(ad.ad_end * 1000)]
         })

         vm.selected.dwellerCount = ad.dwellerCount         

          if( ad.zone_receive == 'N' ){
            vm.zone_ids = ad.zone_ids.slice()
            vm.getZoneListByZoneIds()
         }
         vm.imgs = ad.ad_image;
         let imgs = ad.ad_image;       
          imgs.forEach((item, inx) => {
            let imges = {
              url: ''
            };
            imges.url = item
            vm.picList.push(imges)
          })
          
      })
    })
  },
  mounted(){
    this.getQiniuToken()
  }
}
</script>
<style lang="scss">
</style>
