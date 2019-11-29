<style lang="less" src="./Uploader.less" scoped></style>

<template>
    <div class="z-uploader">
        <div class="hd">{{title}}<span class="placeholder">{{placeholder}}</span></div>
        <div class="bd">
            <div class="imgs">
                <div class="img" v-for="(v, i) in imgs" :key="i">
                    <img :src="imgs[i]">
                    <i class="iconfont icon-close-1 close" @click="remove(v)"></i>
                </div>
                <div class="img add-img" v-show="!btnHide">
                    <van-uploader :after-read="onRead" accept="image/png, image/jpeg">
                        <i class="iconfont icon-add"></i>
                    </van-uploader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as Qiniu from 'qiniu-js'

export default {
    name: 'v-form-uploader',
    model: {
        prop: 'imgs',
        event: 'ImgsChange'
    },
    props: {
        multi: {
            type: Boolean,
            default: true
        },
        title: String,
        placeholder: String,
        imgs: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        btnHide () {
            return !this.multi && this.imgs.length == 1
        }
    },
    methods: {
        remove (_v) {
            let imgs = this.imgs
            imgs.splice(imgs.indexOf(_v), 1)
            this.$emit('ImgsChange', imgs)
            this.$emit('RemoveImg', _v)
        },
        onRead (_file) {
            let _this = this
            this.$ajax({
                url: '/qiniu/qiniu/getToken'
            }).then((_res) => {
                let config = {
                    useCdnDomain: true,
                    region: Qiniu.region.z0
                };
                let putExtra = {
                    fname: _file.name,
                    params: {},
                    mimeType: ["image/png", "image/jpeg"]
                };
                let observable = Qiniu.upload(_file.file, _file.name, _res.token, putExtra, config);
                let observer = {
                    complete (_r) {
                        _this.$emit('OnRead', _r.hash)
                    }
                }
                observable.subscribe(observer)
            })
        }
    }
}
</script>