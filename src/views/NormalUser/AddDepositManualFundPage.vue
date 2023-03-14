<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ formattedTitle() }} - {{ username }}</h4>
				</div>
				<div class="card-body">

					<div class="form-group">
						<label>{{ $messages.labelAmount() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelAmount()"
							v-model="amount" />
						<div v-if="v$.amount.$error">
							<div v-if="v$.amount.required" class="error">{{ $messages.labelAmount() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.amount.required" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 1
								{{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelUserRemarks() }}</label>
						<textarea v-model="remark" class="form-control"></textarea>
						<div v-if="v$.remark.$error">
							<div v-if="v$.remark.required" class="error">{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.remark.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 300
								{{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()" :disabled="isDisableButton">{{ $messages.labelSave() }}</button>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Good Title Would Help</h4>
				</div>
				<div class="card-body">
					<p>Discovere how a title would help to make the post attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	createManualFundInstance,
	createManualFundValidator,
	mixin as RecordMixin,
} from "./NormalUser";
import useVuelidate from "@vuelidate/core";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox },
	props: {
		recordId: { type: Number, required: true, default: null },
		isDeposit: { type: Boolean, required: true, default: null },
        username: { type: String, required: false, default: "-" }
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
        isDisableButton: false,
		selectedTab: {},
		tabKey: 0,
		tabs: [],
		productList: [],
		...createManualFundInstance(),
	}),
	validations: {
		...createManualFundValidator(),
	},
	async created() {},
	computed: {
        
    },
	methods: {
        formattedTitle() {
            if (this.isDeposit == null){
                return "";
            }
            if (this.isDeposit == 'true'){
                return this.$messages.fieldLabelCreateDeposit();
            }else{
                return this.$messages.fieldLabelCreateManualFund();
            }
        },
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}
            this.isDisableButton = true;

            var formData = new FormData();
            formData.append("utId", this.recordId);
            formData.append("amount", this.amount);
            formData.append("remark", this.remark);

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] = this.isDeposit == 'true'
				? await this.$service.accountService.createDepositRecord(formData)
				: await this.$service.accountService.createManualFundRecord(
						formData
				  );

			if (error) {
				loader.hide();
				this.showError(error);
                this.isDisableButton = false;
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
                if (this.isDeposit == 'true'){
                    this.isDisableButton = false;
                          this.$parent.dismissQuickView2();
                }else{
                    this.isDisableButton = false;
                                              this.$parent.dismissQuickView3();
                }

				// this.$router.push({ name: "NormalUserSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "NormalUserSummaryPage" });
		},
	},
	watch: {},
};
</script>

<style></style>
