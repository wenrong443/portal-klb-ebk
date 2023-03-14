<template>
    <div class="row"  v-for="(record) in mineRecords" v-bind:key="record.id">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
                        {{ record.product }}
                    </h4>
				</div>
				<div class="card-body">
					<mine-listing :records="record.packageList" />
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import MineListing from "./@components/MineListing";

export default {
	name: "",
	components: { MineListing },
	data: () => ({
		records: {},
		generalSub: [],
        mineRecords: []
	}),
	computed: {
		formattedRecords() {
			if (this.generalSub.length <= 0) return [];
			return this.generalSub.map((d) => {
				return {
					type: d.type.replaceAll("_", " "),
					...d.generalSub,
				};
			});
		},
		formattedCurrentActiveUser() {
			return this.records ? this.records.currentActiveUser : 0;
		},
		formattedTotalUser() {
			return this.records ? this.records.totalUser : 0;
		},
		formattedTodayRegister() {
			if (this.formattedRecords.length <= 0) return 0;
			return this.formattedRecords.find((d) => d.type == "TODAY").register;
		},
		formattedYesterdayRegister() {
			if (this.formattedRecords.length <= 0) return 0;
			return this.formattedRecords.find((d) => d.type == "YESTERDAY").register;
		},
	},
	async created() {
		await this.getAll();
	},
	methods: {
		async getAll() {
            const [error, result] =
				await this.$service.statisticService.getMineAll();
			if (error) {
			} else {
				this.mineRecords = result.content;
			}
		},
        formatted2DC(num) {
			let nums = (parseFloat(num) / 100) * 100.0;
			return nums.toFixed(2);
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