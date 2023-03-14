<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditGeneralMission">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<mission-listing :records="records" @refresh="getAll()">
					</mission-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MissionListing from "./@components/MissionListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	components: { MissionListing },
	mixins: [pageBehaviour],
	data: () => ({
		records: [],
		filter: {
			pageNumber: 0,
			rowPerPage: 0,
		},
	}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "MissionAddPage" });
		},
	},
};
</script>

<style>
</style>