<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<referrer-listing :records="records" :currentPage="currentPage" @refresh="getAll()"></referrer-listing>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ReferrerListing from "./@components/ReferrerListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

import { mixin as RecordMixin } from "./Referrer";
export default {
	name: "SummaryPage",
	components: { ReferrerListing },
	mixins: [RecordMixin, pageBehaviour],
	data: () => ({	
	}),
	async created() {
	},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "ReferrerAddPage" });
		},
	},
};
</script>

<style>
</style>