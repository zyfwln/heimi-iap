<style lang="less" src="./CustomerAdd.less" scoped></style>

<template>
    <layout-base id="CustomerAdd">
        <v-header slot="header" class="header">
            <div class="title" slot="center">新增客户</div>
        </v-header>
        <form class="form">
            <div class="cells">
                <div class="cell">
                    <div class="left">客户姓名</div>
                    <div class="right">
                        <input v-model="username" type="text" placeholder="请输入客户姓名">
                    </div>
                </div>

                <div class="cell">
                    <div class="left">客户性别</div>
                    <div class="right radio">
                        <radio-group :items="sexs" @RadioSelect="sexSelect"></radio-group>
                    </div>
                </div>

                <div class="cell">
                    <div class="left">手机号</div>
                    <div class="right">
                        <input v-model="mobile" type="tel" maxlength="11" placeholder="请输入客户手机号">
                    </div>
                </div>

                <div class="cell is-link" @click="show = true">
                    <div class="left">客户来源</div>
                    <div class="right">
                        <span class="fr" v-if="from.SourceID">
                            {{from.SourceName || ''}}
                            <span v-if="from.SourceSecName"> -> {{from.SourceSecName || ''}}</span>
                        </span>
                        <span class="fr placeholder" v-else>请选择客户来源渠道</span>
                    </div>
                </div>
            </div>
        </form>
        
        <div class="save">
            <div class="button" @click="save()">保存</div>
        </div>

        <transition name="trans">
            <div class="from-search" v-show="showF">
                <div class="search-title">
                    <span class="fl" @click="cancelSelectCustomer(1)">取消</span>
                    <span>{{from.SourceName}}</span>
                </div>
                <div class="search-list">
                    <van-cell is-link v-for="(v, i) in list" :key="i" @click="selectFrom(v, i)">
                        <div class="title" slot="title">
                            <i class="iconfont" :class="activeFrom == i ? 'icon-checkbox-yes-r' : 'icon-checkbox-no-r'"></i>
                            <span>{{v.Name}}</span>
                        </div>
                    </van-cell>
                </div>
            </div>
        </transition>

        <van-actionsheet v-model="show" :actions="source" cancel-text="取消" @select="onSelect"/>
        <customer-search v-model="showC" @Select="selectCustomer" @Cancel="cancelSelectCustomer"></customer-search>
    </layout-base>
</template>

<script>
import RadioGroup       from '../../components/RadioGroup/RadioGroup.vue'
import CustomerSearch   from '../../components/CustomerSearch/CustomerSearch.vue'
import { mapState }     from 'vuex'

export default {
    components: {
        RadioGroup,
        CustomerSearch
    },
    data () {
        return {
            sexs                : ['男', '女'],
            username            : '',
            mobile              : '',
            sex                 : '',
            from                : {
                SourceID        : '',
                SourceName      : '',
                SourceSecID     : '',
                SourceSecName   : ''
            },
            show                : false,
            showC               : false,
            showF               : false,
            api                 : ['/customer/potential/reg', '/customer/info/register'][this.$route.query.type], // type区分正式客或潜在客
            list                : [],
            activeFrom          : null,
            hasType             : false
        }
    },
    computed: {
        ...mapState(['source'])
    },
    methods: {
        sexSelect (_i) {
            this.sex = this.sexs[_i]
        },
        onSelect (_item) {
            this.from.SourceID      = _item.ID
            this.from.SourceName    = _item.Sourcetype
            this.from.SourceSecID   = ''
            this.from.SourceSecName = ''
            
            this.hasType = _item.HasSecType == 1

            if (this.hasType) {
                switch (_item.ID) {
                    case 'Introducer':
                        this.showC = true
                        break;

                    default:
                        this.$ajax({
                            url : '/customer/info/getSourceSecList',
                            data: {
                                ID: _item.ID
                            }
                        }).then((_res) => {
                            this.list   = _res.filter(_i => _i.SecID)
                            this.showF  = true
                        })
                        break;
                }
            }
            this.show = false
        },
        selectCustomer (_c) {
            this.from.SourceSecID   = _c.ID
            this.from.SourceSecName = _c.Name
        },
        cancelSelectCustomer (_t) {
            if (this.from.SourceID && this.from.SourceSecID == '') {
                this.from.SourceID      = ''
                this.from.SourceName    = ''
            }
            if (_t) this.showF = false
        },
        selectFrom (_v, _i) {
            this.from.SourceSecID   = _v.SecID
            this.from.SourceSecName = _v.Name
            this.activeFrom         = _i
            this.showF              = false
        },
        save () {
            if (this.hasType && !this.from.SourceSecID) {
                this.$toast('请选择客户来源渠道')
                return;
            }
            if (this.$route.query.type == 1 && !(this.username && this.mobile && this.sexs)) {
                this.$toast('请完善客户资料')
                return;
            }
            
            this.$dialog.confirm({
                title: '请仔细复核客户信息，确认无误再点击确定',
            }).then(() => {
                this.$ajax({
                    url : this.api,
                    data: {
                        Mobile      : this.mobile,
                        Name        : this.username,
                        Sex         : this.sex,
                        SourceID    : this.from.SourceID,
                        SourceSecID : this.from.SourceSecID
                    }
                }).then((_res) => {
                    this.$store.commit('UPDATED_ADD_CUSTOMER', {
                        ID: _res.customer.ID,
                        Name: _res.customer.Name
                    })
                    this.$toast.success('会员注册成功')
                    this.$router.go(-1)
                })
            }).catch(() => {})
        }
    },
    created () {
        if (this.source.length == 0) {
            this.$ajax({
                url: '/customer/info/getSourceList'
            }).then((_res) => {
                this.$store.commit('UPDATED_SOURCE', _res.map(_item => {
                    _item.name = _item.Sourcetype
                    return _item
                }))
            })
        }
    }
}
</script>