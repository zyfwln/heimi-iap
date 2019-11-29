<style lang="less" src="./CureRegister.less" scoped></style>

<template>
    <layout-base id="CureRegister">
        <v-header class="header" slot="header">
            <div class="title" slot="center">疗效记录</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="info.info.CustomerName"></van-cell>
            <van-cell title="项目" :value="info.info.ProjectName"></van-cell>
            <van-cell title="类型" :value="`第${info.info.Times + 1}次记录`" v-if="info.type == 0"></van-cell>
            <van-cell title="类型" value="副反应" v-else></van-cell>
            <v-form-textarea v-model="content" title="描述" placeholder="请输入描述"></v-form-textarea>
            <cure-uploader @RemoveImg="removeImg" @OnRead="onRead"></cure-uploader>

            <div class="button" @click.stop="submit()">确认提交</div>
        </div>
    </layout-base>
</template>

<script>
import CureUploader from '../../components/CureUploader/CureUploader.vue'

export default {
    components: {
        CureUploader
    },
    data () {
        return {
            info: this.$route.query,
            content: '',
            imgID: ['', '', '']
        }
    },
    methods: {
        removeImg (_i) {
            this.imgID[_i] = ''
        },
        onRead (_img, _i) {
            this.imgID[_i] = _img
        },
        submit () {
            if (!this.content) {
                this.$toast(`请输入${['治疗', '副反应'][this.info.type]}描述`)
                return;
            }
            this.$dialog.confirm({
                title: '确认',
                message: '确认提交该记录吗？'
            }).then(() => {
                this.$ajax({
                    url: ['/feedback/TreatmentEffect/save', 'feedback/SideReaction/create'][this.info.type],
                    data: {
                        ID: this.info.info.ID,
                        CustomerID: this.info.info.CustomerID,
                        ProjectName: this.info.info.ProjectName,
                        ProjectID: this.info.info.ProjectID,
                        Content: this.content,
                        ImgID: this.imgID
                    }
                }).then(() => {
                    this.$toast('记录已保存')
                })
            }).catch(() => {})
        }
    }
}
</script>