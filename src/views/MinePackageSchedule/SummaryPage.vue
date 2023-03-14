<template>
	<div class="row">
		<div class="col-md-12">
			<mine-package-schedule-filter @search="search" />
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditMinePackageSchedule">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<mine-package-schedule-listing :gmpstGmpaatId="gmpstGmpaatId" :gmpstStatus="gmpstStatus" :sortBy="sortBy"
						:sortDirection="sortDirection" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MinePackageScheduleListing from "./@components/MinePackageScheduleListing.vue";
import MinePackageScheduleFilter from "./@components/MinePackageScheduleFilter.vue";

export default {
	name: "",
	components: { MinePackageScheduleListing, MinePackageScheduleFilter },
	data: () => ({
		gmpstGmpaatId: -99,
		gmpstStatus: -99,
		sortBy: "gmpstGmpaatId",
		sortDirection: "ASC",
	}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "MinePackageScheduleAddPage" });
		},
		search(filter) {
			this.gmpstGmpaatId = filter.gmpstGmpaatId;
			this.gmpstStatus = filter.gmpstStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>