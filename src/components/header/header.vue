<template>
	<header class="head-top">
		<slot name="logo"></slot>
		<slot name="search"></slot>
		<section class="head-goback" v-if="goBack" @click="$router.go(-1)">
			<
		</section>
 		<!--<router-link :to="userInfo? 'profile': '/login'" v-if="signinUp" class="head-login">
			<span>登陆 | 注册</span>
		</router-link> -->
		<section class="head-title ellipsis" v-if="headTitle">
			<span class="title-text">{{headTitle}}</span>
		</section>
		<slot name="changeCity"></slot>
		<slot name="edit"></slot>
		<slot name="changeLogin"></slot>
	</header>
</template>

<script>
export default {
	props: {
		signinUp: {
			type: Boolean,
			default: false
		}, 
		headTitle: {
			type: String
		}, 
		goBack: {
			type: Boolean
		}
	}
}
</script>

<style scope>
	.head-top {
	  padding: 15px;
	  background: #148ae0;
	  color: #fff;
	  text-align: center;
	}
	.head-goback,.head-login,.head-title {
		display: inline-block;
	}
	.head-goback {    
		float: left;
	}
</style>