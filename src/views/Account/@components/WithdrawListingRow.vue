<template>
	<td>
		<input type="checkbox" v-model="selected" :disabled="record.cwrtStatus != 0" />
	</td>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center clickable" @click="goToQuickView()">
		{{ record.cwrtOrderNo }}</td>
	<td class="cave-table-row--center">{{ record.cwrtUtUsername }}</td>
	<td class="">
		<b>{{ formattedFullName }}</b><br>
		<small>{{ $messages.fieldLabelBankName() }}:</small>{{ formattedUserBank }} <br>
		<small>{{ $messages.fieldLabelAccountNo() }}:</small>{{ record.cwrtUbbtAccountNo }}<br>
        <span v-if="VITE_INDIA_BANK">
            <small>{{ $messages.labelBankAccountType() }}:</small>  {{ record.cwrtUbbtExAccType }}<br>
            <small>{{ $messages.labelBankBranch() }}:</small>  {{ record.cwrtUbbtExBranch }}<br>
            <small>{{ $messages.labelBankIfsc() }}:</small>  {{ record.cwrtUbbtExIfsc }}<br>
            <small>{{ $messages.labelBankHqIfsc() }}:</small>  {{ record.cwrtUbbtExHqIfsc }}
        </span>
	</td>
	<td class="cave-table-row--center" v-if="record.cwrtUbtType != 'BANK'"><b>{{ formatted2DC }}</b></td>
	<td class="cave-table-row--center" v-if="record.cwrtUbtType == 'BANK'"><b>{{ formatted2DC }}</b>
		<!-- <p style="font-size: 11px">{{record.cwrtParam5}} {{record.cwrtParam8}} @ {{record.cwrtParam7}}</p> -->
        
	</td>
	<td class="cave-table-row--center">{{ record.cwrtProcessedByUtUsername }} </td>
	<td class="cave-table-row--center">{{ record.cwrtProcessedOn }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
		<br>
        <br>
		<small><b>{{ $messages.labelROC() }}</b></small>
        <br>
        <span class="badge badge-pill" v-bind:class="formattedROCClass">
			{{ formattedROCName }}
		</span>
		
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">
				{{ $messages.labelMore() }}
			</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" @click="goToView()">{{ $messages.labelViewDetails() }}</a>
			</div>
		</div>
	</td>
</template>
<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
	"-1": "badge-danger",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";

export default {
	name: "",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
		selectedItems: { type: Array, require: true },
	},
	data: () => ({
        VITE_INDIA_BANK: process.env.VITE_INDIA_BANK == "true" ? true : false,
		STATUS: {},
	}),
	computed: {
		selected: {
			get: function () {
				return this.selectedItems &&
					this.selectedItems.find(
						(item) => item === this.record.cwrtId
					)
					? true
					: false;
			},
			set: function (value) {
				const index = this.selectedItems.indexOf(this.record.cwrtId);
				if (index > 0) {
					this.selectedItems = this.selectedItems.splice(index, 1);
				} else {
					this.$emit("selected", {
						id: this.record.cwrtId,
						selected: this.selected,
					});
				}
			},
		},
		formattedFullName() {
			return this.record.cwrtUbbtAccountName
				? this.record.cwrtUbbtAccountName
				: "-";
		},
		formattedUserBank() {
			return this.record.userBanks[0].value;
		},
		formattedMembership() {
			return this.record.memberships[0].value;
		},
		formattedStatusClass() {
			return this.record.cwrtStatus != null
				? STATUS_CLASS[this.record.cwrtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.cwrtStatus != null
				? this.STATUS[this.record.cwrtStatus]
				: "-";
		},
		formattedROCClass() {
			return this.record.cwrtStatus != null
				? this.record.roc == 1
					? "badge-danger"
					: "badge-info"
				: "";
		},
		formattedROCName() {
			return this.record.cwrtStatus != null
				? this.record.roc == 1
					? "Yes"
					: "No"
				: "-";
		},
		formatted2DC() {
			let nums = (parseFloat(this.record.cwrtAmount) / 100) * 100.0;
			return nums.toFixed(2);
		},
	},
	async created() {
		this.STATUS = {
			1: this.$messages.fieldLabelApproved(),
			0: this.$messages.fieldLabelPending(),
			"-1": this.$messages.fieldLabelRejected(),
		};
	},
	methods: {
		goToQuickView() {
			this.$parent.showQuickView(
				this.record.cwrtId,
				this.record.cwrtOrderNo
			);
		},
		goToView() {
			this.$router.push({
				name: "AccountWithdrawDetailPage",
				params: { recordId: this.record.cwrtId },
			});
		},
	},
};
</script>
