<template>
	<div class="row">
		<div class="col-md-12">
			<normal-user-filter @search="search"></normal-user-filter>
			<div class="card">
				<div class="card-body overflow-auto">
					<normal-user-listing @refresh="getAll()" :currentPage="currentPage" :utUsername="utUsername"
                        :invitationId="invitationId"
						:createdDatetimeStart="createdDatetimeStart" :createdDatetimeEnd="createdDatetimeEnd"
                        :testUser="testUser"
						:walletAddress1="walletAddress1" :walletAddress2="walletAddress2" :ipAddress="ipAddress" :fullName="fullName" :registeredIpAddress="registeredIpAddress" :status="status" :sortBy="sortBy"
						:sortDirection="sortDirection" ref="normalUserListing" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NormalUserListing from "./@components/NormalUserListing";
import NormalUserFilter from "./@components/NormalUserFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { NormalUserListing, NormalUserFilter },
	mixins: [pageBehaviour],
	data: () => ({
        invitationId: "",
		utUsername: "",
		walletAddress1: "",
        walletAddress2: "",
		ipAddress: "",
        status: -99,
        testUser: -99,
        registeredIpAddress: "",
        fullName: "",
		createdDatetimeStart: "",
		createdDatetimeEnd: "",
		sortBy: "utId",
		sortDirection: "DESC",
	}),
	methods: {
		search(filter) {
            this.invitationId = filter.invitationId;
			this.utUsername = filter.utUsername;
			this.walletAddress1 = filter.walletAddress1;
            this.walletAddress2 = filter.walletAddress2;
			this.ipAddress = filter.ipAddress;
            this.status = filter.status;
            this.testUser = filter.testUser;
            this.registeredIpAddress = filter.registeredIpAddress;
            this.fullName = filter.fullName;
			this.createdDatetimeStart = filter.createdDatetimeStart;
			this.createdDatetimeEnd = filter.createdDatetimeEnd;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;

			if (filter.isReset) {
				this.$refs.normalUserListing.getAll();
			}
		},
	},
};
</script>

<style>
</style>