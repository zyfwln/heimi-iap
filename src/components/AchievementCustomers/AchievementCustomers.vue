<style lang="less" src="./AchievementCustomers.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="AchievementCustomers" v-show="show">
            <div class="header" slot="header">
                <div class="cancel" @click="back()">取消</div>
                <div class="title">客户搜索</div>
            </div>
            <van-search
                v-model="value"
                placeholder="请输入姓名或手机号"
                show-action
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <div class="wrap">
                <div class="result" ref="result">
                    <v-loading v-model="loading"></v-loading>
                    <dl v-for="item in list"
                        :key="item.letter"
                        :id="item.letter"
                        :ref="item.letter">
                        <dt v-if="item.list.length > 0">{{item.letter}}</dt>
                        <dd>
                            <li class="is-link border-bottom" v-for="(v, i) in item.list" :key="i + 100" @click="selectCustomer(v)">
                                <div class="iconfont icon-sex-man" v-if="v.Sex == '男'"></div>
                                <div class="iconfont icon-sex-women" v-else></div>
                                <div class="left">{{v.Name}}</div>
                                <div class="right">{{v.Mobile}}</div>
                            </li>
                        </dd>
                    </dl>
                </div>

                <ul class="indexes">
                    <li v-for="(v, i) in letters" :key="i" @click.stop="jumpTo(v)">{{v}}</li>
                </ul>
            </div>
        </layout-base>
    </transition>
</template>

<script>
import { Letter }   from '../../assets/js/const'
import MKPY         from '../../assets/js/mkpy.js'

export default {
    model: {
        prop  : 'show',
        event : 'Hidden'
    },
    props: {
        show: Boolean
    },
    data () {
        return {
            value   : '',
            loading : true,
            list    : []
        }
    },
    computed: {
        letters () {
            return Letter.split('')
        }
    },
    watch: {
        show (_v) {
            if (_v) {
                this.onSearch()
            } else {
                this.value = ''
                this.clear()
            }
        }
    },
    methods: {
        back () {
            this.$emit('Hidden', false)
            this.$emit('Cancel', false)
        },
        clear () {
            this.list    = []
            this.loading = true
        },
        onSearch () {
            this.clear()
            setTimeout(() => {
                this.$ajax({
                    url: '/customer/info/getExclusiveCustomer',
                    data: {
                        page      : 1,
                        list_rows : 200,
                        text      : this.value
                    }
                }).then((_res) => {
                    for (let i = 0, len = this.letters.length; i < len; i++) {
                        let letter = this.letters[i]
                        let list   = []
                        for (let k = 0, l = _res.customer.length; k < l; k++) {
                            let _c = _res.customer[k]
                            MKPY(_c.Name) == letter && list.push(_c)
                        }
                        this.list.push({
                            letter  : letter,
                            list    : list
                        })
                    }
                    this.loading = false
                })
            }, 300);
        },
        selectCustomer (_c) {
            this.$emit('Select', _c)
        },
        jumpTo (_v) {
            this.$refs[_v] && this.$refs.result.scrollTo({
                left    : 0, 
                top     : this.$refs[_v][0].offsetTop,
                behavior: 'smooth'
            })
        }
    }
}
</script>