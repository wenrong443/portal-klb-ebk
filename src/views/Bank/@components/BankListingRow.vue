<template>
	<td>{{ rowIndex }}</td>
	<td class="cave-table-row--center">{{ record.ubtSwiftCode }}</td>
	<td class="cave-table-row--center">{{ record.bankName }}</td>
	<td class="cave-table-row--center">{{ formattedType }}</td>
    <td class="cave-table-row--center">{{ record.ubtParam3 }}</td>
    <td class="cave-table-row--center">{{ record.ubtParam2 }}</td>
	<td class="cave-table-row--center">
		<span class="badge badge-pill" v-bind:class="formattedStatusClass">
			{{ formattedStatusName }}
		</span>
	</td>

    <td class="text-right">
		<div class="dropdown">
			<button class="dropdown-toggle btn btn-primary btn-round btn-block btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false">{{ $messages.labelMore() }}</button>
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click="goToEdit()">{{ $messages.labelEdit() }}</a>
				<a class="dropdown-item" href="#" @click="deleteRow()">{{ $messages.labelDelete() }}</a>
			</div>
		</div>
	</td>
</template>

<script>
const STATUS_CLASS = {
	1: "badge-success",
	0: "badge-info",
};

import rowBehaviour from "seedwork/mixins/rowBehaviour";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "UserBankListingRow",
	mixins: [rowBehaviour, pageBehaviour],
	props: {
		record: { type: Object, require: true },
		languageOptions: { type: Array, require: true },
	},
	data: () => ({
		STATUS: {},
		type: [],
	}),
	computed: {
		formattedLastLoginIp() {
			return this.record.utLastLoginIp ? this.record.utLastLoginIp : "-";
		},
		formattedStatusClass() {
			return this.record.ubtStatus != null
				? STATUS_CLASS[this.record.ubtStatus]
				: "";
		},
		formattedStatusName() {
			return this.record.ubtStatus != null
				? this.STATUS[this.record.ubtStatus]
				: "-";
		},
		formattedType() {
			return this.record.ubtType != null
				? this.type[this.record.ubtType]
				: "-";
		},
		formattedLanguage() {
			const language = this.languageOptions.find(
				(d) => d.ltId == this.record.language
			);
			return language ? language.ltName : "-";
		},
	},
	async created() {
		this.STATUS = {
			1: this.$messages.labelActive(),
			0: this.$messages.labelSuspend(),
		};

		this.type = {
			CRYTO: this.$messages.fieldLabelCollectTypeCryto(),
            BANK: this.$messages.fieldLabelCollectTypeBank()
		};
	},
	methods: {
		goToEdit() {
			this.$router.push({
				name: "BankEditPage",
				params: { recordId: this.record.ubtId },
			});
		},
		async deleteRow() {
			const value = await this.$swal({
				title: this.$messages.labelAreYouSure(),
				text: this.$messages.labelYourWontBeAbleToRevertThis(),
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: this.$messages.fieldLabelYes(),
				cancelButtonText: this.$messages.fieldLabelNo(),
			}).then((value) => {
				return value;
			});

			if (value.isConfirmed) {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });

				const [error, result] = await this.$service.bankService.delete(
					this.record.ubtId
				);
				if (error) {
                    loader.hide();
                    this.showError(error);
				} else {
                    loader.hide();
					this.$swal(
						"",
						this.$messages.labelSuccess(),
						"success"
					);
					this.$emit("refresh");
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
