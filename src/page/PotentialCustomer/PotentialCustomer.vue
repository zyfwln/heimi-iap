<style lang="less" src="./PotentialCustomer.less" scoped></style>

<template>
    <layout-base id="PotentialCustomer">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户资料</div>
        </v-header>
        <div class="page" v-if="customer">
            <div class="c-header">
                <img :src="customer.Sex == '男' ? manImg : womenImg" class="header-img" @click="toInformation()">
                <div class="header-wrap">
                    <div class="wrap-hd">
                        <div class="hd-l">
                            <div class="l-t">
                                <div class="name van-ellipsis">{{customer.CusName}}</div>
                                <div class="red">潜在客</div>
                            </div>
                            <div class="l-f">{{customer.Mobile}}</div>
                        </div>
                        <div class="hd-r">
                            <div class="btn" @click="toAddRecord()">添加跟进记录</div>
                        </div>
                    </div>
                    <!-- <div class="wrap-bd">
                        <div class="bd-li">所属门店：卧龙店</div>
                        <div class="bd-li">专属技师：小美</div>
                    </div> -->
                </div>
            </div>
            <div class="c-section">
                <div class="s-item">
                    <span class="name">注册时间</span>
                    <span class="fr">{{customer.IssueDate && customer.IssueDate.substr(0, 10)}}</span>
                </div>
                <div class="s-item">
                    <span class="name">最后跟进</span>
                    <span class="fr">{{customer.LastFollowDate && customer.LastFollowDate.substr(0, 10)}}</span>
                </div>
            </div>
            <div class="c-items">
                <div class="item" v-for="(v, i) in customer.FollowList" :key="i">
                    <div class="date">
                        <span class="iconfont icon-time"></span>
                        <span>{{v.DealDate.substr(0, 10)}}</span>
                    </div>
                    <div class="item-hd">
                        <span>跟进方式</span>
                        <span class="fr">{{v.TypeName}}</span>
                    </div>
                    <div class="item-bd content">
                        <h3>内容</h3>
                        <p v-if="v.Content">{{v.Content}}</p>
                        <p v-else>无</p>
                    </div>
                    <div class="item-bd">
                        <h3>图片</h3>
                        <p v-if="!v.ImgID">无</p>
                        <div v-else>
                            <img :src="img" v-for="(img, index) in v.imgs" :key="index" @click="showImg(v.imgs, index)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
import { FollowType } from '../../assets/js/const.js'
import { ImagePreview } from 'vant'

export default {
    data () {
        return {
            manImg: require('../../assets/image/man.png'),
            womenImg: require('../../assets/image/women.png'),
            customer: {}
        }
    },
    methods: {
        showImg (_imgs, _i) {
            ImagePreview({
                images: _imgs,
                startPosition: _i
            })
        },
        toAddRecord () {
            this.$router.push({
                path : '/Home/GuestFollowRecord',
                query: {
                    CustomerID  : this.customer.CusID,
                    CusType     : this.customer.CusType,
                    CustomerName: this.customer.CusName
                }
            })
        }
    },
    created () {
        this.$ajax({
            url: '/customer/potential/getInfo',
            data: {
                CusID: this.$route.query.ID,
                CusType: this.$route.query.CusType
            }
        }).then((_res) => {
            this.customer = _res
            this.customer.FollowList = this.customer.FollowList.map(_item => {
                let imgs = _item.ImgID ? _item.ImgID.split('|') : []
                imgs.pop()
                _item.imgs = imgs.map(_img => this.$imgHost + _img)
                _item.TypeName = FollowType[_item.Type] && FollowType[_item.Type].name || ''
                return _item
            })

            this.customer.AskList = this.customer.AskList.map(_item => {
                let imgs = _item.ImgID ? _item.ImgID.split('|') : []
                imgs.pop()
                _item.imgs = imgs.map(_img => this.$imgHost + _img)
                _item.TypeName = FollowType[_item.Type] && FollowType[_item.Type].name || ''
                return _item
            })
        })
    }
}
</script>