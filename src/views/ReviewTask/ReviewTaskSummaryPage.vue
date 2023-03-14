<template>
	<div class="row">
		<div class="col-md-12">
			<review-task-filter @search="search"></review-task-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<div class="row">
						<div class="col-8">
							<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditTask">
								{{ $messages.labelButtonAdd() }}
							</button>
							<button class="btn btn-primary" @click="downloadCSVSample()" v-if="$claims.canEditTask">
								{{ $messages.labelButtonDownloadCSVSample() }}
							</button>
						</div>
						<div class="col-4">
							<div class="row">
								<div class="col-12">
									<input class="form-control" type="file" accept=".csv" @change="uploadFile" />
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="card-body">
					<review-task-listing @refresh="getAll()" :currentPage="currentPage" :grtStatus="grtStatus" :grtType="grtType" :sortBy="sortBy"
						:sortDirection="sortDirection"></review-task-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ReviewTaskListing from "./@components/ReviewTaskListing";
import ReviewTaskFilter from "./@components/ReviewTaskFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { ReviewTaskListing, ReviewTaskFilter },
	mixins: [pageBehaviour],
	data: () => ({
		grtStatus: -99,
		grtType: -99,
		sortBy: "grtCreatedDatetime",
		sortDirection: "ASC",
	}),
	async created() {},
	computed: {},
	methods: {
		uploadFile(e) {
			this.csvFile = e.target.files[0];

			this.$swal({
				title: "Upload csv confirmation",
				text: "Please click 'Proceed' button to proceed",
				showCancelButton: true,
				confirmButtonText: "Proceed",
				showLoaderOnConfirm: true,
				preConfirm: () => {
					this.uploadCSV();
				},
			});
		},
		async uploadCSV() {
			var formData = new FormData();
			formData.append("csv", this.csvFile);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.accountService.uploadReviewCSV(formData);
			if (error) {
				loader.hide();
				this.showError2(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
			}
		},
		goToAddPage() {
			this.$router.push({ name: "ReviewTaskAddPage" });
		},
		downloadCSVSample() {
			window.open(
				process.env.SERVICE_URL + "review/admin/csv-template",
				"_blank"
			);
		},
		search(filter) {
			this.grtStatus = filter.grtStatus;
			this.grtType = filter.grtType;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
};
</script>

<style>
</style>