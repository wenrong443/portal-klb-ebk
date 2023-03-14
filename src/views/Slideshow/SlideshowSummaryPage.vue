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
					<slideshow-listing @refresh="getAll()" :currentPage="currentPage"></slideshow-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SlideshowListing from "./@components/SlideshowListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { SlideshowListing },
	mixins: [pageBehaviour],
	data: () => ({}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "SlideshowAddPage" });
		},
	},
};
</script>

<style>
</style>