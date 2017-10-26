<template>
    <div id="app">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app' 
}
</script>
<style lang="scss">
@import './assets/common';
.box-card-body {
    margin-bottom: 20px;
}
</style>
