<template>
    <aside>
        <header> 嘿芝麻 </header>
        <el-menu :default-active="active" @select="select">
            <el-menu-item index="99"><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-menu-item index="1"><i class="el-icon-menu"></i>设备广告管理</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-menu"></i>发现页广告管理</el-menu-item>
            <!-- 悬浮窗广告 -->
             <el-menu-item index="6"><i class="el-icon-menu"></i>悬浮框广告管理</el-menu-item>
             <!-- 弹框广告 -->
             <el-menu-item index="7"><i class="el-icon-menu"></i>弹框广告管理</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-menu"></i>钥匙广告管理</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-menu"></i>开屏广告管理</el-menu-item>
            <el-menu-item index="8"><i class="el-icon-menu"></i>APP推送</el-menu-item>
            <el-menu-item index="9"><i class="el-icon-menu"></i>用户管理</el-menu-item>
            <el-menu-item index="5"><i class="el-icon-menu"></i>邀请码输入框</el-menu-item>

        </el-menu>
        <div class="side-mask" @click="toggleSidebar"></div>
    </aside>
</template>
<script>
import {
    mapActions
} from 'vuex'
export default {
    name: 'sidebar',
    data() {
        return {
            activeIndex: '99'
        }
    },
    methods: {
        select(v) {
            switch (v) {
                case '99':
                    this.$router.push({
                        path: '/'
                    })
                    break
                case '1':
                    this.$router.push({
                        path: '/deviceAdvert'
                    })
                    break
                case '2':
                    this.$router.push({
                        path: '/shopAdvert'
                    })
                    break
                case '3':
                    this.$router.push({
                        path: '/keyAdvert'
                    })
                    break
                case '4':
                    this.$router.push({
                        path: '/appAdvert'
                    })
                    break
                case '5':
                    this.$router.push({
                        path: '/invitation'
                    })
                    break
                case '6':
                    this.$router.push({
                        path: '/suspension'
                    })
                    break
                case '7':
                    this.$router.push({
                        path: '/alert'
                    })
                    break
                 case '8':
                    this.$router.push({
                        path: '/notice'
                    })
					break
				  case '9':
                    this.$router.push({
                        path: '/user'
                    })
                    break
            }
            this.setActiveMenu(v)
        },
        ...mapActions(['toggleSidebar', 'setActiveMenu'])
    },
    computed: {
        active() {
            return this.$store.state.system.active
        }
    }
}
</script>
<style lang="scss">
aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 240px;
    z-index: 19;
    padding-top: 60px;
    transition: all .3s;
    header {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 19;
        width: 240px;
        height: 60px;
        background-color: #324157;
        color: #fff;
        font-size: 18px;
        line-height: 60px;
        text-align: center
    }
    .side-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 18;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        display: none
    }
    .el-menu {
        z-index: 19;
        height: 100%;
        overflow-y: auto
    }
    @media (max-width: 768px) {
        left: -240px;
    }
}

.open {
    aside {
        left: 0;
    }
    .side-mask {
        display: block
    }
}
</style>
