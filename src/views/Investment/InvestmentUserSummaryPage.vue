<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<anouncement-listing :records="records" @refresh="getAll()"></anouncement-listing>
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
import AnouncementListing from "./@components/AnnouncementListing";

export default {
	name: "",
	components: { AnouncementListing },
	data: () => ({
		records: [],
	}),
	async created() {
		await this.getAll();
	},
	methods: {
		async getAll() {
			const [
				error,
				result,
			] = await this.$service.announcementService.getAdminAll();
			if (error) {
			} else {
				this.records = result.content;
			}
		},
		goToAddPage() {
			this.$router.push({ name: "AnnouncementAddPage" });
		},
	},
};
</script>

<style>
</style>