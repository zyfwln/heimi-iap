<style lang="less" src="./ConsultAdd.less" scoped></style>

<template>
    <layout-base id="ConsultAdd">
        <v-header slot="header" class="header">
            <div class="title" slot="center">咨询记录</div>
        </v-header>
        <div class="page">
            <van-cell-group>
                <van-cell title="咨询对象" is-link @click="showC = true">
                    <span class="placeholder" :class="{ 'on': customer.Name }">{{customer.Name || '请选择咨询对象'}}</span>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="咨询方式" is-link @click="showA = true">
                    <span class="placeholder" :class="{ 'on': type }">{{(type && type.name) || '请选择咨询方式'}}</span>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="咨询项目" is-link @click="showP = true">
                    <span class="placeholder" :class="{ 'on': project }">{{project || '请选择咨询项目'}}</span>
                </van-cell>
            </van-cell-group>
            <v-form-textarea title="咨询内容" v-model="content" placeholder="请输入咨询内容"></v-form-textarea>
            <v-form-uploader title="图片" v-model="imgs" @OnRead="onRead" @RemoveImg="removeImg" placeholder="添加图片说明"></v-form-uploader>
            <div class="button" @click="submit()">确认提交</div>
        </div>

        <customer-search v-model="showC" :exclusive="false" @Select="selectCustomer" @AddCustomer="addCustomer"></customer-search>
        <customer-add    v-model="showAdd" :type="0" @AddCustomer="selectCustomer"></customer-add>
        <project-list    v-model="showP" @Select="selectProject"></project-list>
        <van-actionsheet v-model="showA" :actions="actions" cancel-text="取消" @select="onSelect"/>
    </layout-base>
</template>

<script>
import CustomerSearch  from '../../components/CustomerSearch/CustomerSearch.vue'
import CustomerAdd     from '../../components/CustomerAdd/CustomerAdd.vue'
import ProjectList     from '../../components/ProjectList/ProjectList.vue'
import { ConsultType } from '../../assets/js/const.js'

export default {
    components: {
        CustomerSearch,
        CustomerAdd,
        ProjectList
    },
    data () {
        return {
            type    : undefined,
            showC   : false,
            showP   : false,
            showA   : false,
            showAdd : false,
            project : '',
            content : '',
            actions : ConsultType,
            imgs    : [],
            imgID   : [],
            customer: {
                Name: ''
            },
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
        selectCustomer (_c) {
            this.customer = _c
        },
        addCustomer () {
            this.showAdd = true
        },
        selectProject (_item) {
            this.project = _item.ProjectName
        },
        onSelect (_v) {
            this.showA = false
            this.type = _v
        },
        submit () {
            this.$dialog.confirm({
                title: '提示',
                message: '确认并提交'
            }).then(() => {
                this.$ajax({
                    url: '/employee/AskRecord/save',
                    data: {
                        CusID: this.customer.ID,
                        AskSource: this.actions.indexOf(this.type),
                        AskContent: this.content,
                        AskProject: this.project,
                        ImgID: this.imgID
                    }
                }).then(() => {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '是否继续添加咨询记录'
                    }).then(() => {
                        Object.assign(this.$data, this.$options.data())
                        this.content = ''
                    }).catch(() => {
                        this.$router.go(-1)
                    })
                })
            }).catch(() => {
            })
        }
    }
}
</script>