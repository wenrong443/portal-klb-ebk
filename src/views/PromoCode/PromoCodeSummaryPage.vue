<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()" v-if="$claims.canEditPromoCode">
						{{ $messages.labelButtonAdd() }}
					</button>
				</div>
				<div class="card-body">
					<promo-code-listing @refresh="getAll()" :currentPage="currentPage"></promo-code-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PromoCodeListing from "./@components/PromoCodeListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { PromoCodeListing },
	mixins: [pageBehaviour],
	data: () => ({}),
	async created() {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "PromoCodeAddPage" });
		},
	},
};
</script>

<style>
</style>