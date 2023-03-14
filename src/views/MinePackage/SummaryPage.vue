<template>
	<div class="row">
		<div class="col-md-12">
			<mine-package-filter @search="search" />
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditMinePackage">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<mine-package-listing :gmpaatGmptId="gmpaatGmptId" :gmpaatStatus="gmpaatStatus" :sortBy="sortBy"
						:sortDirection="sortDirection" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MinePackageListing from "./@components/MinePackageListing.vue";
import MinePackageFilter from "./@components/MinePackageFilter.vue";

export default {
	name: "",
	components: { MinePackageListing, MinePackageFilter },
	data: () => ({
		gmpaatGmptId: -99,
		gmpaatStatus: -99,
		sortBy: "gmpaatGmptId",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "MinePackageAddPage" });
		},
		search(filter) {
			this.gmpaatGmptId = filter.gmpaatGmptId;
			this.gmpaatStatus = filter.gmpaatStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>