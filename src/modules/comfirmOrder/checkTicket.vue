<template>
		<div class="ticket-page">
			<header-top head-title="选择发票抬头" goBack></header-top>
			<section>
				<div class="choose-ticket" :class="{'is-need-ticket': isNeedTicket}" @click="isNeedTicket= !isNeedTicket">不需要开发票</div>
			</section>
			<div class="determine-btn" @click="comfirmCheckTicket">确定</div>
		</div>
</template>

<script>
import headerTop from '@/components/header/header'
import {getStore, setStore} from '../../utils/base'
export default {
	components: {
		headerTop
	},
	data() {
		return {
			isNeedTicket: false
		}
	},
	
	methods: {
		comfirmCheckTicket() {
			setStore('isNeedTicket', this.isNeedTicket);
			this.$router.go(-1);
		}
	}	
}
</script>

<style scope>
.choose-ticket {
  padding: 15px;
  background: #fff;
  margin: 10px 0;
}
.is-need-ticket {
	color: #95de95;
}
</style>