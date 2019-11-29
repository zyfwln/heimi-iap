<style lang="less" src="./UserPassword.less" scoped></style>

<template>
    <layout-base id="UserPassword">
        <v-header class="header" slot="header">
            <div class="title" slot="center">修改密码</div>
        </v-header>
        <div class="page">
            <form class="form" @submit="submit()">
                <div class="f-cell border-bottom">
                    <div class="icon iconfont icon-password-2"></div>
                    <div class="text">旧密码</div>
                    <div class="input">
                        <input type="password" v-model="oPassword">
                    </div>
                    <div class="show"></div>
                </div>

                <div class="f-cell border-bottom">
                    <div class="icon iconfont icon-password-2"></div>
                    <div class="text">新密码</div>
                    <div class="input">
                        <input :type="type1" v-model="nPassword">
                    </div>
                    <div class="show iconfont" :class="type1 == 'password' ? 'icon-noshow-password' : 'icon-show-password'" @click="showPassword(type1, 0)"></div>
                </div>

                <div class="f-cell border-bottom">
                    <div class="icon iconfont icon-password-2"></div>
                    <div class="text">确认密码</div>
                    <div class="input">
                        <input :type="type2" v-model="confirm">
                    </div>
                    <div class="show iconfont" :class="type2 == 'password' ? 'icon-noshow-password' : 'icon-show-password'" @click="showPassword(type2, 1)"></div>
                </div>
            </form>
        </div>
        <div class="button" @click="submit()">确定</div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            oPassword: '',
            nPassword: '',
            confirm: '',
            type1: 'password',
            type2: 'password',
        }
    },
    methods: {
        showPassword (_type, _i) {
            if (_type == 'password') {
                _i == 0 ? this.type1 = 'text' : this.type2 = 'text'
            } else {
                _i == 0 ? this.type1 = 'password' : this.type2 = 'password'
            }
        },
        submit () {
            event && event.preventDefault()
            if (this.nPassword == this.confirm) {
                this.$ajax({
                    url: '/employee/info/changePWD',
                    data: {
                        OPassword: this.oPassword,
                        NPassword: this.nPassword
                    }
                }).then(() => {
                    this.$toast('密码修改成功')
                    this.$router.go(-1)
                })
            } else {
                this.$toast('两次输入的密码不一致!')
            }
        }
    }
}
</script>