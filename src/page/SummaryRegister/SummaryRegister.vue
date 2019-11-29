<style lang="less" src="./SummaryRegister.less" scoped></style>

<template>
    <transition name="trans">
        <layout-base id="SummaryRegister" v-if="visibile">
            <div class="header" slot="header">
                <div class="iconfont icon-back" @click="back()"></div>
                <div class="title">{{title[index]}}</div>
            </div>

            <div class="form">
                <van-cell title="客户" :value="info.Customer.Name"></van-cell>

                <div class="view" v-show="index == 0">
                    <van-cell title="项目" :value="info.ProjectName"></van-cell>
                    <van-cell title="类型" :value="`第${info.Times}次拍照`"></van-cell>
                    <v-form-textarea title="内容" v-model="values[index].Content" placeholder="请输入内容"></v-form-textarea>
                    <v-form-uploader title="图片" v-model="values[index].imgs" @OnRead="onRead" @RemoveImg="removeImg" placeholder="添加图片说明"></v-form-uploader>
                </div>

                <div class="view" v-show="index == 1">
                    <van-cell title="项目" :value="info.ProjectName"></van-cell>
                    <van-cell title="类型" value="副反应"></van-cell>
                    <v-form-textarea title="内容" v-model="values[index].Content" placeholder="请输入内容"></v-form-textarea>
                    <v-form-uploader title="图片" v-model="values[index].imgs" @OnRead="onRead" @RemoveImg="removeImg" placeholder="添加图片说明"></v-form-uploader>
                </div>

                <div class="view" v-show="index == 2">
                    <label-lsit title="需求" :labels="labels" value-key="Functions" @Select="selectLabel"></label-lsit>
                    <v-form-textarea title="描述" v-model="values[index].Content" placeholder="请输入描述内容"></v-form-textarea>
                    <v-form-uploader title="图片" v-model="values[index].imgs" @OnRead="onRead" @RemoveImg="removeImg" placeholder="添加图片说明"></v-form-uploader>
                </div>

                <div class="view" v-show="index == 3">
                    <v-form-textarea title="内容" v-model="values[index].Content" placeholder="请输入客户当下情况、心情"></v-form-textarea>
                </div>

                <div class="view" v-show="index == 4">
                    <v-form-textarea title="内容" v-model="values[index].Content" placeholder="请输入客户投诉内容"></v-form-textarea>
                </div>

                <div class="button" @click.stop="submit()">确认提交（{{index + 1}}/5）</div>
            </div>
        </layout-base>
    </transition>
</template>

<script>
import LabelLsit from '../../components/LabelLsit/LabelLsit.vue'

export default {
    components: {
        LabelLsit
    },
    props: {
        index: {
            type: Number,
            default: 0
        },
        visibile: Boolean,
        info: Object
    },
    data () {
        return {
            title: ['客户拍照', '疗效记录', '客户需求', '客情入口', '客诉中心'],
            labels: [],
            Demand: [],
            values: [
                {
                    Content: '',
                    ImgID: [],
                    imgs: []
                },
                {
                    CustomerID: this.info.CustomerID,
                    ProjectName: this.info.ProjectName,
                    ProjectID: this.info.ID,
                    Content: '',
                    ImgID: [],
                    imgs: []
                },
                {
                    Content: '',
                    Demand: [],
                    ImgID: [],
                    imgs: []
                },
                {
                    Content: '',
                    ImgID: [],
                    imgs: []
                },
                {
                    Content: '',
                    ImgID: [],
                    imgs: []
                }
            ]
        }
    },
    methods: {
        clear () {
            this.values = [
                {
                    Content: '',
                    ImgID: [],
                    imgs: []
                },
                {
                    CustomerID: this.info.CustomerID,
                    ProjectName: this.info.ProjectName,
                    ProjectID: this.info.ID,
                    Content: '',
                    ImgID: [],
                    imgs: []
                },
                {
                    Content: '',
                    Demand: [],
                    ImgID: [],
                    imgs: []
                },
                {
                    Content: '',
                    ImgID: [],
                    imgs: []
                },
                {
                    Content: '',
                    ImgID: [],
                    imgs: []
                }
            ]
        },
        back () {
            this.$emit('RegisterHidden', false);
        },
        submit () {
            let api = [
                '/feedback/TreatmentEffect/save',
                '/feedback/SideReaction/create',
                '/feedback/demand/create',
                '/feedback/Situation/create',
                '/feedback/Opinion/create'
            ]
            let i = this.index
            let info = this.info
            let param = this.values[i]
            switch (i) {
                case 0:
                    param.ID = info.ID
                    break;

                case 1:
                    param.CustomerID = info.CustomerID
                    param.ProjectName = info.ProjectName
                    param.ProjectID = info.ID
                    break;

                case 2:
                    param.ID = info.ID
                    param.CustomerID = info.CustomerID
                    param.Demand = this.Demand
                    break;
                
                case 3:
                    param.ID = info.ID
                    param.CustomerID = info.CustomerID
                    break;
            
                default:
                    param.CustomerID = info.CustomerID
                    break;
            }
            this.$ajax({
                url: api[i],
                data: param
            }).then(() => {
                this.clear()
                this.$toast('已保存记录')
            })
            this.$emit('Submit');
            this.back();
        },
        selectLabel (_items) {
            this.Demand = _items.map(_item => _item.ID)
        },
        onRead (_data) {
            if (this.values[this.index].ImgID.length < 5) {
                this.values[this.index].imgs.push(this.$imgHost + _data)
                this.values[this.index].ImgID.push(_data)
            } else {
                this.$toast('最多只能上传6张图')
            }
        },
        removeImg (_v) {
            this.values[this.index].ImgID.splice(this.values[this.index].imgs.indexOf(_v), 1)
        }
    },
    created () {
        this.$ajax({
            url: '/project/Info/getFunctiondProjectList'
        }).then((_res) => {
            this.labels = _res
        })
    }
}
</script>