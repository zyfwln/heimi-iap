<style lang="less" src="./FollowRecordDetail.less" scoped></style>

<template>
    <layout-base id="FollowRecordDetail">
        <v-header slot="header" class="header">
            <div class="title" slot="center">咨询记录</div>
        </v-header>
        <div class="page" v-if="detail">
            <van-cell title="咨询对象" :value="detail.CustomerName"></van-cell>
            <van-cell title="咨询方式" :value="detail.TypeName"></van-cell>
            <van-cell title="咨询项目" :value="detail.AskProject"></van-cell>
            <div class="box">
                <div class="hd">咨询内容</div>
                <div class="bd">
                    <p v-if="!detail.AskContent">无</p>
                    <p v-else>{{detail.AskContent}}</p>
                </div>
            </div>
            <div class="box">
                <div class="hd">图片</div>
                <div class="bd">
                    <p v-if="!detail.ImgUrl">无</p>
                    <img :src="v" v-for="(v, i) in imgs" :key="i" @click="showImg(i)">
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
import { ConsultType } from '../../assets/js/const.js'
import { ImagePreview } from 'vant'

export default {
    data () {
        return {
            imgs: [],
            detail: {}
        }
    },
    methods: {
        showImg (_i) {
            ImagePreview({
                images: this.imgs,
                startPosition: _i
            })
        }
    },
    created () {
        this.detail = this.$route.query.Info
        this.detail.TypeName = ConsultType[this.detail.AskSource].name
        let imgs = this.detail.ImgUrl.split('|')
        imgs.pop()
        this.imgs = imgs.map(_item => this.$imgHost + _item)
    }
}
</script>