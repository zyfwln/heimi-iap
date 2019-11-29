<style lang="less" src="./CureDetail.less" scoped></style>

<template>
    <layout-base id="CureDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">疗效记录</div>
        </v-header>
        <div class="page">
            <van-cell>
                <span class="title" slot="title">治疗项目</span>
                <span class="value">{{projectName}}</span>
            </van-cell>

            <div class="items">
                <div class="item" v-for="(v, i) in treatmentEffectList" :key="i">
                    <van-cell :title="'第' + v.Times + '次记录'">
                        <div class="date">
                            <div class="iconfont icon-time"></div>
                            <div>{{v.DealDate && v.DealDate.substr(0, 10)}}</div>
                        </div>
                    </van-cell>
                    <div class="box">
                        <h3>内容</h3>
                        <p v-if="v.Content">{{v.Content}}</p>
                        <p v-else>无</p>
                    </div>
                    <div class="box">
                        <h3>图片</h3>
                        <ul>
                            <dl>
                                <dt><img :src="getImageURL(v.imgs[0])" @click="showImg(getImageURL(v.imgs[0]))"></dt>
                                <dd>正面</dd>
                            </dl>
                            <dl>
                                <dt><img :src="getImageURL(v.imgs[1])" @click="showImg(getImageURL(v.imgs[1]))"></dt>
                                <dd>左侧</dd>
                            </dl>
                            <dl>
                                <dt><img :src="getImageURL(v.imgs[2])" @click="showImg(getImageURL(v.imgs[2]))"></dt>
                                <dd>右侧</dd>
                            </dl>
                        </ul>
                    </div>
                </div>
                <div class="item" v-for="(v, i) in sideReactionList" :key="i + treatmentEffectList.length">
                    <van-cell title="副反应">
                        <div class="date">
                            <div class="iconfont icon-time"></div>
                            <div>{{v.IssueDate && v.IssueDate.substr(0, 10)}}</div>
                        </div>
                    </van-cell>
                    <div class="box">
                        <h3>内容</h3>
                        <p v-if="v.Content">{{v.Content}}</p>
                        <p v-else>无</p>
                    </div>
                    <div class="box">
                        <h3>图片</h3>
                        <ul>
                            <dl>
                                <dt><img :src="getImageURL(v.imgs[0])" @click="showImg(getImageURL(v.imgs[0]))"></dt>
                                <dd>正面</dd>
                            </dl>
                            <dl>
                                <dt><img :src="getImageURL(v.imgs[1])" @click="showImg(getImageURL(v.imgs[1]))"></dt>
                                <dd>左侧</dd>
                            </dl>
                            <dl>
                                <dt><img :src="getImageURL(v.imgs[2])" @click="showImg(getImageURL(v.imgs[2]))"></dt>
                                <dd>右侧</dd>
                            </dl>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
    data () {
        return {
            img: require('../../assets/image/no_img.png'),
            projectName: this.$route.query.ProjectName,
            treatmentEffectList: [],
            sideReactionList: []
        }
    },
    methods: {
        getImageURL (_img) {
            if (_img) {
                return this.$imgHost + _img
            } else {
                return this.img
            }
        },
        showImg (_img) {
            ImagePreview({
                images: [_img],
                startPosition: 0
            })
        }
    },
    created () {
        this.$ajax({
            url: '/feedback/TreatmentEffect/getProjectDetail',
            data: {
                ID: this.$route.query.ID,
                CustomerID: this.$route.query.CustomerID
            }
        }).then((_res) => {
            this.treatmentEffectList = _res.TreatmentEffectList.map(_item => {
                _item.imgs = _item.ImgID && _item.ImgID.split('|') || []
                _item.imgs.pop()
                return _item
            })
            this.sideReactionList = _res.SideReactionList.map(_item => {
                _item.imgs = _item.ImgID && _item.ImgID.split('|') || []
                _item.imgs.pop()
                return _item
            })
        })
    }
}
</script>