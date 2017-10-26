<template>
    <div :class="['layout-container',{'open':show}]" ref="container" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
        <navbar></navbar>
        <sidebar></sidebar>
        <div class="layout-content">
            <transition :name="transition" mode="out-in">
                <router-view class="view"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'


export default {
    name: 'index',
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            transition: 'fade'
        }
    },
    methods: {
        open(v) {
            this.$alert(this.message.content, {
                confirmButtonText: '确定',
                callback: action => {
                    this.$store.dispatch('hideMessage');
                }
            });
        }
    },
    computed: {
        show() {
            return !!this.$store.state.system.sidebar
        },
        loading() {
            return !!this.$store.state.system.loading
        },
        message() {
            return this.$store.state.system.message
        }
    },
    watch: {
        'message.open' (v) {
            v && this.open()
        }
    },
    beforeRouteUpdate(to, from, next) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transition = toDepth == fromDepth ? 'fade' : (toDepth < fromDepth ? 'slide-right' : 'slide-left')
        next()
    },
    mounted() {
        // if (!this.$store.state.user.access_token) {
        //     this.$router.replace({
        //         path: '/login'
        //     })
        // }
    }
}
</script>
<style lang="scss">
.layout-container {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    padding: 60px 0 0 240px;
    overflow-x: hidden;
    transition: all .3s;
    @media (max-width: 768px) {
        padding-left: 0;
    }
}

.layout-content {
    position: relative;
    height: 100%;
}

.view {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
    overflow-y: auto
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
</style>
