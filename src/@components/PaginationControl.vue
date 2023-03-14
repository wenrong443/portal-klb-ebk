<template>
	<div class="paper-pagination">
		<div class="form-group">
			<select class="form-control" v-model="rowPerPage">
				<option v-for="numberOption in numberOptions" v-bind:value="numberOption.id"
					v-bind:key="numberOption.id">
					{{ numberOption.value }}
				</option>
			</select>
		</div>
		<ul class="pagination paper-pagination--options">
			<li class="paginate_button page-item previous" id="datatable_previous"
				v-bind:class="{'disabled': isPageFirst}">
				<button type="button" class="page-link" v-on:click.stop="goPrevious($event)">
					{{ $messages.labelPreviousPage() }}
				</button>
			</li>
			<li v-for="(item, index) in items" v-bind:key="index" class="paginate_button page-item"
				v-bind:class="{'active': item == modelValue}">
				<input type="button" v-bind:value="item" class="page-link"
					v-on:click.stop='$emit("update:modelValue", item)' />
			</li>
			<li ref="navNext" class="paginate_button page-item last" v-bind:class="{'disabled': isPageLast}">
				<button type="button" class="page-link" v-on:click.stop="goNext($event)">
					{{ $messages.labelNextPage() }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "PagenationControl",
	props: {
		modelValue: { type: Number, required: true },
		length: { type: Number, required: false, default: 1 },
		totalVisible: { type: Number, required: false, default: 7 },
		containerWidth: { type: Number, required: false, defautl: 768 },
	},
	components: {},
	data: () => ({
		listOfPages: [],
		maxButtons: 0,
		rowPerPage: 20,
	}),
	computed: {
		numberOptions() {
			return [
				{ id: 10, value: 10 },
				{ id: 20, value: 20 },
				{ id: 30, value: 30 },
				{ id: 50, value: 50 },
				{ id: 100, value: 100 },
			];
		},
		isPageLast() {
			return this.modelValue >= this.length;
		},
		isPageFirst() {
			return this.modelValue <= 1;
		},
		items() {
			const maxLength =
				this.totalVisible > this.maxButtons
					? this.maxButtons
					: this.totalVisible || this.maxButtons;

			if (this.length <= maxLength || maxLength < 1) {
				return this.getRange(1, this.length);
			}

			const even = maxLength % 2 === 0 ? 1 : 0;
			const left = Math.floor(maxLength / 2);
			const right = this.length - left + 1 + even;

			if (this.modelValue > left && this.modelValue < right) {
				const start = this.modelValue - left + 2;
				const end = this.modelValue + left - 2 - even;

				return [
					1,
					"...",
					...this.getRange(start, end),
					"...",
					this.length,
				];
			} else if (this.modelValue === left) {
				const end = this.modelValue + left - 1 - even;
				return [...this.getRange(1, end), "...", this.length];
			} else if (this.modelValue === right) {
				const start = this.modelValue - left + 1;
				return [1, "...", ...this.getRange(start, this.length)];
			} else {
				return [
					...this.getRange(1, left),
					"...",
					...this.getRange(right, this.length),
				];
			}
		},
		isFirstDisabled() {
			return true;
		},
	},
	async created() {},
	methods: {
		getRange(from, to) {
			const range = [];

			from = from > 0 ? from : 1;

			for (let i = from; i <= to; i++) {
				range.push(i);
			}
			return range;
		},
		setMaxButtons() {
			const containerWidth =
				this.$el && this.$el.parentElement
					? this.$el.parentElement.clientWidth
					: window.innerHeight;

			if (this.$refs.navNext) {
				const navButton = this.$refs.navNext.getBoundingClientRect();

				const itemWidth = navButton.height;
				const navItemWidth = navButton.width * 2;

				this.maxButtons = Math.floor(
					(containerWidth - navItemWidth) / itemWidth
				);
			}
		},
		goNext(e) {
			if (!this.isPageLast) {
				e.preventDefault();
				this.$emit("update:modelValue", this.modelValue + 1);
				this.$emit("next");
			}
		},
		goPrevious(e) {
			if (!this.isPageFirst) {
				e.preventDefault();
				this.$emit("update:modelValue", this.modelValue - 1);
				this.$emit("previous");
			}
		},
	},
	mounted() {
		this.setMaxButtons();
	},
	watch: {
		containerWidth() {
			this.$$nextTick(() => {
				window.dispatchEvent(new Event("resize"));
			});
		},
		rowPerPage() {
			this.$emit("rowPerPage", this.rowPerPage);
		},
	},
};
</script>

<style lang="scss" scoped>
.pagination--two-col {
	display: grid;
	grid-auto-flow: column;
	justify-content: space-between;
}
.paper-button-first {
	position: relative;
	display: block;
	padding: 0.5rem 0.75rem;
	line-height: 1.25;
	color: #007bff;
	background-color: #fff;
	border: 1px solid #ddd;
}

.paper-button-first.disabled,
.paper-button-first[disabled] {
	color: #6c757d;
	pointer-events: none;
	cursor: auto;
	background-color: #fff;
	border-color: #dee2e6;
}
</style>
