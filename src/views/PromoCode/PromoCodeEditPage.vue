<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelPromoCodeEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelTitle() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
							v-model="pctTitle" />
						<div v-if="v$.pctTitle.$error">
							<div v-if="v$.pctTitle.required" class="error">
								{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.pctTitle.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.pctTitle.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 200 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelCode() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCode()"
							v-model="pctCode" />
						<div v-if="v$.pctCode.$error">
							<div v-if="v$.pctCode.required" class="error">
								{{ $messages.fieldLabelCode() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.pctCode.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.pctCode.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 200 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="pctType" @change="missionTypeOnChange($event)">
							<option v-for="typeOption in typeOptions" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ typeOption.value }}</option>
						</select>
						<div v-if="v$.pctType.$error">
							<div v-if="v$.pctType.required" class="error">
								{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelWalletType() }}</label>
						<select class="form-control" v-model="pctTo">
							<option v-for="typeOption in toOptions" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ typeOption.value }}</option>
						</select>
						<div v-if="v$.pctTo.$error">
							<div v-if="v$.pctTo.required" class="error">
								{{ $messages.fieldLabelWalletType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelDeductType() }}</label>
						<select class="form-control" v-model="pctDeductType">
							<option v-for="typeOption in deductTypeOptions" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ typeOption.value }}</option>
						</select>
						<div v-if="v$.pctDeductType.$error">
							<div v-if="v$.pctDeductType.required" class="error">
								{{ $messages.fieldLabelDeductType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelAmount() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelAmount()"
							v-model="pctValue" />
						<div v-if="v$.pctValue.$error">
							<div v-if="v$.pctValue.required" class="error">
								{{ $messages.fieldLabelAmount() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.pctValue.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelDistribute() }} ({{ $messages.fieldLabelMaxPerUser() }})</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPriority()"
							v-model="pctMaxPerUser" />
						<div v-if="v$.pctMaxPerUser.$error">
							<div v-if="v$.pctMaxPerUser.required" class="error">
								{{ $messages.fieldLabelDistribute() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.pctMaxPerUser.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelDistribute() }} ({{ $messages.fieldLabelMaxDistribute() }})</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDistribute()"
							v-model="pctMaxDistribute" />
						<div v-if="v$.pctMaxDistribute.$error">
							<div v-if="v$.pctMaxDistribute.required" class="error">
								{{ $messages.fieldLabelDistribute() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.pctMaxDistribute.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelValid() }} ({{ $messages.labelFrom() }})</label>
						<input type="date" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelValid()"
							v-model="pctValidStart" />
						<div v-if="v$.pctValidStart.$error">
							<div v-if="v$.pctValidStart.required" class="error">
								{{ $messages.fieldLabelValid() }} ({{ $messages.labelFrom() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelValid() }} ({{ $messages.labelTo() }})</label>
						<input type="date" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelValid()"
							v-model="pctValidEnd" />
						<div v-if="v$.pctValidEnd.$error">
							<div v-if="v$.pctValidEnd.required" class="error">
								{{ $messages.fieldLabelValid() }} ({{ $messages.labelTo() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelProduct() }}</label>
						<select class="form-control" v-model="pctSpecificProducts">
							<option v-for="typeOption in productOptions" v-bind:value="typeOption.gmptId" v-bind:key="typeOption.gmptId">
								{{ typeOption.gmptShortCode }}</option>
						</select>
						<!-- <div v-if="v$.pctSpecificProducts.$error">
							<div v-if="v$.pctSpecificProducts.required" class="error">
								{{ $messages.fieldLabelProduct() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div> -->
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelPackage() }}</label>
						<select class="form-control" v-model="pctSpecificPackage">
							<option v-for="typeOption in packageOptions" v-bind:value="typeOption.gmpaatId" v-bind:key="typeOption.gmpaatId">
								{{ typeOption.gmpaatGmptShortCode }} - {{ typeOption.title }}</option>
						</select>
						<!-- <div v-if="v$.pctSpecificPackage.$error">
							<div v-if="v$.pctSpecificPackage.required" class="error">
								{{ $messages.fieldLabelPackage() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div> -->
					</div>

					<cave-switch-checkbox v-model="pctStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()">
						{{ $messages.labelSave() }}
					</button>
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
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./PromoCode";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import useVuelidate from "@vuelidate/core";
import json from "../../infrastructure/json/config.json";

export default {
	name: "",
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox, CaveImageUpload },
	mixins: [RecordMixin, pageBehaviour],
	data: {
		previewImage: "",
	},
	props: {
		recordId: { type: Number, required: true, default: null },
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(false),
	},
	async created() {
		await this.getDetail();
	},
	methods: {
        cancel() {
			history.back();
		},
		async getDetail() {
			const [error, result] =
				await this.$service.promoCodeService.getDetails(this.recordId);

			if (error) {
				this.$swal("Failed to get detail");
			} else {
				assign(this, result.content);

                if (result.content.pctType == 'CASHBACK'){
                    this.toOptions = [
					{
                        id: "DEPOSIT_BALANCE",
                        value: "DEPOSIT BALANCE"
                    }, {
                        id: "WITHDRAWAL_BALANCE",
                        value: "WITHDRAWAL BALANCE"
                    }
				];
                }
			}
		},
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			const record = {
				...createInstance(this),
			};

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] = await this.$service.promoCodeService.update(
				record
			);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "PromoCodeSummaryPage" });
			}
		},
	},
};
</script>

<style>
</style>