<template>
    <div class="container">
        <el-card class="box-card">
            <el-form ref="form" label-width="120px">
                <el-form-item label="邀请码输入框">
                    <el-switch v-model="val" on-color="#13ce66" off-color="#666" @change="change">
                    </el-switch>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script type="text/javascript">
import {
    mapActions
} from 'vuex'
export default {
    name: 'invitation',
    data() {
        return {}
    },
    methods: {
        change(v) {
            this.setActiveCode({
                status: v ? '1' : '0'
            })
        },
        ...mapActions(['getActiveCode', 'setActiveCode'])
    },
    computed: {
        val() {
            return !!this.$store.state.invitation.active
        }
    },
    mounted() {
        this.getActiveCode()
    }
}
</script>
