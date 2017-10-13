<template>
	<div class="search-page">
    <header-top head-title="搜索商家" goBack></header-top>
		<form class="search-form">
			<input class="search-input" type="text" placeholder="请输入商家或者美食的名称" name="search" v-model="searchValue" @input="checkInput">
			<input class="search-btn" type="submit" @click.prevent="searchTarget('')">
		</form>
		<section v-if="shoplist.length">
			<h3 class="shoplist-title">商家列表</h3>
			<ul class="shoplist-wrap">
				<router-link :to="{path: '/shop', query: {id: item.id}}" v-for="item in shoplist" :key="item.id" tag="li" class="shoplist-li">
					<section class="item-left">
						<img :src="item.imagePath" class="shop-img">
					</section>
					<section class="item-right">
						<p class="shop-name">{{item.name}}</p>
						<p>月售 <span class="shop-sale-count">{{item.saleCount}} </span>单</p>
						<p><span class="shop-sale-price">{{item.salePrice}}</span>元起送 / 距离<span class="shop-distance">{{item.distance}}</span>公里</p>
					</section>
				</router-link>
			</ul>
		</section>
		<transition name="fade">
			<section v-if="historylist.length&&showHistory" class="history-record">
				<ul>
					<li v-for="(item, index) in historylist" :key="index" class="historylist-li">
						<span class="history-record-text" @click="searchTarget(item)">{{item}}</span>
						<span class="history-record-del" @click="delHistory(index)">X</span>
					</li>
				</ul>
				<footer class="history-clear" @click="clearHistory">清除历史纪录</footer>
			</section>
		</transition>
		<section>
			<div class="search-nothing" v-if="emptyResult">查找不到商家</div>
		</section>
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
			searchValue: '', //搜索框的值
			// shoplist: [{
			// 	id: '123',
			// 	name: '子母粉丝',
			// 	imagePath:'',
			// 	saleCount: '12',
			// 	salePrice: '23',
			// 	distance: '123'
			// },{
			// 	id: '123',
			// 	name: '子母粉丝',
			// 	imagePath:'',
			// 	saleCount: '12',
			// 	salePrice: '23',
			// 	distance: '123'
			// }], //搜索结果
			shoplist: [],
			historylist: [],
			showHistory: true,
			emptyResult: false
		}
		
	},
	mounted() {
		if(getStore('searchHistory') != 'undefined') {
			this.historylist = JSON.parse(getStore('searchHistory'));
		}
	},

	methods: {
		checkInput() {
			if(this.searchValue == '') {
				this.shoplist = [];
				this.emptyResult = false;
				this.showHistory = true;
			}
		},

		async searchTarget(target) {
			if(target) {
				this.searchValue = target;
			} else if(!this.searchValue) {
				return;
			}
			this.showHistory = false; //隐藏历史纪录
			this.shoplist = await this.searchShop();
			this.emptyResult  = !this.shoplist.length;

			//判断是否新增历史纪录
			let history;
			if(getStore('searchHistory') != 'undefined') {
				history = getStore('searchHistory');
			} else {
				history = JSON.stringify(this.historylist); //
			}
			if(history) {
				let repeat = false;
				this.historylist = JSON.parse(history);
				this.historylist.forEach((item) => {
					if(item == this.searchValue) {
						repeat = true;
					}
				})
				if (!repeat) {
					this.historylist.push(this.searchValue);
				}
				setStore('searchHistory', this.historylist)
			}
		},

		delHistory(index) {
			this.historylist.splice(index, 1);
			setStore('searchHistory', this.histortlist)
		},
		clearHistory() {
			this.historylist = [];
			setStore('searchHistory', this.history)
		},
		searchShop() {
			return [{
				id: '123',
				name: '子母粉丝',
				imagePath:'',
				saleCount: '12',
				salePrice: '23',
				distance: '123'
			},{
				id: '123',
				name: '子母粉丝',
				imagePath:'',
				saleCount: '12',
				salePrice: '23',
				distance: '123'
			}]
			// fetch(url, {method: 'GET'}).then(function(res) {
			// 	return res.json();
			// }).then(function(json) {

			// });
		}
	}
}
</script>

<style lang="scss" scoped>
	.search-form {
		padding:10px;
	}
	.search-input {
		padding: 10px;
		width: 68%;
		border-radius: 3px;
		border: 1px solid #bcbcbc;
	}
	ul {
		list-style: none;
		padding-left: 0;
	}
	.search-btn {
		padding: 10px;
		border-radius: 3px;
		border: 1px solid #148ae0;
		color: #fff;
		width: 20%;
		background: #148ae0;
	}
	.shoplist-title {
		color: #adadad;
		padding: 5px 10px;
		margin: 0;
		font-size: 16px;
	}
	.shoplist-li {
		width: 100%;
		border: 1px solid #fff;
		background: #fff;
		padding: 10px;
		/*min-height: 76px;*/
		margin-bottom: 10px;
	}
	.shoplist-li:after {
		content: '';
		clear: both;
		display: block;
	}
	.item-left {
		float: left;
		width: 100px;height: 100px;
    border: 1px solid #eee;
    border-radius: 50px;
    margin-right: 10px;
	}
	.item-right {
		float: left;
	}
	.history-record {
		position: absolute;
    width: 100%;
    top: 99px;
    background: #fff;
	}
	.historylist-li {
		height: 38px;
		padding: 5px 10px;
		line-height: 38px;
	}
	.history-record-text {
		width: 90%;
		float: left;
	}
	.history-record-del {
		float: right;
		color: #148ae0;
	}
	.history-clear {
		text-align: center;
		padding: 5px;
		color: #148ae0;
		cursor: pointer;
		border-bottom: 2px solid #148ae0;
	}
	.fade-enter-active, .fade-leave-active {
  	transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	  opacity: 0
	}

</style> 