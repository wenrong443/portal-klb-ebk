<template>
	<div class="row">
		<div class="col-md-12">
			<mine-product-filter @search="search" />
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditMineProduct">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<mine-product-listing :gmptShortCode="gmptShortCode" :gmptStatus="gmptStatus" :sortBy="sortBy"
						:sortDirection="sortDirection" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MineProductListing from "./@components/MineProductListing.vue";
import MineProductFilter from "./@components/MineProductFilter.vue";

export default {
	name: "",
	components: { MineProductListing, MineProductFilter },
	data: () => ({
		gmptShortCode: "",
		gmptStatus: -99,
		sortBy: "gmptShortCode",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "MineProductAddPage" });
		},
		search(filter) {
			this.gmptShortCode = filter.gmptShortCode;
			this.gmptStatus = filter.gmptStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>