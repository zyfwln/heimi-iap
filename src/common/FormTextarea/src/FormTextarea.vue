<style lang="less" src="./FormTextarea.less" scoped></style>

<template>
    <div class="z-textarea">
        <div class="hd">{{title}}</div>
        <div class="bd">
            <textarea :placeholder="placeholder" v-model="text"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-form-textarea',
    model: {
        prop : 'value',
        event: 'onChange'
    },
    props: {
        title: String,
        placeholder: String,
        value: [String, Number]
    },
    data () {
        return {
            text: this.value
        }
    },
    watch: {
        text (_v) {
            this.$emit('onChange', _v)
        }
    }
}
</script>