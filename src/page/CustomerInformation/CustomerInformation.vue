<style lang="less" src="./CustomerInformation.less" scoped></style>

<template>
    <layout-base id="CustomerInformation">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户资料</div>
        </v-header>
        <div class="page">
            <div class="box" v-if="personality">
                <div class="b-hd border-bottom">个性资料</div>
                <div class="b-bd">
                    <div class="row">
                        <div class="column">
                            <div class="title">星座：</div>
                            <div class="value">{{personality.Star || '无'}}</div>
                        </div>
                        <div class="column">
                            <div class="title">血型：</div>
                            <div class="value">
                                <div class="select" @click="show = true">
                                    <input type="c" v-model="blood" readonly>
                                    <div class="down"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="title">属相：</div>
                            <div class="value">{{personality.Animals || '无'}}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="title">性格颜色：</div>
                            <div class="value">
                                <div class="color-box">
                                    <div class="color" :class="{ 'on' : colorActive == i }" v-for="(v, i) in colors" :key="i" @click="tabColor(i)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="title">爱好：</div>
                            <div class="value">
                                <div class="input w100">
                                    <input type="text" v-model="hobby">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box" v-if="asset">
                <div class="b-hd border-bottom">资产信息</div>
                <div class="b-bd">
                    <div class="row">
                        <div class="column">
                            <div class="title">薪资：</div>
                            <div class="value">
                                <div class="input">
                                    <input type="number" v-model="salary">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="title">存款：</div>
                            <div class="value">
                                <div class="input">
                                    <input type="number" v-model="deposit">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="title">车辆信息：</div>
                        </div>
                    </div>
                    <div class="row info" v-for="(v, i) in asset.CarInfo" :key="i">
                        <div class="column">
                            <div class="title">品牌：</div>
                            <div class="value">{{v.Brand}}</div>
                        </div>
                        <div class="column">
                            <div class="title">车型：</div>
                            <div class="value">{{v.CarType}}</div>
                        </div>
                        <div class="column">
                            <div class="title">车牌号：</div>
                            <div class="value">{{v.CarNo}}</div>
                        </div>
                        <div class="column">
                            <div class="value">
                                <span class="red" @click="edit(0, v)">修改</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="value">
                                <span class="add" @click="add(0)">添加车辆</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="title">房产信息：</div>
                        </div>
                    </div>
                    <div class="row info" v-for="(v, i) in asset.HouseInfo" :key="i + 100">
                        <div class="column">
                            <div class="title">类型：</div>
                            <div class="value">{{v.HouseType}}</div>
                        </div>
                        <div class="column">
                            <div class="title">价值：</div>
                            <div class="value">{{Number(v.Value)}}</div>
                        </div>
                        <div class="column">
                            <div class="title">小区：</div>
                            <div class="value">{{v.Address}}</div>
                        </div>
                        <div class="column">
                            <div class="value">
                                <span class="red" @click="edit(1, v)">修改</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="value">
                                <span class="add" @click="add(1)">添加房产</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="b-hd border-bottom">特殊日期</div>
                <div class="b-bd">
                    <div class="row" v-for="(v, i) in special" :key="i + 1000">
                        <div class="column">
                            <div class="title">{{v.Type}}</div>
                        </div>
                        <div class="column">
                            <div class="value">
                                <span class="date">{{v.SDate.substr(0, 10)}}</span>
                                <span class="red" @click="edit(2, v)">修改</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="value">
                                <span class="add" @click="add(2)">添加事件</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button" @click="saveAll()">保存修改</div>

        <van-dialog v-model="showB" show-cancel-button :before-close="beforeCloseA">
            <van-field v-model="name0" :label="source[0].label" :placeholder="source[0].place"/>
            <van-field v-model="name1" :label="source[1].label" :placeholder="source[1].place" :type="type == 1 ? 'number' : 'text'" :readonly="type == 2" @click="showDate()"/>
            <van-field v-model="name2" :label="source[2].label" :placeholder="source[2].place" v-if="type != 2"/>
        </van-dialog>

        <van-dialog v-model="showE" show-cancel-button :before-close="beforeCloseE">
            <van-field v-model="edit0" :label="source[0].label" :placeholder="source[0].place"/>
            <van-field v-model="edit1" :label="source[1].label" :placeholder="source[1].place" :type="type == 1 ? 'number' : 'text'" :readonly="type == 2" @click="showDate()"/>
            <van-field v-model="edit2" :label="source[2].label" :placeholder="source[2].place" v-if="type != 2"/>
        </van-dialog>

        <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />

        <van-popup v-model="showP">
            <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @confirm="confirmDate" @cancel="cancelDate" />
        </van-popup>
    </layout-base>
</template>

<script>
import { Blood } from '../../assets/js/const.js'

export default {
    data () {
        return {
            personality: {},
            asset: {},
            special: {},
            colors: ['红', '黄', '蓝', '绿'],
            colorActive: -1,
            show: false,
            actions: Blood,
            blood: '',
            hobby: '',
            salary: '',
            deposit: '',

            type: 0,
            showB: false,
            name0: '',
            name1: '',
            name2: '',
            showE: false,
            edit0: '',
            edit1: '',
            edit2: '',
            editID: '',
            showP: false,
            minDate: new Date('1970-01-01'),
            currentDate: new Date()
        }
    },
    computed: {
        source () {
            return [
                [
                    { label: '品牌', place: '请输入品牌' },
                    { label: '车型', place: '请输入车型' },
                    { label: '车牌', place: '请输入车牌号' }
                ],
                [
                    { label: '类型', place: '请输入房子类型(如：套房)' },
                    { label: '价值', place: '请输入房产估值' },
                    { label: '小区', place: '请输入所在小区' }
                ],
                [
                    { label: '事件', place: '请输入事件内容' },
                    { label: '日期', place: '请选择日期' }
                ]
            ][this.type]
        }
    },
    methods: {
        tabColor (_i) {
            this.colorActive = _i
        },
        onSelect (_v) {
            this.show = false
            this.blood = _v.name
        },
        add (_i) {
            this.type = _i
            this.showB = true
        },
        edit (_i, _v) {
            this.type = _i
            this.showE = true
            this.editID = _v.ID
            this.edit0 = _v.Brand || _v.HouseType || _v.Type
            this.edit1 = _v.CarType || _v.Value || _v.SDate.substr(0, 10)
            this.edit2 = _v.CarNo || _v.Address
        },
        showDate () {
            if (this.type == 2) {
                this.showP = true
            }
        },
        confirmDate (_date) {
            if (this.showE) this.edit1 = _date.DateFormat()
            if (this.showB) this.name1 = _date.DateFormat()
            this.showP = false
        },
        cancelDate () {
            this.showP = false
        },
        beforeCloseA (_action, done) {
            if (_action === 'confirm') {
                let id = this.$route.query.ID
                let api = ['/customer/info/incCarInfo', '/customer/info/inHouseInfo', '/customer/info/incSpecialDate'][this.type]
                let param = [
                    {
                        Brand: this.name0,
                        CarType: this.name1,
                        CarNo: this.name2,
                        CustomerID: id
                    },
                    {
                        HouseType: this.name0,
                        Value: this.name1,
                        Address: this.name2,
                        CustomerID: id
                    },
                    {
                        Type: this.name0,
                        SDate: this.name1,
                        CustomerID: id
                    }
                ][this.type]
                setTimeout(() => {
                    this.$ajax({
                        url: api,
                        data: param
                    }).then(() => {
                        this.$toast(`成功添加一条${['车辆信息', '房产信息', '特殊日子'][this.type]}`)
                        this.name0 = ''
                        this.name1 = ''
                        this.name2 = ''
                        if (this.type == 2) this.getSpecialDate()
                        else this.getAssetInformation()
                    })
                    done()
                }, 500);
            } else {
                done()
            }
        },
        beforeCloseE (_action, done) {
            if (_action === 'confirm') {
                let id = this.$route.query.ID
                let api = ['/customer/info/updateCarInfo', '/customer/info/updateHouseInfo', '/customer/info/updateSpecialDate'][this.type]
                let param = [
                    {
                        ID: this.editID,
                        Brand: this.edit0,
                        CarType: this.edit1,
                        CarNo: this.edit2,
                        CustomerID: id
                    },
                    {
                        ID: this.editID,
                        HouseType: this.edit0,
                        Value: this.edit1,
                        Address: this.edit2,
                        CustomerID: id
                    },
                    {
                        ID: this.editID,
                        Type: this.edit0,
                        SDate: this.edit1,
                        CustomerID: id
                    }
                ][this.type]
                setTimeout(() => {
                    this.$ajax({
                        url: api,
                        data: param
                    }).then(() => {
                        this.$toast(`成功修改一条${['车辆信息', '房产信息', '特殊日子'][this.type]}`)
                        this.edit0 = ''
                        this.edit1 = ''
                        this.edit2 = ''
                        if (this.type == 2) this.getSpecialDate()
                        else this.getAssetInformation()
                    })
                    done()
                }, 500);
            } else {
                done()
            }
        },
        getPersonalityData () {
            this.$ajax({
                url: '/customer/info/getPersonalityData',
                data: {
                    CustomerID: this.$route.query.ID
                }
            }).then((_res) => {
                this.personality = _res
                this.blood = _res.BloodType
                this.colorActive = this.colors.indexOf(_res.CharacterColor)
                this.hobby = _res.Hobby
            })
        },
        getAssetInformation () {
            this.$ajax({
                url: '/customer/info/getAssetInformation',
                data: {
                    CustomerID: this.$route.query.ID
                }
            }).then((_res) => {
                this.asset = _res
                this.salary = Number(_res.MonthlySalary)
                this.deposit = Number(_res.Deposit)
            })
        },
        getSpecialDate () {
            this.$ajax({
                url: '/customer/info/getSpecialDate',
                data: {
                    CustomerID: this.$route.query.ID
                }
            }).then((_res) => {
                this.special = _res
            })
        },
        saveAll () {
            this.$ajax({
                url: '/customer/info/updatePersonalityData',
                data: {
                    CustomerID: this.$route.query.ID,
                    Hobby: this.hobby,
                    CharacterColor: this.colors[this.colorActive],
                    BloodType: this.blood
                }
            }).then(() => {
                this.$ajax({
                    url: '/customer/info/updateAssetInformation',
                    data: {
                        CustomerID: this.$route.query.ID,
                        MonthlySalary: this.salary,
                        Deposit: this.deposit
                    }
                }).then(() => {
                    this.$toast('已保存')
                })
            })
        }
    },
    created () {
        this.getPersonalityData()
        this.getAssetInformation()
        this.getSpecialDate()
    }
}
</script>