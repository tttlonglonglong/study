<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="!edit"> 添加新推送 </span>
        <span v-if="edit"> 编辑推送 </span>
        <el-button type="primary" size="small" class="pull-right" @click="back">返回</el-button>
      </div>
		  <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="推送ID" v-if="edit">
            <span>{{notice_id}}</span>
          </el-form-item>

          <el-form-item label="推送名称">
            <el-input 
              v-model="form.notice_name"
              placeholder="请输入..."></el-input>
          </el-form-item>

          <el-form-item label="推送说明">
            <el-input type="textarea"
            v-model="form.notice_title"
            :maxlength="140"
            placeholder="请输入..."></el-input><span style="color: #999">小于140字</span>
          </el-form-item>

          <el-form-item label="推送时间">
            <el-date-picker
              v-model="form.notice_publish"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              :picker-options="pickerOptions"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          
          <el-form-item label="推送类型">
              <el-select
                v-model="form.notice_type"
                @change="selectType"
                placeholder="请选择类型">
                <el-option
                  v-for="item in type.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-if="item.value == 5 || item.value == 7"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          
          <el-form-item v-if="selectTypes.value <= 4" :label="selectTypes.title">
            <el-input v-model="form.notice_content"
            placeholder="请输入..."
            @input="regx(selectTypes.value)"></el-input>
          </el-form-item>

          <el-form-item v-else-if="selectTypes.value == 5" :label="selectTypes.title">
            <el-input v-model="form.notice_content"
            placeholder="请输入..."
            @blur="regx(selectTypes.value)"></el-input>
          </el-form-item>

           <el-form-item v-else-if="selectTypes.value == 6" :label="selectTypes.title">
            <el-radio-group v-model="form.notice_content">
               <el-radio 
                v-for="item in radio"
                v-model="form.notice_content"
                :label="item.label">{{item.title}}</el-radio>
            </el-radio-group>
           
          </el-form-item>
          
           <el-form-item v-else-if="selectTypes.value == 7" :label="selectTypes.title">
            <el-input
              v-model="form.notice_content"
              type="textarea"
              placeholder="请输入..."></el-input>
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
            </el-card>
          </el-form-item>

          <el-form-item label="共计" v-show="selected.list.length > 0">
              {{ selected.dwellerCount }}人
          </el-form-item>

          <el-form-item label="普通用户可见">
              <el-radio-group v-model="form.notice_visitor">
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit" v-if="!edit">立即创建</el-button>
            <el-button type="primary" @click="save" v-if="edit">立即保存</el-button>
            <!-- <el-button @click="reset">重置</el-button> -->
          </el-form-item>
      </el-form>
		</el-card>
  </div>
</template>
<script type="text/javascript">
import moment from 'moment'

import { mapActions } from 'vuex'

import ZoneCascader from '@/components/ZoneCascader'
import MultipleSelect from '@/components/MultipleSelect'

import axios from 'axios'

  export default {
    components:{
      MultipleSelect,ZoneCascader
    },
    data(){
      return {

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },


        edit: false,
        notice_id: '',
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
        filter:{
          zone_pid:'',
          zone_pid_path:'',
          zone_type:''
        },
        zone_ids: [],
        zones:[],
        selected:{
          list:[],
          dwellerCount:0
        },
        form: {
          notice_publish: '',//推送时间
          notice_name: '',//推送名称
          notice_content: '',//推送说明
          notice_type: '',//推送类型
          notice_title: '',
          zone_receive: 'Y',
          notice_visitor: 'N',
        },
        type: {
          options: [{
            value: 1,
            label: '商品',
            title: '商品ID',
          },{
            value: 2,
            label: '店铺',
            title: '店铺ID',
          },{
            value: 3,
            label: '房源',
            title: '房源ID',
          },{
            value: 4,
            label: '金融产品',
            title: '金融产品ID',
          },{
            value: 5,
            label: '活动页',
            title: '跳转链接',
          },{
            value: 6,
            label: '内部挑转',
          },{
            value: 7,
            label: '通知公告',
            title: '通知公告',
          }]
        },
        selectTypes: {
          value: 999,
          label: '',
          title: '',
        },
        radio: [{
          label: 1,
          title: '发现页',
        },{
          label: 2,
          title: '钥匙',
        },{
          label: 3,
          title: '我的',
        },{
          label: 4,
          title: '我的订单',
        },{
          label: 5,
          title: '我的消息',
        },{
          label: 6,
          title: '我的金融',
        }, ]
      }
    },
    created(){
      let route = this.$router.currentRoute
      if (route.params.id != 1) {
        let data =  JSON.parse(sessionStorage.getItem('data'));
        this.selectTypes = this.type.options[data.notice_type];
        this.notice_id = data.notice_id;
        this.edit = true;
      }
    },
    methods:{
      getZoneListByZoneIds(){
        let zone_ids = this.zone_ids.splice(0, 20)
        if( zone_ids.length ){
          this.getZoneList({ zone_ids:zone_ids.join(',')}).then(list=>{
            list.forEach(item=>{
              item.device_name = `${item.zone_name}-(${item.dwellerCount}人)`
              this.selected.list.push(item)            
            })
            this.$nextTick(e=>{
              this.form.zone_receive = 'N'
            })
          })
        }
      },
      regx ( value ){
        let reg = /^[0-9]\d*$/g;
        let regHttp =/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/ig;
        switch ( value ) {
          case 0:
          case 1:
          case 2:
          case 3:
            if (!reg.test(this.form.notice_content)) {
              if (this.form.notice_content.length > 0) {
                  this.$message.error('只能是数字！');
                  this.$nextTick(() => {
                    this.$set(this.form, 'notice_content', this.form.notice_content.substring(0,this.form.notice_content.length-1))
                  })
              }
              
            }
          break;
          case 4:
             if (!regHttp.test(this.form.notice_content)) {
              if (this.form.notice_content.length > 0) {
                this.$message.error('请输入正确的网址！');
                this.$nextTick(() => {
                  this.$set(this.form, 'notice_content', '')
                })
              }
            }
          break;
        }
      },
      selectType(value){
       this.selectTypes = this.type.options[value - 1];
      },
      zoneSelected(v){
        this.filter = Object.assign(this.filter,v)
      },
     
      search(){
        let { zone_pid_path,zone_type } = this.filter
        let data = { zone_pid_path, zone_level:4 }
        zone_type && (data.zone_type = zone_type)
        this.getZoneList(data).then( (list = [])=>{
          list.map(item=>{
            item.zone_name = `${item.zone_name}-(${item.dwellerCount}人)`
          })
          this.zones = list
        })
      },
      onZoneChecked(v){
        v.forEach(item=>{
          this.selected.list.findIndex(zone => zone.zone_id == item.zone_id) === -1 && this.selected.list.push(item)
        })
        let zone_ids = this.selected.list.slice().map(item=> item.zone_id).join(',')
        this.batchGetZoneInfo({ zone_ids, zone_level:4 }).then(res =>{
          this.selected.dwellerCount = res.dwellerCount
        })
      },
      onClose(idx){
        this.selected.list.splice(idx,1)
        this.onZoneChecked(this.selected.list)
      },
      submit(){
        // this.form.push_publish =  moment(this.form.push_publish).unix()
        if( this.form.notice_name.length < 2 ){
          return this.$message.error('推送名称至少两个字符');
        }
        if( this.form.notice_title.length < 2 ){
          return this.$message.error('推送内容至少两个字符');
        }
        if( this.form.notice_publish.length < 2 ){
          return this.$message.error('请选择推送时间');
        }
        if(typeof this.form.notice_type === 'string' || typeof this.form.notice_type === 'String'){
          return this.$message.error('请选择推送类型');
        }
        if( this.form.notice_content.length == 0 ||  this.form.notice_content == ''){
          return this.$message.error('请输入或选择推送类型的必要参数');
        }
        if( this.form.zone_receive == 'N' && this.selected.list.length == 0 ){
          return this.$message.error('请选择投放住户')
        }


        let data = Object.assign({},this.form,{
          notice_name: this.form.notice_name,
          notice_title: this.form.notice_title,
          notice_publish: moment(this.form.notice_publish).unix() - moment(this.form.notice_publish).unix()%60,
          notice_type: this.form.notice_type,
          notice_content: this.form.notice_content,
          zone_ids: this.selected.list.slice().map(item=>item.zone_id),

        })
         this.addAppPush(data).then(res=>{
            if( res.code == '0' ){
              const vm = this
              this.$message({
                  message: '创建成功',
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
      save(){
        if( this.form.notice_name.length < 2 ){
          return this.$message.error('推送名称至少两个字符');
        }
        if( this.form.notice_title.length < 2 ){
          return this.$message.error('推送内容至少两个字符');
        }
        if( this.form.notice_publish.length < 2 ){
          return this.$message.error('请选择推送时间');
        }
        if(typeof this.form.notice_type === 'string' || typeof this.form.notice_type === 'String'){
          return this.$message.error('请选择推送类型');
        }
        if( this.form.notice_content.length == 0 ||  this.form.notice_content == ''){
          return this.$message.error('请输入或选择推送类型的必要参数');
        }
        if( this.form.zone_receive == 'N' && this.selected.list.length == 0 ){
          return this.$message.error('请选择投放住户')
        }


        let data = Object.assign({},this.form,{
          notice_name: this.form.notice_name,
          notice_title: this.form.notice_title,
          notice_publish: moment(this.form.notice_publish).unix() - moment(this.form.notice_publish).unix()%60,
          notice_type: this.form.notice_type,
          notice_content: this.form.notice_content,
          zone_ids: this.selected.list.slice().map(item=>item.zone_id),

        })
         this.editAppPush(data).then(res=>{
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
      ...mapActions(['getZoneList','getQiniuToken','addAppPush','batchGetZoneInfo', 'editAppPush', 'getAppPush'])
    },
    computed:{
      token(){
          return this.$store.state.qiniu.token
      },
      domain(){
          return this.$store.state.qiniu.domain
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm=>{
        let route = vm.$router.currentRoute
        if (route.params.id != 1) {
          vm.getAppPush({notice_id: vm.notice_id})
          .then(res=>{
            let obj = Object.assign({},res,{
              notice_publish: new Date(res.notice_publish * 1000),//推送时间
              // notice_name: res.notice_name,//推送名称
              // notice_content: res.notice_content,//推送值
              // notice_type: res.notice_type,//推送类型
              // notice_title: res.notice_title,//推送说明
              // notice_visitor: res.notice_visitor,
            })
            vm.selected.dwellerCount = res.dwellerCount
            if( res.zone_receive == 'N' ){
              vm.zone_ids = res.zone_ids.slice()
              vm.getZoneListByZoneIds()
            }
            vm.form = obj;
          })
        }
      })
      
    }
  }
</script>
