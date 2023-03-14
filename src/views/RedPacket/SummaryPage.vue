<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<red-packet-listing @refresh="getAll()" :currentPage="currentPage" :drdtType="drdtType"
						:drdtMobileNumber="drdtMobileNumber" :drdtStatus="drdtStatus" :sortBy="sortBy"
						:sortDirection="sortDirection"></red-packet-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import RedPacketListing from "./@components/RankingListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { RedPacketListing },
	mixins: [pageBehaviour],
	data: () => ({}),
	async created() {},
	computed: {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "RedPacketAddPage" });
		},
	},
};
</script>

<style>
</style>