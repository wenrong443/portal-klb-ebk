<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditFaq">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<fnq-listing :records="records" @refresh="getAll()">
					</fnq-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FnqListing from "./@components/FnqListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	components: { FnqListing },
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
			this.$router.push({ name: "FnqAddPage" });
		},
	},
};
</script>

<style>
</style>