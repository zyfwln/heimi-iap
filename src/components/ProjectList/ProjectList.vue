<style lang="less" src="./ProjectList.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base class="project-list" v-if="visibile">
            <div class="header" :style="bgColor" slot="header">
                <div class="iconfont icon-back" @click="back()"></div>
                <div class="title">项目列表</div>
                <div class="right"></div>
            </div>
            <!-- <div class="tab" v-show="customer">
                <div class="tab-li"
                    v-for="(v, i) in tab"
                    :key="i"
                    :class="{ 'on': activeIndex == i }"
                    @click="tabTo(i)">{{v}}</div>
            </div> -->
            <!-- 项目搜索 -->
            <van-search v-show="!isCustomer"
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        show-action
                        @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <!-- 会员已有项目 -->
            <div class="page" v-if="isCustomer">
                <v-list :show-loading="showLoading" :length="projects.length">
                    <div class="cell is-link" v-for="(v, i) in projects" :key="i" @click="select(v)">
                        <div class="value">{{v.course.CourseName}}</div>
                        <div class="iconfont icon-right"></div>
                    </div>
                </v-list>
            </div>
            <!-- 门店项目 -->
            <div class="page" v-else>
                <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad">
                    <!-- 展示项目下的疗程 -->
                    <van-collapse v-model="activeName" accordion v-if="detail">
                        <van-collapse-item v-for="(item, index) in list"
                                            :key="index"
                                            :name="index"
                                            :title="item.ProjectName">
                            <van-cell v-for="(v, i) in item.course"
                                        :key="i"
                                        is-link
                                        :title="v.CourseName"
                                        @click="select(item, v)">
                                <span class="value">￥{{$utils.MoneyFormat(v.SellMoney)}}</span>
                            </van-cell>
                        </van-collapse-item>
                    </van-collapse>
                    <!-- 只显示项目 -->
                    <div class="cell is-link" v-for="(v, i) in list" :key="i" @click="select(v)" v-else>
                        <div class="value">{{v.ProjectName}}</div>
                        <div class="iconfont icon-right"></div>
                    </div>
                </van-list>
            </div>
        </layout-base>
    </transition>
</template>

<script>
export default {
    model: {
        prop: 'visibile',
        event: 'Hidden'
    },
    props: {
        visibile  : Boolean,
        detail    : Boolean,
        isCustomer: Boolean,
        customer  : [String, Number],
        bgColor  : String
    },
    data () {
        return {
            loading     : false,
            showLoading : true,
            finished    : false,
            activeIndex : this.customer ? 0 : 1,
            page        : 1,
            value       : '',
            tab         : ['会员已有项目', '所有项目'],
            activeName  : [],
            list        : [],
            projects    : []
        }
    },
    mounted () {
        if (this.isCustomer && this.customer) {
            this.getProjects()
        }
    },
    watch: {
        isCustomer (_v) {
            if (_v && this.projects.length == 0) {
                this.getProjects()
            }
        },
        customer (_v) {
            if (_v && this.isCustomer) {
                this.getProjects()
            }
        }
    },
    methods: {
        back () {
            this.$emit('Hidden', false)
        },
        // tabTo (_i) {
        //     this.activeIndex = _i
        //     if (_i == 0 && this.projects.length == 0) {
        //         this.getProjects()
        //     }
        // },
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url: '/project/Info/getProjects',
                    data: {
                        text: this.value,
                        list_rows: 20,
                        page: this.page
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res.list.data.filter(_item => _item.ID))
                    this.loading = false
                    this.page += 1
                    if (this.list.length >= _res.list.total) {
                        this.finished = true
                    }
                })
            }, 500)
        },
        getProjects () {
            this.$ajax({
                url : '/project/Info/getCustomerProject',
                data: {
                    CustomerID: this.customer
                }
            }).then((_res) => {
                this.projects    = _res.project.filter((_item) => _item.course)
                this.showLoading = false
            })
        },
        onSearch () {
            this.list     = []
            this.page     = 1
            this.finished = false
        },
        select (_p, _c) {
            this.$emit('Select', _p, _c)
            this.back()
        }
    }
}
</script>