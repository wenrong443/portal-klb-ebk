<template>
	<div class="row">
		<div class="col-md-12">
			<manual-filter @search="search"></manual-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<div class="row">
						<div class="col-8">
							<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditManualFund">
								{{ $messages.labelButtonAdd() }}
							</button>
							<button class="btn btn-primary" @click="downloadCSVSample()" v-if="$claims.canEditManualFund">
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
					<div class="card-body">
						<manual-fund-listing :records="records" @refresh="getAll()" :currentPage="currentPage"
							:mfrtIsRealMoneyTransaction="mfrtIsRealMoneyTransaction" :mfrtType="mfrtType" :mfrtUtUsername="mfrtUtUsername"
							:createdDatetimeEnd="createdDatetimeEnd" :createdDatetimeStart="createdDatetimeStart" :sortBy="sortBy"
							:sortDirection="sortDirection"></manual-fund-listing>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ManualFundListing from "./@components/ManualFundListing";
import { mixin as RecordMixin } from "./Account";
import ManualFilter from "./@components/ManualFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "SummaryPage",
	components: { ManualFundListing, ManualFilter },
	mixins: [RecordMixin, pageBehaviour],
	data: () => ({
		mfrtIsRealMoneyTransaction: -99,
		mfrtType: "",
		mfrtUtUsername: "",
		createdDatetimeEnd: "",
		createdDatetimeStart: "",
		sortBy: "mfrtId",
		sortDirection: "ASC",
		csvFile: null,
	}),
	async created() {},
	methods: {
		uploadFile(e) {
			this.csvFile = e.target.files[0];

			// this.$swal({
			// 	title: "Upload csv confirmation",
			// 	text: "Please enter your OTP below to proceed",
			// 	input: "text",
			// 	inputPlaceholder: "Enter your OTP",
			// 	inputAttributes: {
			// 		autocapitalize: "off",
			// 	},
			// 	showCancelButton: true,
			// 	confirmButtonText: "Proceed",
			// 	showLoaderOnConfirm: true,
			// 	preConfirm: (otp) => {
			// 		this.uploadCSV(otp);
			// 	},
			// });
            					this.uploadCSV("123456");
		},
		goToAddPage() {
			this.$router.push({ name: "AccountManualFundAddPage" });
		},
		downloadCSVSample() {
			window.open(
				process.env.SERVICE_URL +
					"deposit-n-withdraw/admin/manualfund/csv-template",
				"_blank"
			);
		},
		search(filter) {
			this.mfrtIsRealMoneyTransaction = filter.mfrtIsRealMoneyTransaction;
			this.mfrtType = filter.mfrtType;
			this.mfrtUtUsername = filter.mfrtUtUsername;
			this.createdDatetimeEnd = filter.createdDatetimeEnd;
			this.createdDatetimeStart = filter.createdDatetimeStart;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
		async uploadCSV(otp) {
			var formData = new FormData();
			formData.append("csv", this.csvFile);
			formData.append("otp", otp);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.accountService.uploadCSV(formData);
			if (error) {
				loader.hide();
				this.showError2(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
			}
		},
	},
};
</script>

<style>
</style>