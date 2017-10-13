<template>
	<transition name="fade">
		<div :class="classes" @click="selectTag">
			<span :class="textClasses"><slot></slot></span>
			<span v-if="closeable">X</span>
		</div>
	</transition>
</template>

<script>
const cls = 'tag';
export default {
	data() {
		return {
			selected: false
		}
	},
	props: {
		isSelected: {
			type: Boolean,
			default: false
		},
		closeable: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: 'default'
		},
		type: {
			default: 'border'
		},
		name: {
			type: [String, Number]
		}
	},
	mounted() {
		this.selected = this.isSelected;
	},
	computed:{
		classes() {
			return [
				`${cls}`,
				{
					[`${cls}-${this.color}`]: !!this.color,
					[`${cls}-${this.type}`]: !!this.type,
					[`${cls}-closable`]: !!this.closeable,
					[`${cls}-${this.color}-selected`]: !!this.selected,
				}]
		},
    textClasses () {
        return `${cls}-text`;
    },
    showDot () {
        return !!this.type && this.type === 'dot';
    }
	},

	methods: {
		close (event) {
			if(this.name === undefined) {
				this.$emit('on-close', event);
			} else {
				this.$emit('on-close', event, name);
			}
		},
		selectTag() {
			this.selected = !this.selected
		}
	}
}
</script>

<style scope>
	.tag {
		margin: 5px;
		padding: 5px;
		display: inline-block;
		border-width: 1px;
		border-radius: 3px;
	}
	.tag-border {
		border-style: solid;
	}
	.tag-dot {
		border-style: dotted;
	}
	.tag-red {
		border-color: #ff0000;
		color: #ff0000;
	}
	.tag-green {
		border-color: #00ff00;
		color: #00ff00;
	}
	.tag-blue {
		border-color: #0000ff;
		color: #0000ff;
	}
	.tag-default {
		border-color: #000;
		color: #000;
	}
	.tag-green-selected {
		background: #00ff00;
		color: #fff;
	}
	.tag-blue-selected {
		background: #0000ff;
		color: #fff;
	}
	.tag-default-selected {
		background: #000;
		color: #fff;
	}
	.tag-default-selected {
		background: #000;
		color: #fff;
	}
	.tag-text {
		margin-right: 10px;
	}

</style>