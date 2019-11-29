<style lang="less" src="./AchievementAdd.less" scoped></style>

<template>
    <layout-base id="AchievementAdd">
        <v-header class="header" slot="header">
            <div class="title" slot="center">添加业绩目标</div>
        </v-header>

        <div class="page">
            <van-cell title="目标客户" is-link @click="addCustomer()">
                <span class="fr">{{customer.Name}}</span>
            </van-cell>
            <van-cell title="目标项目" is-link @click="addProject()">
                <span class="fr">{{course.CourseName || project.ProjectName}}</span>
            </van-cell>
        </div>

        <div class="save" @click.stop="save()">保存</div>

        <!-- <achievement-customers v-model="showC" @Select="selectCustomer"></achievement-customers> -->
        <return-add v-model="showC" :bg-color="'background-color: #744bff'" @Select="selectCustomer"></return-add>
        <project-list v-model="showP" :detail="true" :bg-color="'background-color: #744bff'" @Select="selectProject"></project-list>
    </layout-base>
</template>

<script>
// import AchievementCustomers from '../../components/AchievementCustomers/AchievementCustomers.vue'
import ProjectList from '../../components/ProjectList/ProjectList.vue'
import ReturnAdd from '../../components/ReturnAdd/ReturnAdd.vue'

export default {
    components: {
        // AchievementCustomers,
        ReturnAdd,
        ProjectList
    },
    data () {
        return {
            showC   : false,
            showP   : false,
            customer: {
                Name: ''
            },
            project : {
                ProjectName: ''
            },
            course  : {
                CourseName: ''
            }
        }
    },
    methods: {
        save () {
            this.$dialog.confirm({
                title   : '提示',
                message : '确认添加业绩目标'
            }).then(() => {
                this.$ajax({
                    url : '/employee/achieve_plan/plan',
                    data: {
                        CustomerID  : this.customer.ID,
                        CustomerName: this.customer.Name,
                        ProjectID   : this.project.ID,
                        CourseID    : this.course.ID,
                        ProjectName : this.project.ProjectName,
                        CourseName  : this.course.CourseName,
                        PlanMoney   : this.course.SellMoney,
                        PlanDate    : new Date().DateFormat()
                    }
                }).then(() => {
                    this.$dialog.confirm({
                        title             : '提示',
                        message           : '添加成功，是否继续添加？',
                        cancelButtonText  : '完成规划',
                        confirmButtonText : '继续规划'
                    }).then(() => {
                        this.customer = { Name: '' }
                        this.project  = { ProjectName: '' }
                        this.course   = { CourseName: '' }
                    }).catch(() => {
                        this.$router.go(-1)
                    })
                })
            }).catch(() => {
            })
        },
        addCustomer () {
            this.showC = true
        },
        selectCustomer (_c) {
            this.showC    = false
            this.customer = _c
        },
        addProject () {
            this.showP = true
        },
        selectProject (_p, _c) {
            this.showP   = false
            this.project = _p
            this.course  = _c
        }
    }
}
</script>