<template>
	<div class="row">
		<div class="col-md-6">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.fieldLabelTopIPFromLastLoginActive() }} ({{limit}})
					</h4>
				</div>
				<div class="card-body">
					<burce-force-i-p-listing :records="record.activeFromLastLogin" />
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.fieldLabelTopIPFromRegisteredActive() }} ({{limit}})
					</h4>
				</div>
				<div class="card-body">
					<burce-force-i-p-listing :records="record.activeFromRegistered" />
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import BurceForceIPListing from "./@components/BurceForceIPListing";

export default {
	name: "",
	components: { BurceForceIPListing },
	data: () => ({
		record: {},
        limit: 20
	}),
	computed: {},
	async created() {
		await this.getAll();
	},
	methods: {
		async getAll() {
			const [error, result] =
				await this.$service.statisticService.geBurceForceIPAll(this.limit);
			if (error) {
			} else {
				this.record = result.content;
			}
		},
	},
};
</script>
<style lang="scss" >
.card-body-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	text-align: center;

	h6 {
		font-weight: 700;
		font-size: 12px;
		padding: 12px;
	}

	.card-body--number {
		font-size: 16px;
		font-weight: 900;
	}
}
</style>