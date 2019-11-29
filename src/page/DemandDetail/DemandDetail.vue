<style lang="less" src="./DemandDetail.less" scoped></style>

<template>
    <layout-base id="DemandDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户需求详情</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="customerName"></van-cell>
            <label-lsit title="需求" :labels="labels" disabled></label-lsit>
            <div class="box">
                <div class="hd">描述</div>
                <div class="bd">
                    <p>{{detail.Content}}</p>
                </div>
            </div>
            <div class="box">
                <div class="hd">图片</div>
                <div class="bd">
                    <img :src="v" v-for="(v, i) in imgs" :key="i" v-if="v" @click="showImg(i)">
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
import LabelLsit from '../../components/LabelLsit/LabelLsit.vue'
import { ImagePreview } from 'vant'

export default {
    components: {
        LabelLsit
    },
    data () {
        return {
            customerName: this.$route.query.CustomerName,
            labels: [],
            images: [],
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
            url: '/feedback/demand/getDetail',
            data: {
                ID: this.$route.query.ID
            }
        }).then(_res => {
            this.detail = _res
            let imgs = _res.ImgID.split('|')
            imgs.pop()
            this.imgs = imgs.map(_v => this.$imgHost + _v)
            this.labels = _res.Demand
        })
    }
}
</script>