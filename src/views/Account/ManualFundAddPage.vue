<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelManualFundAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelCountryCode() }}</label>
						<select v-model="countryCode" class="form-control">
							<option v-for="country in countrys" v-bind:key="country.id" v-bind:value="country.id">{{country.value}}</option>
						</select>
						<div v-if="v$.countryCode.$error">
							<div v-if="v$.countryCode.required" class="error">{{ $messages.fieldLabelCountryCodeIsRequired() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserMobileNumber() }}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserMobileNumber()" v-model="phoneNumber" />
						<div v-if="v$.phoneNumber.$error">
							<div v-if="v$.phoneNumber.required" class="error">{{ $messages.fieldLabelUserMobileNumber() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.phoneNumber.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}</div>
							<div v-if="v$.phoneNumber.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelType() }}</label>
						<select v-model="type" class="form-control">
							<option v-for="typeOption in typeOptions" v-bind:key="typeOption.id">{{typeOption.value}}</option>
						</select>
						<div v-if="v$.type.$error">
							<div v-if="v$.type.required" class="error">{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>

                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelProduct() }}</label>
						<select class="form-control" v-model="productId">
							<option v-for="product in productList" v-bind:value="product.gmptId" v-bind:key="product.gmptId">
								{{ product.gmptShortCode }}
							</option>
						</select>
						<div v-if="v$.productId.$error">
							<div v-if="v$.productId.required" class="error">
								{{ $messages.fieldLabelProduct() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.labelAmount() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelAmount()" v-model="mfrtAmount" />
						<div v-if="v$.mfrtAmount.$error">
							<div v-if="v$.mfrtAmount.required" class="error">{{ $messages.labelAmount() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.mfrtAmount.required" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 1 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.labelOTP() }}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelOTP()" v-model="otp" />
						<div v-if="v$.otp.$error">
							<div v-if="v$.otp.required" class="error">{{ $messages.labelOTP() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.otp.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 6 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

                    <cave-switch-checkbox v-model="depositWallet" :text="$messages.fieldLabelIsDepositWallet()"></cave-switch-checkbox>
					<cave-switch-checkbox v-model="mfrtIsRealMoneyTransaction" :text="$messages.fieldLabelIsRealMoney()"></cave-switch-checkbox>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelUserRemarks() }}</label>
						<textarea v-model="mfrtRemarks" class="form-control"></textarea>
						<div v-if="v$.mfrtRemarks.$error">
							<div v-if="v$.mfrtRemarks.required" class="error">{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.mfrtRemarks.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 300 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()">{{ $messages.labelSave() }}</button>
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
} from "./Account";
import useVuelidate from "@vuelidate/core";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		selectedTab: {},
		tabKey: 0,
		tabs: [],
        productList: [],
		...createManualFundInstance(),
	}),
	validations: {
		...createManualFundValidator(),
	},
	async created() {
        const [error, result] =
			await this.$service.mineProductService.getAll2();
		if (error) {
			this.showError(error);
		} else {
			// this.productList = result.content;

            this.productList = [
				{
					gmptId: 0,
					gmptShortCode: "$",
				},
			];
			this.productList = this.productList.concat.apply(
				this.productList,
				result.content
			);
		}
    },
	computed: {},
	methods: {
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			const record = {
				...createManualFundInstance(this),
			};

            let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });

			const [error, result] = await this.$service.accountService.addManualFund(
				record
			);

			if (error) {
                loader.hide();
                this.showError(error);
			} else {
                loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "AccountManualFundSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "AccountManualFundSummaryPage" });
		},
	},
	watch: {},
};
</script>

<style></style>
