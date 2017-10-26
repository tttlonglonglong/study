<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span> 设备广告 </span>
                <router-link class="pull-right el-button el-button--primary el-button--small" :to="{ path:'/deviceAdvert/create'}">添加</router-link>
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
                <el-form-item label="广告编号">
                    <el-input v-model="filter.ad_id" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="广告名称">
                    <el-input v-model="filter.ad_name" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="投放时间">
                    <el-date-picker type="date" placeholder="年/月/日" v-model="filter.ad_begin"></el-date-picker>
                    至
                    <el-date-picker type="date" placeholder="年/月/日" v-model="filter.ad_end"></el-date-picker>
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-select v-model="filter.ad_publish" placeholder="请选择发布状态">
                        <el-option label="全部状态" value="0"></el-option>
                        <el-option label="已发布" value="1"></el-option>
                        <el-option label="未发布" value="2"></el-option>
                        <el-option label="已失效" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="设备编号">
                    <el-input v-model="filter.device_id" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="filter.device_model" placeholder="设备类型">
                        <el-option v-for="item in deviceTypes" :key="item" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item>
                    <el-button type="info" @click="reset" style="margin-left:70px;">清空条件</el-button>
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item class="pull-right">
                    <el-button type="primary" @click="exportTable">导出数据</el-button>
                </el-form-item>
            </el-form>
            <el-table class="table-list" :data="list" border @selection-change="selection">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="expand">
                    <template scope="props">
                        <div class="text-center">
                            <img :class=" 'device-model-' + props.row.device_type " :src="props.row.ad_image">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="ID" prop="ad_id" width="76">
                </el-table-column>
                <el-table-column label="排序" prop="ad_sort" width="76">
                </el-table-column>
                <el-table-column label="广告名称" prop="ad_name">
                </el-table-column>
                <el-table-column label="创建时间" width="150">
                    <template scope="props">
                        {{ props.row.ad_created * 1000 | date('YYYY-MM-DD HH:mm') }}
                    </template>
                </el-table-column>

                <el-table-column label="编辑人" >
                    <template scope="props">
                        {{ props.row.admin_name?props.row.admin_name: '--'}}
                    </template>
                </el-table-column>

                <el-table-column label="投放时间" width="198">
                    <template scope="props">
                        {{ props.row.ad_begin * 1000 | date }}~{{ props.row.ad_end * 1000 | date }}
                        <br> {{ props.row.ad_pay_time | timeSplit }}
                    </template>
                </el-table-column>
                <el-table-column label="轮播间隔" width="108">
                    <template scope="props">
                        {{ props.row.ad_interval }}s
                    </template>
                </el-table-column>
                <el-table-column label="投放设备数" prop="deviceCount" width="108">
                </el-table-column>
                <el-table-column label="辐射房屋数" prop="commCount" width="108">
                </el-table-column>
                <el-table-column label="辐射用户数" prop="dwellerCount" width="108">
                </el-table-column>
                <el-table-column label="完整播放次数" prop="ad_play_count" width="118">
                </el-table-column>
                <el-table-column label="未完整播放次数" prop="ad_not_play_count" width="132">
                </el-table-column>
                <el-table-column label="发布状态" width="108">
                    <template scope="props">
                        <span v-if="props.row.ad_publish == 'Y'">已发布</span>
                        <span v-if="props.row.ad_publish == 'N'">未发布</span>
                        <span v-if="props.row.ad_publish == 'O'">已失效</span>
                    </template>
                </el-table-column>
                <el-table-column width="260" fixed="right">
                    <template scope="scope">
                        <span v-if="scope.row.ad_end > now">
		    			<el-button size="small" type="info" @click="sort(scope.row)" v-if="scope.row.ad_publish == 'Y'">上浮</el-button>

		    			<el-button size="small" type="info" @click="publish(scope.row)" v-if="scope.row.ad_publish == 'N'">发布</el-button>
		    			<el-button size="small" type="info" @click="unpublish(scope.row)" v-else>取消发布</el-button>
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
    ad_id: '',
    ad_name: '',
    ad_publish: '',
    device_id: '',
    zone_name: '',
    ad_begin: '',
    ad_end: ''
}

export default {
    name: 'device-advert',
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

            deviceTypes: [{
                value: 'CAUFE-V3F7',
                label: '三代7寸机'
            }, {
                value: 'CAUFE-V4F7',
                label: '四代7寸机'
            }, {
                value: 'CAUFE-V4F14',
                label: '四代14寸机'
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
            data.ad_begin && (data.ad_begin = moment(data.ad_begin).unix())
            data.ad_end && (data.ad_end = moment(data.ad_end).unix())
            this.getDeviceAdvertList(data)
        },
        handleSizeChange(ps) {
            this.getDeviceAdvertList({
                page: 1,
                pagesize: ps
            })
        },
        handleCurrentChange(page) {
            this.getDeviceAdvertList({
                page: page
            })
        },
        edit(data) {
            this.$router.push({
                name: 'deviceAdvert-edit',
                params: {
                    id: data.ad_id
                }
            })
        },
        publish({
            ad_id
        }) {
            this.$confirm('确定要发布该广告?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editDeviceAdvert({
                    ad_id,
                    ad_publish: 'Y'
                })
            }).catch(e => {})

        },
        unpublish({
            ad_id
        }) {
            this.$confirm('取消发布该广告?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editDeviceAdvert({
                    ad_id,
                    ad_publish: 'N'
                })
            }).catch(e => {})
        },
        sort({
            ad_id
        }) {
            this.editDeviceAdvert({
                ad_id,
                ad_sort: 1
            })
        },
        remove(data) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteDeviceAdvert(data).then(res => {
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
                    this.batchDeleteDeviceAdvert(this.checkeds.map(item => item.ad_id))
                }).catch(e => {})

            } else {
                this.$message.error('请选择需要操作的广告');
            }
        },
        exportTable() {
            return this.exportDeviceAdvertData()
        },
        selection(checkeds) {
            this.checkeds = checkeds
        },
        ...mapActions(['getDeviceAdvertList', 'deleteDeviceAdvert', 'batchDeleteDeviceAdvert', 'editDeviceAdvert', 'exportDeviceAdvertData'])
    },

    computed: {
        list() {
            return this.$store.state.deviceAdvert.list
        },
        page() {
            return this.$store.state.deviceAdvert.page
        },
        pagesize() {
            return this.$store.state.deviceAdvert.pagesize
        },
        total() {
            return this.$store.state.deviceAdvert.total
        }
    },
    filters: {
        timeSplit(v) {
            return v && v.indexOf(',') > 0 ? v.split(',').join('~') : v
        }
    },
    mounted() {
        this.getDeviceAdvertList({
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
