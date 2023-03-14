<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<whitelist-ip-listing />
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import WhitelistIpListing from "./@components/WhitelistIpListing";

export default {
	name: "",
	components: { WhitelistIpListing },
	computed: {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "WhitelistIpAddPage" });
		},
		search(filter) {},
	},
};
</script>
