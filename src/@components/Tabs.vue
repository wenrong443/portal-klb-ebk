<template>
	<div class="tabs">
		<ul class="tabs__header" v-bind:class="tabCssClass">
			<li v-for="item in tabs" v-bind:key="item[keyField]" :class="{selected: item == modelValue}" v-on:click.stop="onClick(item)">
				{{item[valueField]}}
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "Tabs",
	props: {
		type: { type: String, required: false, default: "ds" },
		tabs: {
			type: Array,
			required: false,
			default: function () {
				return [];
			},
		},
		modelValue: {
			type: Object,
			required: true,
			default: function () {
				return {};
			},
		},
		keyField: { type: String, required: false, default: "key" },
		valueField: { type: String, required: false, default: "value" },
		full: { type: Boolean, required: false, default: false },
		dark: { type: Boolean, required: false, default: false },
		mini: { type: Boolean, required: false, default: false },
	},
	computed: {
		tabCssClass() {
			return [{ "cave__tabs--full": this.full }];
		},
	},
	methods: {
		onClick(value) {
			this.$emit("update:modelValue", value);
		},
	},
};
</script>
<style lang="scss" scoped>
.tabs {
	max-width: 400px;
}
.tabs__header {
	margin-bottom: 10px;
	list-style: none;
	padding: 0;
	display: flex;

	li {
		width: 100px;
		text-align: center;
		padding: 10px 20px;
		margin-right: 10px;
		background-color: #ddd;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.4s all ease-out;
	}

	li.selected {
		background-color: #0984e3;
		color: white;
	}
}
</style>