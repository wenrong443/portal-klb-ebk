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
					<page-background-listing @refresh="getAll()" :currentPage="currentPage"></page-background-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageBackgroundListing from "./@components/PageBackgroundListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { PageBackgroundListing },
	mixins: [pageBehaviour],
	data: () => ({}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "PageBackgroundAddPage" });
		},
	},
};
</script>

<style>
</style>