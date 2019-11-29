<style lang="less" src="./CustomerCureEffect.less" scoped></style>

<template>
    <layout-base id="CustomerCureEffect">
        <v-header class="header" slot="header">
            <div class="title" slot="center">治疗效果</div>
        </v-header>
        <div class="page">
            <v-list class="items" :length="list.length" :show-loading="showLoading">
                <van-cell-group v-for="(v, i) in list" :key="i">
                    <van-cell :title="v.ProjectName" is-link @click="toDetail(v)"></van-cell>
                    <van-cell>
                        <span class="title" slot="title">疗效记录</span>
                        <div class="value">
                            <span>{{Number(v.Times) - Number(v.RemainTimes)}}/{{v.Times}}</span>
                        </div>
                    </van-cell>
                    <van-cell :value="v.SideReactionCount.total">
                        <span class="title" slot="title">副反应</span>
                    </van-cell>
                    <van-cell title="">
                        <div class="btns">
                            <div class="btn" :class="{ 'off': v.NeedPhoto.length == 0 }" @click="toRegister(v, 0)">疗效记录</div>
                            <div class="btn" @click="toRegister(v, 1)">副反应记录</div>
                        </div>
                    </van-cell>
                </van-cell-group>
            </v-list>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            showLoading: true
        }
    },
    methods: {
        toRegister (_v, _t) {
            if (_t == 0 && _v.NeedPhoto.length == 0) return;
            this.$router.push({
                path: '/Guest/CureRegister',
                query: {
                    type: _t,
                    info: {
                        ID: _v.ID,
                        CustomerID: this.$route.query.ID,
                        CustomerName: this.$route.query.Name,
                        ProjectName: _v.ProjectName,
                        ProjectID: _v.SideReactionCount.CusProjectID,
                        Times: Number(_v.Times) - Number(_v.RemainTimes)
                    }
                }
            })
        },
        toDetail (_v) {
            this.$router.push({
                path: '/Guest/CureDetail',
                query: {
                    ID: _v.ID,
                    ProjectName: _v.ProjectName,
                    CustomerID: this.$route.query.ID
                }
            })
        }
    },
    created () {
        this.$ajax({
            url: '/feedback/TreatmentEffect/getProjectList',
            data: {
                CustomerID: this.$route.query.ID
            }
        }).then((_res) => {
            this.list = _res
            this.showLoading = false
        })
    }
}
</script>