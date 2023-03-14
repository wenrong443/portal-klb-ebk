<template>
	<td>
		<input type="checkbox" v-model="selected" :disabled="record.cdrtStatus != 0" />
	</td>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center clickable" @click="goToQuickView()">
		{{ record.cdrtOrderNo }}
	</td>
	<td class="cave-table-row--center"> {{ formattedRemarks }} </td>
	<td class="cave-table-row--center">{{ record.cdrtUtUsername }}</td>
	<td class="" v-if="record.cdrtCmbtType != 'BANK'">
        <b>{{ formattedFullName }}</b><br>
		{{ record.cdrtCmbtAccountName }} <br>
		{{ record.cdrtCmbtAccountNo }}
	</td>
    <td class="" v-else>
        <b>{{ formattedFullName }}</b><br>
        <b>{{ record.cdrtCmbtBankName }}</b> <br>
        {{ record.cdrtParam6 }} <br>
        {{ record.cdrtCmbtAccountNo }}
    </td>
	<td class="cave-table-row--center"  v-if="record.cdrtCmbtType != 'BANK'"><b>{{ formatted2DC }}</b> </td>
    <td class="cave-table-row--center" v-else><b>{{ formatted2DC }}</b><p style="font-size: 11px">{{record.cdrtParam5}} {{record.cdrtParam8}} @ {{record.cdrtParam7}}</p> </td>
	<td class="cave-table-row--center">{{ record.createdDatetime }}</td>
	<td class="cave-table-row--center">{{ record.cdrtProcessedByUtUsername }} </td>
	<td class="cave-table-row--center">{{ record.cdrtProcessedOn }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">{{ formattedStatusName }}</span>
	</td>
	<td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button"
				id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
	name: "AnnouncementListingRow",
	mixins: [rowBehaviour],
	props: {
		record: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
		selectedItems: { type: Array, require: true },
	},
	data: () => ({
		STATUS: {},
	}),
	computed: {
		selected: {
			get: function () {
				return this.selectedItems &&
					this.selectedItems.find((item) => item === this.record.cdrtId)
					? true
					: false;
			},
			set: function (value) {
				const index = this.selectedItems.indexOf(this.record.cdrtId);
				if (index > 0) {
					this.selectedItems = this.selectedItems.splice(index, 1);
				} else {
					this.$emit("selected", {
						id: this.record.cdrtId,
						selected: this.selected,
					});
				}
			},
		},
        formattedFullName(){
            return this.record.utFullName ? this.record.utFullName : "-";
        },
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedRemarks() {
			return this.record.cdrtRemarks ? this.record.cdrtRemarks : "-";
		},
		formattedStatusClass() {
			return this.record.cdrtStatus != null
				? STATUS_CLASS[this.record.cdrtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.cdrtStatus != null
				? this.STATUS[this.record.cdrtStatus]
				: "-";
		},
		formattedLanguage() {
			const language = this.languageOptions.find(
				(d) => d.ltId == this.record.language
			);
			return language ? language.ltName : "-";
		},
		formatted2DC() {
			let nums = (parseFloat(this.record.cdrtAmount) / 100) * 100.0;
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
			this.$parent.showQuickView(this.record.cdrtId, this.record.cdrtOrderNo);
		},
		goToView() {
			this.$router.push({
				name: "AccountDepositDetailPage",
				params: { recordId: this.record.cdrtId },
			});
		},
	},
};
</script>
