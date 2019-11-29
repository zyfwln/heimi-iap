<style lang="less" src="./Approval.less" scoped></style>

<template>
    <layout-base id="Approval">
        <v-header class="header" slot="header">
            <div slot="left">
                <span class="left" @click="goRecord()">记录</span>
            </div>
            <div class="title" slot="center">审批</div>
        </v-header>
        <div class="page">
            <div class="approval-menus">
                <div class="munes-div" v-for="(item, i) in menus" :key="i">
                    <h3>{{item.title}}</h3>
                    <ul>
                        <dl v-for="(v, k) in item.menus" :key="k" @click="to(v.link)">
                            <dt>
                                <i class="iconfont" :class="v.icon" :style="`background-color: ${v.color}`"></i>
                            </dt>
                            <dd>{{v.name}}</dd>
                        </dl>
                    </ul>
                </div>
            </div>
        </div>
        <v-footer slot="footer"></v-footer>
    </layout-base>
</template>

<script>
import Footer from '../../components/Footer/Footer.vue'

export default {
    components: {
        'v-footer': Footer
    },
    computed: {
        menus () {
            return [
                {
                    title: '人事审批',
                    menus: [{ name: '请假申请', icon: 'icon-leave', color: '#608dff', link: '/Approval/ApplyLeave'}]
                },
                {
                    title: '财务审批',
                    menus: [{ name: '请款申请', icon: 'icon-funds', color: '#e66161', link: ''}, { name: '报销申请', icon: 'icon-offset', color: '#ea9949', link: ''}]
                },
                {
                    title: '报修审批',
                    menus: [{ name: '报修申请', icon: 'icon-repair', color: '#607eff', link: ''}]
                }
            ]
        }
    },
    methods: {
        goRecord () {
            this.$router.push({
                path: ''
            })
        },
        to (_link) {
            _link ? this.$router.push({
                path: _link
            }) : this.$toast({
                message: '该功能暂未开放',
                duration: 1000
            })
        }
    }
}
</script>