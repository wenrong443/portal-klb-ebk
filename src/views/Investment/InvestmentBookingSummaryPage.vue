<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<investment-booking-listing :status="status" />
				</div>
			</div>
		</div>
	</div>
	<div class="paper-pagination">
		<span class="dataTables_info">{{ formattedTotalMessage }}</span>
		<pagination-control :length="totalPage" v-model="currentPage"></pagination-control>
	</div>
</template>

<script>
import InvestmentBookingListing from "./@components/InvestmentBookingListing.vue";

export default {
	name: "",
	components: { InvestmentBookingListing },
	computed: {
		status() {
			switch (this.$route.path) {
				case "/investment/booking/user":
					return 1;
				case "/investment/booking/history":
					return 2;
				default:
					return -1
			}
		},
	},
};
</script>

<style>
</style>