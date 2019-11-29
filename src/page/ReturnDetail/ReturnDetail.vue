<style lang="less" src="./ReturnDetail.less" scoped></style>

<template>
    <layout-base id="ReturnDetail">
        <v-header slot="header" class="header">
            <div class="title" slot="center">回访记录</div>
        </v-header>
        <div class="page" v-if="detail">
            <van-cell title="回访对象" :value="detail.CustomerName"></van-cell>
            <van-cell title="回访方式" :value="detail.TypeName"></van-cell>
            <div class="box">
                <div class="hd">回访内容</div>
                <div class="bd">
                    <p v-if="!detail.Content">无</p>
                    <p v-else>{{detail.Content}}</p>
                </div>
            </div>
            <div class="box">
                <div class="hd">图片</div>
                <div class="bd">
                    <p v-if="!detail.ImgID">无</p>
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
        this.$ajax({
            url: '/employee/ReturnVisit/getDetail',
            data: {
                ID: this.$route.query.ID
            }
        }).then((_res) => {
            this.detail = _res
            this.detail.TypeName = ConsultType[_res.Type].name
            let imgs = _res.ImgID.split('|')
            imgs.pop()
            this.imgs = imgs.map(_item => this.$imgHost + _item)
        })
    }
}
</script>