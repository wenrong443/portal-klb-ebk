<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelCollectMoneyBankAddPage() }}</h4>
				</div>
				<div class="card-body">
                    <div class="form-group">
						<label>{{ $messages.fieldLabelNickname() }} / {{ $messages.fieldLabelBankName() }}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNickname() + ' / ' + $messages.fieldLabelBankName()" v-model="cmbtBankName" />
						<div v-if="v$.cmbtBankName.$error">
							<div v-if="v$.cmbtBankName.required" class="error">{{ $messages.fieldLabelNickname() }} / {{ $messages.fieldLabelBankName() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.cmbtBankName.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
                    
					<div class="form-group">
						<label>{{ $messages.fieldLabelNetworkType() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNetworkType()" v-model="cmbtAccountName" />
						<div v-if="v$.cmbtAccountName.$error">
							<div v-if="v$.cmbtAccountName.required" class="error">{{ $messages.fieldLabelNetworkType() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.cmbtAccountName.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelWalletAddress() }} / {{ $messages.fieldLabelAccountNo() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelWalletAddress() + ' / ' + $messages.fieldLabelAccountNo()" v-model="cmbtAccountNo" />
						<div v-if="v$.cmbtAccountNo.$error">
							<div v-if="v$.cmbtAccountNo.required" class="error">{{ $messages.fieldLabelWalletAddress() }} / {{ $messages.fieldLabelAccountNo() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.cmbtAccountNo.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					

					<div class="form-group">
						<label>{{ $messages.fieldLabelMinAmount() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMinAmount()" v-model="cmbtMinAmount" />
						<div v-if="v$.cmbtMinAmount.$error">
							<div v-if="v$.cmbtMinAmount.required" class="error">{{ $messages.fieldLabelMinAmount() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.cmbtMinAmount.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					

                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="type">
							<option v-for="typeOption in typeOptions" v-bind:value="typeOption.id" v-bind:key="typeOption.id">{{ typeOption.value }}
							</option>
						</select>
						<div v-if="v$.type.$error">
							<div v-if="v$.type.required" class="error">{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelAccountName() }} (Bank only)</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelAccountName()" v-model="bankAccountName" />
						<div v-if="v$.cmbtRemarks.$error">
							<div v-if="v$.bankAccountName.required" class="error">{{ $messages.fieldLabelAccountName() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.bankAccountName.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 1 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelCurrency() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCurrency()" v-model="currency" />
						<div v-if="v$.currency.$error">
							<div v-if="v$.currency.required" class="error">{{ $messages.fieldLabelCurrency() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.currency.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 1 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelExchangeRate() }} (Bank only)</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelExchangeRate()" v-model="bankExchangeRate" />
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelCountry() }} (Bank only)</label>
                        <select v-model="cmbtParam4" class="form-control">
								<option v-for="country in countrys" v-bind:value="country.id" v-bind:key="country.id">
									{{ country.value }}
								</option>
							</select>
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()" v-model="cmbtRemarks" />
						<div v-if="v$.cmbtRemarks.$error">
							<div v-if="v$.cmbtRemarks.required" class="error">{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.cmbtRemarks.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					<cave-switch-checkbox v-model="cmbtStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>

					
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
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";

import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./CollectMoneyBank";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	created() {},
	methods: {
		cancel() {
			this.$router.push({ name: "CollectMoneyBankSummaryPage" });
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

			const [
				error,
				result,
			] = await this.$service.bankService.addCollectMoneyBank(record);

			if (error) {
                loader.hide();
                this.showError(error);
			} else {
                loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "CollectMoneyBankSummaryPage" });
			}
		},
	},
};
</script>

<style></style>
