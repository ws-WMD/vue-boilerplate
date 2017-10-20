<template>
	<section>
		<header-top head-title="新增收货地址" goBack></header-top>
		<form>
			<formItem label="联系人" placeholder="姓名" type="text" :width="70"></formItem>
			<formItem label="联系电话" placeholder="手机号码" type="text" :width="70"></formItem>
			<formItem label="地址" placeholder="地址" type="text" :width="70"></formItem>
			<formItem  type="button" :width="96" value="确定"></formItem>
		</form>
	</section>
</template>
<script>
import headerTop from '@/components/header/header'
import formItem from './formItem'
export default {
	components: {
		formItem,headerTop
	},
	data() {
		return {
		}
	}
}
</script>

<style lang="scss" scoped>

</style>