<style lang="less" src="./Login.less" scoped></style>

<template>
    <div id="Login">
        <form class="form" :style="formStyle" @submit="login()">
            <div class="logo">
                <img :src="logo">
                <h3>更懂你的门店管理专家</h3>
            </div>
            <div class="f-cell id">
                <div class="input">
                    <input type="text" v-model="id" placeholder="请输入系统标识">
                </div>
            </div>
            <div class="f-cell user">
                <div class="input">
                    <input type="text" v-model="userName" placeholder="请输入您的账户">
                </div>
            </div>
            <div class="f-cell password">
                <div class="input">
                    <input type="password" v-model="passWord" placeholder="请输入您的密码">
                </div>
            </div>
            <van-button class="btn" @click="login()">登录</van-button>
        </form>
    </div>
</template>

<script>
import { isIOS } from '../../assets/js/utils.js'

export default {
    data () {
        return {
            logo: require('../../assets/image/logo.png'),
            id: '',
            userName: '',
            passWord: '',
            formStyle: '',
            loading: false
        }
    },
    created () {
        if (this.$store.state.token) {
            this.$router.push({
                path: '/Home'
            })
        }
    },
    methods: {
        inputFocus () {
            if (isIOS) this.formStyle = 'top: 60%;'
        },
        inputBlur () {
            if (isIOS) this.formStyle = 'top: 50%;'
        },
        login () {
            event && event.preventDefault()

            if (!this.id) {
                this.$toast('请输入系统标识')
                return;
            }

            if (!this.userName || !this.passWord) {
                this.$toast('请输入账号密码')
                return;
            }
            // this.loading = true
            this.$ajax({
                url: '/employee/login/login',
                data: {
                    companySign: this.id,
                    userName: this.userName,
                    password: this.passWord
                }
            }).then((_res) => {
                this.$store.commit('UPDATED_TOKEN', _res.token)

                this.$ajax({
                    url: '/employee/info/employeeInfo'
                }).then((_data) => {
                    this.$store.commit('UPDATED_USER', _data.info)
                    this.$router.push({
                        path: '/Home'
                    })
                })
            })
        }
    }
}
</script>