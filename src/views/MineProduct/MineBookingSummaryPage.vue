<template>
	<div class="row">
		<div class="col-md-12">
            <mine-booking-filter @search="search"></mine-booking-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<mine-booking-listing :status="status" :type="type" :gmbtUtUsername="gmbtUtUsername" :gmbtGmptShortCode="gmbtGmptShortCode" :gmbtStatus="gmbtStatus" :sortBy="sortBy"
						:sortDirection="sortDirection"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MineBookingListing from "./@components/MineBookingListing.vue";
import MineBookingFilter from "./@components/MineBookingFilter.vue";

export default {
	name: "",
	components: { MineBookingListing, MineBookingFilter },
	data: () => ({
		gmbtUtUsername: "",
		gmbtGmptShortCode: "",
        type: -99,
        gmbtStatus: -99,
        sortBy: "gmbtId",
		sortDirection: "ASC",
	}),
	computed: {
		status() {
			switch (this.$route.path) {
				case "/mine/product/booking/active":
					return 1;
				case "/mine/product/booking/history":
					return 2;
				default:
					return -1
			}
		},
	},
    methods: {
        search(filter) {
            this.sortBy = filter.sortBy;
            this.sortDirection = filter.sortDirection;
			this.gmbtUtUsername = filter.gmbtUtUsername;
			this.gmbtGmptShortCode = filter.gmbtGmptShortCode;
            this.type = filter.type;
			this.gmbtStatus = filter.gmbtStatus;
		},
    }
};
</script>

<style>
</style>