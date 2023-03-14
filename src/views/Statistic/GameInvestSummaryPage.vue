<template>
	<div class="row">
		<div class="col-md-12">
			<game-invest-filter @search="search"></game-invest-filter>
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
				</div>
				<div class="card-body">
					<game-invest-listing :fromDate="fromDate" :toDate="toDate" />
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import GameInvestListing from "./@components/GameInvestListing";
import GameInvestFilter from "./@components/GameInvestFilter";

export default {
	name: "",
	components: { GameInvestListing, GameInvestFilter },
	data: () => ({
		fromDate: new Date() ,
		toDate: new Date() ,
	}),
	computed: {},
	methods: {
		search(filter) {
			this.fromDate = filter.fromDate;
			this.toDate = filter.toDate;
		},
	},
};
</script>
