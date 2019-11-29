<style lang="less" src="./LabelLsit.less" scoped></style>

<template>
    <div class="z-label-list">
        <div class="hd">{{title}}</div>
        <div class="bd">
            <div class="labels">
                <span class="label"
                        v-for="(v, i) in labels"
                        :key="i"
                        :class="activeClass(i)"
                        @click="select(v, i)">{{valueKey ? v[valueKey] : v}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        labels: Array,
        valueKey: String,
        disabled: Boolean
    },
    data () {
        return {
            actives: [],
            items: []
        }
    },
    methods: {
        activeClass (_i) {
            return this.disabled || this.actives.indexOf(_i) > -1 ? 'on' : ''
        },
        select (_v, _i) {
            if (this.disabled) return;
            
            let i = this.actives.indexOf(_i)
            if (i > -1) {
                this.actives.splice(i, 1)
                this.items.splice(_v, 1)
            } else {
                this.actives.push(_i)
                this.items.push(_v)
            }
            this.$emit('Select', this.items);
        }
    }
}
</script>