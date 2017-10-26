<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span> APP推送 </span>
                <router-link class="pull-right el-button el-button--primary el-button--small" :to="{ name:'notice-create',params:{id:1}}">添加</router-link>
            </div>
            <el-form :inline="true" class="box-card-body">
                <el-form-item label="地理位置">
                    <zone-cascader ref="cascader" @search="cascader"></zone-cascader>
                </el-form-item>
                <el-form-item label="小区类型">
                    <el-select v-model="filter.zone_type" placeholder="小区类型">
                        <el-option v-for="item in zoneTypes" :key="item" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小区名称">
                    <el-input v-model="filter.zone_name" placeholder="请输入..."></el-input>
                </el-form-item>
                <br>
                <el-form-item label="推送ID">
                    <el-input v-model="filter.notice_id" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="推送名称">
                    <el-input v-model="filter.notice_name" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="推送时间">
			        <el-date-picker
			           v-model="filter.notice_publish"
                       format="yyyy-MM-dd hh:mm"
			           type="datetime"
			           placeholder="选择日期时间">
			        </el-date-picker>
                   <!--  <el-date-picker type="date" placeholder="年/月/日" v-model="filter.ad_begin"></el-date-picker>
                    至
                    <el-date-picker type="date" placeholder="年/月/日" v-model="filter.ad_end"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-select v-model="filter.notice_status" placeholder="请选择发布状态">
                        <el-option label="全部状态" value=""></el-option>
                        <el-option label="已发布" value="1"></el-option>
                        <el-option label="未发布" value="0"></el-option>
                        <el-option label="已失效" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item>
                    <el-button type="info" @click="reset" style="margin-left:70px;">清空条件</el-button>
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
               <!--  <el-form-item class="pull-right">
                    <el-button type="primary" @click="exportTable">导出数据</el-button>
                </el-form-item> -->
            </el-form>

            <!-- table -->
            <el-table class="table-list" :data="list" border @selection-change="selection">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="ID" prop="notice_id" width="80">
                </el-table-column>
               <!--  <el-table-column label="排序" prop="ad_sort" width="80">
                </el-table-column> -->
                <el-table-column label="推送名称" prop="notice_name">
                </el-table-column>
                <el-table-column label="创建时间" width="160">
                    <template scope="props">
                        {{ props.row.notice_create * 1000 | date('YYYY-MM-DD HH:mm') }}
                    </template>
                </el-table-column>
				
				<el-table-column label="编辑人" >
					<template scope="props">
                        {{ props.row.admin_name?props.row.admin_name: '--'}}
                    </template>
				</el-table-column>

                <el-table-column label="推送时间" width="220">
                    <template scope="props">
                        {{ props.row.notice_publish * 1000 | date('YYYY-MM-DD HH:mm') }}
                    </template>
                </el-table-column>
                
                <el-table-column label="推送用户数" prop="dwellerCount">
                </el-table-column>
                <el-table-column label="点击数" prop="notice_read">
                </el-table-column>
                <el-table-column label="发布状态">
                    <template scope="props">
                        <span v-if="props.row.notice_status == 0">未发布</span>
                        <span v-if="props.row.notice_status == 1">已发布</span>
                        <span v-if="props.row.notice_status == 2">已关闭</span>
                        <span v-if="props.row.notice_status == 'O'">已失效</span>
                    </template>
                </el-table-column>

                <el-table-column width="320" class="text-right" label="操作">
                    <template scope="scope">
                        <span>
              				<!-- <el-button size="small" type="info" @click="sort(scope.row)" v-if="scope.row.push_publish == 'Y'">上浮</el-button> -->

             				<el-button size="small" type="info" @click="publish(scope.row)" v-if="scope.row.notice_status == 0">发布</el-button>
              				<el-button size="small" type="info" @click="unpublish(scope.row)" v-else-if="scope.row.notice_status == 1">取消发布</el-button>
                            
            			</span>
                        <el-button size="small" type="info" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-button size="small" type="info" @click="batchRemove">批量删除</el-button>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import {
    mapActions
} from 'vuex'
import moment from 'moment'

import ZoneCascader from '@/components/ZoneCascader'

const condition = {
    zone_pid: '',
    zone_pid_path: '',
    zone_type: 0,
    device_model: '',
    notice_id: '',
    notice_name: '',
    notice_status: '',
    notice_publish: '',
    // device_id: '',
    zone_name: '',
}

export default {
    name: 'key-advert',
    data() {
        return {
            zoneTypes: [{
                label: '== 小区类型 ==',
                value: 0
            }, {
                label: '商业小区',
                value: '1'
            }, {
                label: '城中村',
                value: '2'
            }, {
                label: '工业厂房',
                value: '3'
            }, {
                label: '写字楼',
                value: '4'
            }],


            filter: Object.assign({}, condition),

            now: moment().unix(),
            checkeds: []
        }
    },
    components: {
        ZoneCascader
    },
    methods: {
        reset() {

            this.$refs.cascader.reset()
            this.filter = Object.assign({}, condition)
        },
        cascader(v) {
            this.filter = Object.assign(this.filter, v)
        },
        search() {
            let data = {
                page: 1
            }
            Object.keys(this.filter).forEach(key => {
                if (this.filter[key] != '') {
                    data[key] = this.filter[key]
                }
            })
            data.notice_publish && (data.notice_publish = moment(data.notice_publish).unix()- moment(data.notice_publish).unix()%60)
            this.getAppPushList(data)
        },
        handleSizeChange(ps) {
            this.getAppPushList({
                page: 1,
                pagesize: ps
            })
        },
        handleCurrentChange(page) {
            this.getAppPushList({
                page: page
            })
        },
        edit(data) {
        	sessionStorage.setItem('data', JSON.stringify(data))
            this.$router.push({
                name: 'notice-create',
                params: {
                    id: 2
                },
                query: {
                	notice_id: data.notice_id,
                }
            })
        },
        publish({ notice_id }) {
            this.$confirm('确定要发布该推送?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editAppPush({
                    notice_id,
                    notice_status: 1
                })
            }).catch(e => {})

        },
        unpublish({ notice_id }) {
            this.$confirm('取消发布该推送?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editAppPush({
                    notice_id,
                    notice_status: 0
                })
            }).catch(e => {})
        },
        // sort({ ad_id }) {
        //     this.editAppAdvert({
        //         ad_id,
        //         ad_sort: 1
        //     })
        // },
        remove(data) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteAppPush(data).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {})
        },
        batchRemove() {
            if (this.checkeds.length) {
                this.$confirm('确定要批量删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.batchDeleteAppPush(this.checkeds.map(item => item.notice_id))
                }).catch(e => {})

            } else {
                this.$message.error('请选择需要操作的推送消息');
            }
        },
        exportTable() {
            return this.batchDeleteAppPush();
        },
        selection(checkeds) {
            this.checkeds = checkeds
        },
        ...mapActions(['getAppPushList', 'deleteAppPush', 'batchDeleteAppPush', 'editAppPush', 'batchDeleteAppPush'])
    },

    computed: {
        list() {
            return this.$store.state.pushNotice.list
        },
        page() {
            return this.$store.state.pushNotice.page
        },
        pagesize() {
            return this.$store.state.pushNotice.pagesize
        },
        total() {
            return this.$store.state.pushNotice.total
        }
    },
    filters: {
        timeSplit(v) {
            return v && v.indexOf(',') > 0 ? v.split(',').join('~') : v
        }
    },
    created(){
        // this.$store.commit('SET_AD_TYPE','2')
    },
    mounted() {
        this.getAppPushList({
            page: 1
        })
    }
}
</script>
<style lang="scss">
.table-expand {
    font-size: 0;
    label {
        width: 90px;
        color: #99a9bf;
    }
    .el-form-item {
        margin-right: 0!important;
        margin-bottom: 0;
        width: 50%;
    }
}
</style>
