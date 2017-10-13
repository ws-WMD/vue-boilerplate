<template>
    <div class="remark-page">	
    	<header-top head-title="填写备注信息" goBack></header-top>
    	<section class="quick-remark" v-if="remarkList.length">
 				<header class="quick-remark-title">快速备注</header>
 				<Tag color='default' type='border' v-for="(item, index) in remarkList" :isSelected="isOldRemark(item)"><span @click="selectRemark(index, item)">{{item}}</span></Tag>
    	</section>
    	<section class="other-remark">
    		<header class="other-remark-title">其他备注</header>
          <textarea class="other-remark-text" v-model="inputText" placeholder="请输入备注内容(可不填)"></textarea>
    	</section>
    	<div class="determine-btn" @click="confirmRemark">确定</div>
    </div>
</template>

<script>
import Tag from '@/components/tag/tag'
import {getStore, setStore} from '../../utils/base'
import headerTop from '@/components/header/header'
export default {
	components: {
		Tag,headerTop
	},
	data() {
		return {
			otherRemarkText: '',
			remarkList: ['不吃香菜', '不吃葱', '不加辣', '多加辣', '全糖', '半糖'],
			inputText: null
			
		}
	},
	computed: {
		oldRemark() {
			return JSON.parse(getStore('remark')).remarkText;
		},
		remarkText: {
			get: function() {
				return Object.assign({}, this.oldRemark);
			},
			set: function(val) {}
			
		}
	},

	methods: {
    selectRemark(index, text){
    	let flag = true;
      Object.keys(this.remarkText).forEach(keys => {
      	if(this.remarkText[keys] == text) {
      		console.log(this.remarkText[keys]);
      		delete this.remarkText[keys];
      		flag = false;
      	}
      });
      if(flag) {
      	this.remarkText[index] = text;
      	this.remarkText = Object.assign(this.oldRemark, this.remarkText);
      }
    },
		confirmRemark(){
			setStore('remark',{remarkText: this.remarkText, inputText: this.inputText});
      this.$router.go(-1);
    },
		isOldRemark(item) {
			let flag = false;
			Object.keys(this.oldRemark).forEach(key => {
				if(this.oldRemark[key] == item) {
					flag = true;
				}
			});
			return flag;
		}
	}
}
</script>

<style scope>
	.quick-remark-title,.other-remark-title {
		padding: 5px 10px;
	}
	.quick-remark, .other-remark {
		border: 1px solid #bcbcbc;
    margin: 5px;
    border-radius: 3px;
    padding: 1%;
	}
	.other-remark-text {
		width: 98%;
		min-height: 100px;
	}
	.determine-btn {
		border: 1px solid #148ae0;
		background: #148ae0;
		color: #fff;
		width: 98%;
		margin: 5px 1%;
		padding: 8px 0;
		text-align: center;
		border-radius: 3px;
	}
</style>