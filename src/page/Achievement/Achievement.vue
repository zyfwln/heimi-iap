<style lang="less" src="./Achievement.less" scoped></style>

<template>
    <layout-base id="Achievement">
        <v-header slot="header" class="header">
            <div class="title" slot="center">业绩分配</div>
        </v-header>
        <div class="overview">
            <span>{{new Date().DateFormat()}}</span>
            <h3>销售</h3>
            <!-- <p>我帮了你，分业绩天经地义；你帮了我，分业绩理所应当<br>规则共同遵循，合作才能愉快长久</p> -->
        </div>

        <div class="page">
            <van-cell is-link v-for="(v, i) in items" :key="i" @click="linkTo(i)">
                <div class="title" slot="title">
                    <div>{{v.title}}</div>
                </div>
                <div class="value" v-show="v.value > 0">
                    <i class="fr">{{v.value}}</i>
                </div>
            </van-cell>
        </div>

        <van-button tag="div" @click="toApply()">申请分配业绩</van-button>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            items: [
                { title: '确认同事申请',    value: 0 },
                { title: '申请未确认',      value: 0 },
                { title: '申请被拒绝',      value: 0 }
            ]
        }
    },
    methods: {
        linkTo (_i) {
            this.$router.push({
                path    : '/Home/AchievementChange',
                query   : {
                    Type: _i
                }
            })
        },
        toApply () {
            this.$router.push({
                path: '/Home/AchievementApply'
            })
        }
    },
    created () {
        this.$ajax({
            url: '/employee/achieve/getDistributionHome'
        }).then((_res) => {
            this.items = this.items.map((_item, _index) => {
                switch (_index) {
                    case 0:
                        _item.value = Number(_res.ApprovalCount) || 0
                        break;

                    case 1:
                        _item.value = Number(_res.ApplyCount) || 0
                        break;

                    case 2:
                        _item.value = Number(_res.RefuseCount) || 0
                        break;
                
                    default:
                        break;
                }

                return _item;
            })
        })
    }
}
</script>