<template>
	<div class="form-item">
		<label v-if="label" :style="labelWidth">{{label}}</label>
		<input :type="type" :placeholder="placeholder" :value="value" :style="inputWidth">
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String
		},
		placeholder: {
			type: String
		},
		type: {
			type: String,
			default: 'text'
		},
		width: {
			type: Number,
			default: 75
		},
		value: {
			type: String
		}
	},

	computed: {
		labelWidth() {
			return {
				width: 92-this.width + '%'
			}
		},
		inputWidth() {
			return {
				width: this.width + '%'
			}

		}

	}
}
</script>

<style lang="scss">
	.form-item {
		padding: 10px 0;
	}
	input {
		  height: 30px;
	    border-radius: 3px;
	    border: 1px solid #bcbcbc;
	    padding: 0 2%;
	}
	label {    
    display: inline-block;
    text-align: center;
	}
	input[type="button"] {
		background: #148ae0;
		color: #fff;
		height: 40px;line-height: 40px;
		border: 0;
		border-radius: 3px;
		margin: 0 2%;

	}
</style>