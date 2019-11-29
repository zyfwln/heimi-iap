<template>
	<div id="root">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	created () {
		let date = localStorage.getItem('h_m_e_u_date')
		let now = new Date().DateFormat()
		if (now >= date) {
			this.$store.commit('CLEAR_TOKEN')
		} else {
			let token = localStorage.getItem('h_m_e_u_tk')
			if (token) {
				this.$store.commit('UPDATED_TOKEN', token)

				this.$ajax({
                    url: '/employee/info/employeeInfo'
                }).then((_res) => {
                    this.$store.commit('UPDATED_USER', _res.info)
                    this.$router.push({
                        path: '/Home'
                    })
                })
			}
		}
	}
}
</script>

<style lang="less">
	#root {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		color: #333;
		background-color: #f5f5f5;
	}
</style>