<template>
	<div class="row">
		<div class="col-md-6">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelWithdrawDetailPage() }}</h4>
				</div>
				<div class="card-body">
					<cave-detail-component :label="$messages.labelUsername()" :value="cwrtUtUsername" />
					<cave-detail-component :label="$messages.fieldLabelRefNo()" :value="cwrtOrderNo" />
					<cave-detail-component :label="$messages.labelCreatedAt()" :value="cwrtCreatedOn" />
					<cave-detail-component :label="$messages.fieldLabelWithdrawType()" :value="cwrtUbtType" />
					<!-- <cave-detail-component :label="$messages.fieldLabelUserMembership()" :value="formattedLevelName" /> -->
					<cave-detail-component :label="$messages.fieldLabelNetworkType()" :value="formattedBankName" />
					<cave-detail-component :label="$messages.fieldLabelWalletAddress()" :value="cwrtUbbtAccountNo" />
					
                    <cave-detail-component v-if="VITE_INDIA_BANK" :label="$messages.labelBankAccountType()" :value="cwrtUbbtExAccType" />
					<cave-detail-component v-if="VITE_INDIA_BANK" :label="$messages.labelBankBranch()" :value="cwrtUbbtExBranch" />
					<cave-detail-component v-if="VITE_INDIA_BANK" :label="$messages.labelBankIfsc()" :value="cwrtUbbtExIfsc" />
					<cave-detail-component v-if="VITE_INDIA_BANK" :label="$messages.labelBankHqIfsc()" :value="cwrtUbbtExHqIfsc" />

                    
                    
                    <cave-detail-component :label="$messages.fieldLabelAmount()" :value="formattedAmount" />
 
					<cave-detail-component :label="$messages.fieldLabelProcessedBy()"
						:value="cwrtProcessedByUtUsername" />
					<cave-detail-component :label="$messages.fieldLabelProcessedAt()" :value="cwrtProcessedOn" />
					<cave-detail-component :label="$messages.fieldLabelProcessingFee()"
						:value="cwrtProcessingFee.toString()" />
					<cave-detail-component :label="$messages.labelStatus()">
						<span class="badge badge-pill"
							v-bind:class="formattedStatusClass">{{ formattedStatusName }}</span>
					</cave-detail-component>
					<cave-detail-component :label="$messages.fieldLabelUserRemarks()" :value="cwrtRemarks" />
					<cave-detail-component :label="$messages.fieldLabelAdminRejectReason()" :value="cwrtParam4" />
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="reject()"
						v-if="canAction && $claims.canRejectWithdraw">{{ $messages.labelReject() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="approve()"
						v-if="canAction && $claims.canApproveWithdraw">{{ $messages.labelApprove() }}</button>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<cave-detail-component label="Wallet QR Code" />
					<qrcode-vue :value="qrCodeContent" size="200"></qrcode-vue>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	assign,
	createInstance,
	STATUS_CLASS,
	STATUS,
	RecordMixin as mixin,
} from "./Account";
import CaveDetailComponent from "@components/CaveDetailComponent";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import QrcodeVue from "qrcode.vue";
import json from "@/infrastructure/json/config.json";

export default {
	name: "WithdrawDetailPage",
	components: { CaveDetailComponent, QrcodeVue },
	mixins: [pageBehaviour],
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
        VITE_INDIA_BANK: process.env.VITE_INDIA_BANK == "true" ? true : false,
		STATUS: {},
		qrCodeContent: "",
		...createInstance(),
	}),
	computed: {
		formattedStatusClass() {
			return this.cwrtStatus != null ? STATUS_CLASS[this.cwrtStatus] : "-";
		},
		formattedStatusName() {
			return this.cwrtStatus != null ? this.STATUS[this.cwrtStatus] : "-";
		},
		canAction() {
			return this.cwrtStatus == 0;
		},
		formattedBankName() {
			return this.cwrtUbtName ? JSON.parse(this.cwrtUbtName)[0].value : "-";
		},
		formattedLevelName() {
			return this.cwrtMtName ? JSON.parse(this.cwrtMtName)[0].value : "-";
		},
        formattedAmount() {
			if (this.cwrtAmount == null) {
				return "-";
			} else {
				if (this.cwrtUbtType != "BANK") {
					return this.cwrtAmount;
				} else {
					// return (
					// 	this.cwrtAmount +
					// 	" (" +
					// 	this.cwrtParam5 +
					// 	"" +
					// 	this.cwrtParam8 +
					// 	" @ " +
					// 	this.cwrtParam7 +
					// 	")"
					// );
                    return (
						this.cwrtAmount 
						
					);
				}
			}
		},
	},
	async created() {
		await this.get();
	},
	methods: {
		async get() {
			this.STATUS = {
				1: this.$messages.fieldLabelApproved(),
				0: this.$messages.fieldLabelPending(),
				"-1": this.$messages.fieldLabelRejected(),
			};
			const [error, result] = await this.$service.accountService.getWithdraw(
				this.recordId
			);

			if (error) {
				this.showError(error);
			} else {
				assign(this, result.content);
				this.qrCodeContent = this.cwrtUbbtAccountNo.split(" ").join("");
			}
		},
		async approve() {
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
				this.setLoading();

				const [error, result] =
					await this.$service.accountService.approveWithdraw(this.recordId);

				if (error) {
					this.showError(error);
				} else {
					this.setCompleted();
					this.$swal("Approved!", "You approved!", "success");
                                this.$parent.dismissQuickView();

					// this.$emit("refresh");
				}
			}
		},
		async reject() {
			const { value: color } = await this.$swal({
				title: this.$messages.labelAreYouSure(),
				text: this.$messages.labelYourWontBeAbleToRevertThis(),
				input: "radio",
				inputOptions: json.withdrawRejectReasons,
				inputValidator: async (value) => {
					if (!value) {
						return "You need to choose something!";
					}
					this.setLoading();
					const [error, result] =
						await this.$service.accountService.rejectWithdraw(
							this.recordId,
							color
						);
					if (error) {
						this.showError(error);
					} else {
						this.setCompleted();
						this.$swal("Rejected!", "You rejected!", "success");
                                    this.$parent.dismissQuickView();

						// this.$emit("refresh");
					}
				},
			});
		},
	},
};
</script>
