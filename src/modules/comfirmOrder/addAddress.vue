<template>
	<div class="add-address-page">
		<button class="add-adress-btn">添加收货地址</button>
		<section class="address-list">
			<address-list :oldAddress="oldAddress"></address-list>
		</section>
	</div>
</template>
<script>
import addressList from './addressList'
export default {
	components: {
		addressList
	},
	data() {
		return {
			oldAddress: [{
				name: '千秋1',
				phone: '123467324324',
				address: '这里是地址'
			},{
				name: '千秋2',
				phone: '123467324324',
				address: '这里是地址'
			},{
				name: '千秋2',
				phone: '123467324324',
				address: '这里是地址'
			}]
		}
	}
}
</script>

<style lang="scss" scoped>
	.add-adress-btn {
	  width: 98%;
	  padding: 10px 0;
	  color: #148ae0;
	  background-color: #fff;
	  border: 1px solid #148ae0;
	  margin: 5px 1%;
	  border-radius: 3px;
	}
	.address-list {
	}
</style>