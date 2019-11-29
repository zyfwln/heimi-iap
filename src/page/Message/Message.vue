<style lang="less" src="./Message.less" scoped></style>

<template>
    <layout-base id="Message">
        <v-header class="header" slot="header">
            <div slot="left"></div>
            <div class="title" slot="center">消息中心</div>
            <div slot="right"></div>
        </v-header>
        <div class="page">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="item" v-for="(v, i) in list" :key="i">
                    <div class="hd">{{v.RemindDate && v.RemindDate.substr(0, 16)}}</div>
                    <div class="bd" @click="readMessage(v)">
                        <i class="unread" v-show="v.Status == 0 && !isSelect"></i>
                        <h3 class="van-ellipsis">{{v.Title}}</h3>
                        <p class="van-ellipsis">{{v.Content}}</p>
                    </div>
                    <div class="iconfont is-select" :class="deleteIDs.indexOf(v.ID) >= 0 ? 'icon-checkbox-yes-r' : 'icon-checkbox-no-r'" v-show="isSelect"></div>
                </div>
            </van-list>
        </div>
        <div class="operate" v-if="isSelect">
            <div class="li" @click="deleteAll()">删除</div>
            <div class="li" @click="selectAll()">全选</div>
            <div class="li" @click="cancelSelect()">取消全选</div>
        </div>

        <van-dialog v-model="show" show-cancel-button confirm-button-text="删除消息" cancel-button-text="了解" @confirm="confirmDelete">
            <div class="message-box">
                <h3>{{message.Title}}</h3>
                <p>{{message.Content}}</p>
            </div>
        </van-dialog>

        <v-footer slot="footer"></v-footer>
    </layout-base>
</template>

<script>
import TouchLongPress from '../../components/TouchLongPress/TouchLongPress.vue'
import Footer from '../../components/Footer/Footer.vue'

export default {
    components: {
        'v-footer': Footer,
        TouchLongPress
    },
    data () {
        return {
            show: false,
            loading: false,
            finished: false,
            page: 1,
            list: [],
            message: {},
            deleteIDs: [],
            isSelect: false
        }
    },
    methods: {
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url: '/employee/Notice/getList',
                    data: {
                        page: this.page,
                        list_rows: 20
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res)
                    this.loading = false
                    this.page += 1
                    if (_res.length < 20) {
                        this.finished = true
                    }
                })
            }, 500)
        },
        clear () {
            this.list = []
            this.page = 1
            this.finished = false
        },
        readMessage (_m) {
            if (this.isSelect) {
                let i = this.deleteIDs.indexOf(_m.ID)
                i >= 0 ? this.deleteIDs.splice(i, 1) : this.deleteIDs.push(_m.ID)
            } else {
                this.message = _m
                this.show = true
                if (_m.Status == 0) {
                    this.$ajax({
                        url: '/employee/Notice/setHasRead',
                        data: {
                            ID: _m.ID
                        }
                    }).then(() => {
                        this.clear()
                    })
                }
            }
        },
        confirmDelete () {
            this.$dialog.confirm({
                title: '提示',
                message: '确定删除消息吗？删除后将不会再出现在消息列表'
            }).then(() => {
                this.$ajax({
                    url: '/employee/Notice/delMsg',
                    data: {
                        ID: this.message.ID
                    }
                }).then(() => {
                    this.$toast('消息已删除')
                    this.clear()
                })
            }).catch(() => {})
        },
        longPressDone (_v) {
            this.isSelect = true
            this.deleteIDs.push(_v.ID)
        },
        deleteAll () {
            if (this.deleteIDs.length == 0) {
                this.$toast('请至少选择一项才能删除')
            } else {
                this.$dialog.confirm({
                    title: '确定删除批量消息吗？删除后将不会再出现在消息列表'
                }).then(() => {
                    this.$ajax({
                        url: '/employee/Notice/batchDel',
                        data: {
                            IDs: this.deleteIDs
                        }
                    }).then(() => {
                        this.$toast('消息已删除')
                        this.isSelect = false
                        this.deleteIDs = []
                        this.clear()
                    })
                }).catch(() => {})
            }
        },
        selectAll () {
            this.deleteIDs = this.list.map(_item => _item.ID)
        },
        cancelSelect () {
            this.deleteIDs = []
        }
    }
}
</script>