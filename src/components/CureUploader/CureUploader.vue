<style lang="less" src="./CureUploader.less" scoped></style>

<template>
    <div class="cure-uploader">
        <div class="hd">图片<span class="placeholder">添加图片说明</span></div>
        <div class="bd">
            <dl>
                <dt>
                    <div class="img" v-if="img0">
                        <img :src="img0">
                        <i class="iconfont icon-close-1 close" @click="remove(0)"></i>
                    </div>
                    <div class="img add-img" v-else>
                        <van-uploader :after-read="onReadA" accept="image/png, image/jpeg">
                            <i class="iconfont icon-add"></i>
                        </van-uploader>
                    </div>
                </dt>
                <dd>正面</dd>
            </dl>
            <dl>
                <dt>
                    <div class="img" v-if="img1">
                        <img :src="img1">
                        <i class="iconfont icon-close-1 close" @click="remove(1)"></i>
                    </div>
                    <div class="img add-img" v-else>
                        <van-uploader :after-read="onReadB" accept="image/png, image/jpeg">
                            <i class="iconfont icon-add"></i>
                        </van-uploader>
                    </div>
                </dt>
                <dd>左侧</dd>
            </dl>
            <dl>
                <dt>
                    <div class="img" v-if="img2">
                        <img :src="img2">
                        <i class="iconfont icon-close-1 close" @click="remove(2)"></i>
                    </div>
                    <div class="img add-img" v-else>
                        <van-uploader :after-read="onReadC" accept="image/png, image/jpeg">
                            <i class="iconfont icon-add"></i>
                        </van-uploader>
                    </div>
                </dt>
                <dd>右侧</dd>
            </dl>
        </div>
    </div>
</template>

<script>
import * as Qiniu from 'qiniu-js'

export default {
    data () {
        return {
            items: ['正面', '左侧', '右侧'],
            img0: '',
            img1: '',
            img2: ''
        }
    },
    methods: {
        remove (_i) {
            switch (_i) {
                case 0:
                    this.img0 = ''
                    break;

                case 1:
                    this.img1 = ''
                    break;

                case 2:
                    this.img2 = ''
                    break;
            
                default:
                    break;
            }
            this.$emit('RemoveImg', _i)
        },
        onReadA (_file) {
            this.onRead(_file, 0)
        },
        onReadB (_file) {
            this.onRead(_file, 1)
        },
        onReadC (_file) {
            this.onRead(_file, 2)
        },
        onRead (_file, _i) {
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
                        switch (_i) {
                            case 0:
                                _this.img0 = _this.$imgHost + _r.hash
                                break;

                            case 1:
                                _this.img1 = _this.$imgHost + _r.hash
                                break;

                            case 2:
                                _this.img2 = _this.$imgHost + _r.hash
                                break;
                        
                            default:
                                break;
                        }
                        _this.$emit('OnRead', _r.hash, _i)
                    }
                }
                observable.subscribe(observer)
            })
        }
    }
}
</script>