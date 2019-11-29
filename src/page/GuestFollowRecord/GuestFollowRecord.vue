<style lang="less" src="./GuestFollowRecord.less" scoped></style>

<template>
    <layout-base id="GuestFollowRecord">
        <v-header slot="header" class="header">
            <div class="title" slot="center">跟进记录</div>
        </v-header>
        <div class="page">
            <van-cell-group>
                <van-cell title="跟进对象">
                    <span>{{ customerName }}</span>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="跟进方式" is-link @click="showA = true">
                    <span v-if="type == 0 || type">{{actions[type].name}}</span>
                    <span class="placeholder" v-else>请选择跟进方式</span>
                </van-cell>
            </van-cell-group>
            <v-form-textarea title="跟进内容" placeholder="请输入跟进内容" v-model="content"></v-form-textarea>
            <v-form-uploader title="图片" v-model="imgs" @OnRead="onRead" @RemoveImg="removeImg" placeholder="添加图片说明"></v-form-uploader>
        </div>
        <div class="button" @click="save()">确认提交</div>
        <van-actionsheet v-model="showA" :actions="actions" cancel-text="取消" @select="onSelect"/>
    </layout-base>
</template>

<script>
import { FollowType } from '../../assets/js/const.js';

export default {
    data () {
        return {
            showA   : false,
            type    : undefined,
            content : '',
            imgs    : [],
            imgID   : []
        }
    },
    computed: {
        actions () {
            return FollowType
        },
        customerName () {
            return this.$route.query.CustomerName
        }
    },
    methods: {
        onSelect (_v) {
            this.type  = this.actions.indexOf(_v)
            this.showA = false
        },
        onRead (_data) {
            if (this.imgID.length < 5) {
                this.imgs.push(this.$imgHost + _data)
                this.imgID.push(_data)
            } else {
                this.$toast('最多只能上传6张图')
            }
        },
        removeImg (_v) {
            this.imgID.splice(this.imgs.indexOf(_v), 1)
        },
        save () {
            if (!this.content) {
                this.$toast('请输入跟进内容')
                return;
            }
            this.$dialog.confirm({
                title: '确认',
                message: '确定提交该跟进记录吗？'
            }).then(() => {
                let query = this.$route.query
                let api = query.ID ? '/employee/NewCustomer/saveFollowRecord' : '/employee/NewCustomer/addFollowRecord'
                this.$ajax({
                    url: api,
                    data: {
                        ID      : query.ID,
                        CusID   : query.CustomerID,
                        CusType : query.CusType,
                        Type    : this.type,
                        Content : this.content,
                        ImgID   : this.imgID
                    }
                }).then((_res) => {
                    if (_res) {
                        this.$toast.success({
                            message: '提交成功',
                            duration: 1500
                        })
                        this.$router.go(-1)
                    }
                })
            }).catch(() => {})
        }
    }
}
</script>