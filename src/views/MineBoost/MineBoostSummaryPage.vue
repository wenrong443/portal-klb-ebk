<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditSlideshow">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<mine-boost-listing @refresh="getAll()" :currentPage="currentPage"></mine-boost-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MineBoostListing from "./@components/MineBoostListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { MineBoostListing },
	mixins: [pageBehaviour],
	data: () => ({}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "MineBoostAddPage" });
		},
	},
};
</script>

<style>
</style>