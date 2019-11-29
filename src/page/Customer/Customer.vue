<style lang="less" src="./Customer.less" scoped></style>

<template>
    <layout-base id="Customer">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户资料</div>
        </v-header>
        <div class="page" v-if="customer">
            <div class="c-header">
                <img :src="customer.Sex == '男' ? manImg : womenImg" class="header-img" @click="toInformation()">
                <div class="header-wrap">
                    <div class="wrap-hd">
                        <div class="hd-l">
                            <div class="l-t">
                                <span>{{customer.Name}}</span>
                                <font>{{customer.ExtendInfo && customer.ExtendInfo.CustomerType}}级</font>
                            </div>
                            <div class="l-f">
                                {{customer.Mobile}}
                                <span style="font-size: 14px;color: #4794ff;" @click="callMobile(customer.Mobile);"><i class="ic-mobile"></i>拨号</span>
                            </div>
                        </div>
                        <div class="hd-r">
                            <!-- <div class="btn" @click="toCare()">客户关怀</div> -->
                        </div>
                    </div>
                    <!-- <div class="wrap-bd">
                        <div class="bd-li">所属门店：卧龙店</div>
                        <div class="bd-li">专属技师：小美</div>
                    </div> -->
                </div>
            </div>
            <div class="c-section">
                <div class="s-item">
                    <span class="name">注册时间</span>
                    <span class="fr">{{customer.IssueDate && customer.IssueDate.substr(0, 10)}}</span>
                </div>
                <div class="s-item">
                    <span class="name">最后到店</span>
                    <span class="fr">{{customer.LastArrivalDate && customer.LastArrivalDate.substr(0, 10)}}</span>
                </div>
                <div class="s-item">
                    <span class="name">年消费</span>
                    <span class="fr">￥{{$utils.MoneyFormat(customer.ExtendInfo && customer.ExtendInfo.ConsumeTotal)}}</span>
                </div>
                <div class="s-item">
                    <span class="name">总欠款</span>
                    <span class="fr">￥{{$utils.MoneyFormat(customer.ExtendInfo && customer.ExtendInfo.DebtTotal)}}</span>
                </div>
            </div>

            <div class="c-infos">
                <van-collapse v-model="activeName1" accordion>
                    <van-collapse-item title="基本资料" name="0">
                        <van-cell title="姓名">
                            <div class="value">{{base.Name}}</div>
                        </van-cell>
                        <van-cell title="性别">
                            <div class="value">{{base.Sex}}</div>
                        </van-cell>
                        <van-cell title="生日">
                            <div class="value">{{base.BirthDate && base.BirthDate.substr(0, 10)}}</div>
                        </van-cell>
                        <van-cell title="身份证">
                            <div class="value">{{base.IDCard}}</div>
                        </van-cell>
                        <van-cell title="详细地址">
                            <div class="value">{{base.Address}}</div>
                        </van-cell>
                    </van-collapse-item>

                    <van-collapse-item title="联系方式" name="1">
                        <van-cell title="手机号">
                            <div class="value">{{contact.Mobile}}</div>
                        </van-cell>
                        <van-cell title="QQ">
                            <div class="value">{{contact.QQ}}</div>
                        </van-cell>
                    </van-collapse-item>

                    <van-collapse-item title="来源与介绍人" name="2">
                        <van-cell title="客户来源">
                            <div class="value">{{from.Type}}</div>
                        </van-cell>
                        <van-cell title="介绍人">
                            <div class="value">{{from.Name}}</div>
                        </van-cell>
                    </van-collapse-item>

                    <van-collapse-item title="公司信息" name="3">
                        <van-cell title="服务公司">
                            <div class="value">{{company.Company}}</div>
                        </van-cell>
                        <van-cell title="职位">
                            <div class="value">{{company.Fposition}}</div>
                        </van-cell>
                        <van-cell title="邮箱">
                            <div class="value">{{company.Email}}</div>
                        </van-cell>
                    </van-collapse-item>
                </van-collapse>
            </div>

            <!-- <div class="c-cells">
                <van-cell v-for="(v, i) in links" :key="i" is-link>
                    <span slot="title">{{v.name}}</span>
                </van-cell>
            </div> -->
        </div>
        <div class="c-foot" slot="footer">
            <div class="foot-link" v-for="(v, i) in foots" :key="i" @click="linkTo(v.link)">
                <div class="link-icon">
                    <i class="iconfont" :class="v.icon"></i>
                </div>
                <div class="link-name">{{v.name}}</div>
            </div>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            manImg: require('../../assets/image/man.png'),
            womenImg: require('../../assets/image/women.png'),
            customer: {},
            activeName1: [],
            activeName2: [],
            activeName3: [],
            activeName4: [],
            links: [
                { name: '个性资料', link: '' },
                { name: '资产信息', link: '' },
                { name: '特殊日期', link: '' }
            ],
            foots: [
                { name: '疗效', icon: 'icon-cure', link: '/Guest/CustomerCureEffect' },
                { name: '客户需求', icon: 'icon-opinion', link: '/Guest/CustomerDemand' },
                { name: '客情', icon: 'icon-plane', link: '/Guest/CustomerSituation' },
                { name: '意见建议', icon: 'icon-news-2', link: '/Guest/CustomerProposal' }
            ],
            base: {},
            contact: {},
            from: {},
            company: {}
        }
    },
    methods: {
        linkTo (_link) {
            _link && this.$router.push({
                path: _link,
                query: {
                    ID: this.customer.CustomerID,
                    Name: this.customer.Name
                }
            })
        },
        toInformation () {
            this.$router.push({
                path: '/Guest/CustomerInformation',
                query: {
                    ID: this.$route.query.ID
                }
            })
        },
        toCare () {
            this.$router.push({
                path: '/Guest/CustomerCare',
                query: {
                    ID: this.$route.query.ID,
                    Name: this.customer.Name
                }
            })
        },
        // 拨打电话
        callMobile(mobile){
            if (mobile) {
                window.location.href = `tel:${mobile}`
            } else {
                this.$toast('找不到电话')
            }
        }
    },
    created () {
        let id = this.$route.query.ID
        this.$ajax({
            url: '/customer/Info/getInfo',
            data: {
                CustomerID: id
            }
        }).then((_res) => {
            this.customer = _res
        })

        this.$ajax({
            url: '/customer/info/getBaseData',
            data: {
                CustomerID: id
            }
        }).then((_res) => {
            this.base = _res
        })

        this.$ajax({
            url: '/customer/info/getContactInformation',
            data: {
                CustomerID: id
            }
        }).then((_res) => {
            this.contact = _res
        })

        this.$ajax({
            url: '/customer/info/getSource',
            data: {
                CustomerID: id
            }
        }).then((_res) => {
            this.from = _res
        })

        this.$ajax({
            url: '/customer/info/getCustomerCompanyInfo',
            data: {
                CustomerID: id
            }
        }).then((_res) => {
            this.company = _res
        })
    }
}
</script>
<style lang="less" scoped>
    .ic-mobile{
        display: inline-block;
        content: " ";
        width: 17px;
        height: 17px;
        background: url("../../assets/image/ic_mobile.png");
        background-size: 100%;
        vertical-align: middle;
        margin-right: 5px;
        margin-top: -2px;
        margin-left: 10px;
    }
</style>
