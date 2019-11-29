<style lang="less" src="./CareRegister.less" scoped></style>

<template>
    <layout-base id="CareRegister">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户关怀</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="query.Name"></van-cell>
            <v-form-textarea v-model="content" title="内容" placeholder="请输入内容"></v-form-textarea>
            <v-form-uploader title="图片" v-model="imgs" @OnRead="onRead" @RemoveImg="removeImg" placeholder="添加图片说明"></v-form-uploader>
        </div>
        <div class="button" @click.stop="submit()">确认提交</div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            query: this.$route.query,
            content: '',
            imgs: [],
            imgID: []
        }
    },
    methods: {
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
        submit () {
            if (!this.content) {
                this.$toast('请输入关怀内容')
                return;
            }
            this.$dialog.confirm({
                title: '确认',
                message: '是否确认提交'
            }).then(() => {
                this.$ajax({
                    url: '/customer/Care/saveCareRecord',
                    data: {
                        ID: this.query.ID,
                        Content: this.content,
                        ImgID: this.imgID
                    }
                }).then(() => {
                    this.$toast('提交成功')
                    this.$router.go(-1)
                })
            }).catch(() => {})
        }
    }
}
</script>