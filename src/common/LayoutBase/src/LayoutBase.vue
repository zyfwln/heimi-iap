<style lang="less" src="./LayoutBase.less" scoped></style>

<template>
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="man">
            <slot></slot>
        </div>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'layout-base'
}
</script>

<style lang="less" scoped>
    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .man {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>
