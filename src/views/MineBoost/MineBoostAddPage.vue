<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelMineBoostAddPage() }}</h4>
				</div>
				<div class="card-body">
                    <div class="form-group">
                        <cave-date-time-picker :label="$messages.fieldLabelPurchaseFrom()" v-model="gmbotStartDatetime">
						</cave-date-time-picker>
                        <div v-if="v$.gmbotStartDatetime.$error">
							<div v-if="v$.gmbotStartDatetime.required" class="error">
								{{ $messages.fieldLabelPurchaseFrom() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    <div class="form-group">
                        <cave-date-time-picker :label="$messages.fieldLabelPurchaseTo()" v-model="gmbotEndDatetime">
						</cave-date-time-picker>
                        <div v-if="v$.gmbotEndDatetime.$error">
							<div v-if="v$.gmbotEndDatetime.required" class="error">
								{{ $messages.fieldLabelPurchaseTo() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    <div class="form-group">
						<label>{{ $messages.fieldLabelReduceMinePercent() }}</label>
						<input type="number" step="0.1" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelReduceMinePercent()"
							v-model="gmbotReducePercent" />
						<div v-if="v$.gmbotReducePercent.$error">
							<div v-if="v$.gmbotReducePercent.required" class="error">
								{{ $messages.fieldLabelReduceMinePercent() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    <div class="form-group">
						<label>{{ $messages.fieldLabelBoostMinePercent() }}</label>
						<input type="number" step="0.1" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelBoostMinePercent()"
							v-model="gmbotBoostPercent" />
						<div v-if="v$.gmbotBoostPercent.$error">
							<div v-if="v$.gmbotBoostPercent.required" class="error">
								{{ $messages.fieldLabelBoostMinePercent() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelBoostTarget() }}</label>
						<select class="form-control" v-model="gmbotBoostProductId">
							<option v-for="product in productList" v-bind:value="product.gmptId" v-bind:key="product.gmptId">
								{{ product.gmptShortCode }}
							</option>
						</select>
						<div v-if="v$.gmbotBoostProductId.$error">
							<div v-if="v$.gmbotBoostProductId.required" class="error">
								{{ $messages.fieldLabelBoostTarget() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelEquivalentUSDT() }}</label>
						<input type="number" step="0.1" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelEquivalentUSDT()"
							v-model="gmbotUsdtValue" />
						<div v-if="v$.gmbotUsdtValue.$error">
							<div v-if="v$.gmbotUsdtValue.required" class="error">
								{{ $messages.fieldLabelEquivalentUSDT() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    
                    <div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<input type="text" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()"
							v-model="gmbotRemark" />
						<div v-if="v$.gmbotRemark.$error">
							<div v-if="v$.gmbotRemark.required" class="error">
								{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					
					<cave-switch-checkbox v-model="gmbotStatus"
						:text="$messages.labelStatus()"></cave-switch-checkbox>
				
				</div>

				<div class="card-footer">
					<button type="submit"
						class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round"
						@click="save()">
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
					<p>Discovere how a title would help to make the post
						attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveDateTimePicker from "@components/CaveDateTimePicker";

import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./MineBoost";
import useVuelidate from "@vuelidate/core";

export default {
	name: "MineBoostAddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox, CaveImageUpload, CaveDateTimePicker },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
                productList: [],
		...createInstance(),
	}),
	validations: {
		...createValidator(true),
	},
	async created()  {
        const [error, result] =
			await this.$service.mineProductService.getAll2();
		if (error) {
			this.showError(error);
		} else {
			this.productList = result.content;
		}
    },
	methods: {
        cancel() {
			history.back();
		},
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
            const record = {
				...createInstance(this),
			};
			const [error, result] = await this.$service.mineBoostService.add(
				record
			);
			loader.hide();

			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "MineBoostSummaryPage" });
			}
		},
	},
};
</script>

<style></style>