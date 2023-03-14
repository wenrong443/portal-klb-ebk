<template>
	<div class="row">
		<div class="col-md-12">
			<review-task-taken-filter @search="search"></review-task-taken-filter>
			<div class="card">
				<div class="card-body">
					<review-task-taken-listing @refresh="getAll()" :currentPage="currentPage" :contactNumber="contactNumber" :grttStatus="grttStatus"
						:sortBy="sortBy" :sortDirection="sortDirection"></review-task-taken-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ReviewTaskTakenListing from "./@components/ReviewTaskTakenListing";
import ReviewTaskTakenFilter from "./@components/ReviewTaskTakenFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { ReviewTaskTakenListing, ReviewTaskTakenFilter },
	mixins: [pageBehaviour],
	data: () => ({
		contactNumber: "",
		grttStatus: -99,
		sortBy: "grttUpdatedDatetime",
		sortDirection: "ASC",
	}),
	async created() {},
	computed: {},
	methods: {
		search(filter) {
			this.contactNumber = filter.contactNumber;
			this.grttStatus = filter.grttStatus;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>