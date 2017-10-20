<template>
	<div class="add-address-page">
		<header-top head-title="选择收货地址" goBack></header-top>
		<router-link :to='{path:"/comfirmOrder/newAddress"}'  class="add-adress-btn">添加收货地址</router-link :to='{path:"/comfirmOrder/addAddress"}' >
		<section class="address-list">
			<address-list :oldAddress="oldAddress"></address-list>
		</section>
	</div>
</template>
<script>
import headerTop from '@/components/header/header'
import addressList from './addressList'
export default {
	components: {
		addressList,headerTop
	},
	data() {
		return {
			oldAddress: []
		}
	},
	created: function() {
		fetch('https://www.easy-mock.com/mock/59e60c826d45b6646cb9e1a7/elem-demo/addressLIst.action').then(res => {
			res.json().then( data => 
				this.oldAddress = data.data)
		})
	}
}
</script>

<style lang="scss" scoped>
	.add-adress-btn {
		display:block;
	  width: 98%;
	  padding: 10px 0;
	  color: #148ae0;
	  background-color: #fff;
	  border: 1px solid #148ae0;
	  margin: 5px 1%;
	  border-radius: 3px;
	  text-align:center;
	  text-decoration: none;
	}
	.address-list {
	}
</style>