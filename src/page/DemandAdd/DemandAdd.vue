<style lang="less" src="./DemandAdd.less" scoped></style>

<template>
    <layout-base id="DemandAdd">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户需求新增</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="customer.Name" :is-link="!customer.ID" @click="selectC()"></van-cell>
            <label-lsit title="需求" :labels="labels" value-key="Functions" @Select="selectLabel"></label-lsit>
            <v-form-textarea v-model="content" title="描述" placeholder="请输入描述内容"></v-form-textarea>
            <v-form-uploader title="图片" placeholder="添加图片说明" v-model="imgs" @OnRead="onRead" @RemoveImg="removeImg"></v-form-uploader>
            <div class="button" @click.stop="submit()">确认提交</div>
        </div>

        <customer-search v-model="showC" @Select="selectCustomer"></customer-search>
    </layout-base>
</template>

<script>
import LabelLsit from '../../components/LabelLsit/LabelLsit.vue'
import CustomerSearch from '../../components/CustomerSearch/CustomerSearch.vue'

export default {
    components: {
        CustomerSearch,
        LabelLsit
    },
    data () {
        return {
            showC: false,
            customer: {
                ID: this.$route.query.ID,
                Name: this.$route.query.Name
            },
            content: '',
            labels: [],
            demand: [],
            imgs: [],
            imgID: []
        }
    },
    methods: {
        selectC () {
            if (this.customer.ID) return;
            this.showC = true
        },
        selectCustomer (_c) {
            this.customer = _c
        },
        selectLabel (_items) {
            this.demand = _items.map(_item => _item.ID)
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
        submit () {
            if (!this.customer.ID) {
                this.$toast('请选择客户')
                return;
            }
            if (!this.content || !this.demand) {
                this.$toast('请选择需求标签和输入需求描述')
                return;
            }
            this.$dialog.confirm({
                title: '确定新增客户需求'
            }).then(() => {
                this.$ajax({
                    url: '/feedback/demand/create',
                    data: {
                        CustomerID: this.customer.ID,
                        Demand: this.demand,
                        Content: this.content,
                        ImgID: this.imgID
                    }
                }).then(() => {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '已成功新建一条客户需求，是否继续新建客户需求？'
                    }).then(() => {
                        this.content = ''
                        this.labels = []
                        this.demand = []
                        this.imgs = []
                        this.imgID = []
                    }).catch(() => {
                        this.$router.go(-1)
                    })
                })
            }).catch(() => {})
        }
    },
    created () {
        this.$ajax({
            url: '/project/Info/getFunctiondProjectList'
        }).then(_res => {
            this.labels = _res
        })
    }
}
</script>