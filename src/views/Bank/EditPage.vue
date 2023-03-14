<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelUserBankEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length >  0" />
						<div>
							<label>{{ $messages.fieldLabelSwiftCode() }}</label>
							<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelSwiftCode()"
								v-model="ubtSwiftCode" />
							<div v-if="v$.ubtSwiftCode.$error">
								<div v-if="v$.ubtSwiftCode.required" class="error">
									{{ $messages.fieldLabelSwiftCode() }}{{ $messages.fieldLabelIsRequired() }}</div>
								<div v-if="v$.ubtSwiftCode.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3
									{{ $messages.fieldLabelCharacters() }}</div>
							</div>
						</div>
						<div class v-for="fieldOption in fieldOptions" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelNetworkType() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNetworkType()" v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptions.$error">
							<div v-if="v$.fieldOptions.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelNetworkType() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="ubtType">
							<option v-for="typeOption in typeOption" v-bind:value="typeOption.id" v-bind:key="typeOption.id">{{ typeOption.value }}
							</option>
						</select>
						<div v-if="v$.ubtType.$error">
							<div v-if="v$.ubtType.required" class="error">{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelCurrency() }} (Bank only)</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCurrency()"
							v-model="currency" />
						<div v-if="v$.currency.$error">
							<div v-if="v$.currency.required" class="error">{{ $messages.fieldLabelCurrency() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.currency.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 1
								{{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelExchangeRate() }} (Bank only)</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelExchangeRate()"
							v-model="bankExchangeRate" />
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelCountry() }} (Bank only)</label>
						<select v-model="ubtParam4" class="form-control">
							<option v-for="country in countrys" v-bind:value="country.id" v-bind:key="country.id">
								{{ country.value }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelUserRemarks() }}</label>
						<textarea v-model="ubtRemarks" class="form-control"></textarea>
						<div v-if="v$.ubtRemarks.$error">
							<div v-if="v$.ubtRemarks.required" class="error">
								{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>

					<cave-switch-checkbox v-model="ubtStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>

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
import { required } from "@vuelidate/validators";
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./Bank";
import Tabs from "@components/Tabs.vue";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, Tabs },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, required: true },
	},
	data: () => ({
		tabs: [],
		selectedTab: {},
		...createInstance(),
	}),
	validations: {
		ubtType: { required },
		...createValidator(),
	},
	async created() {
		await this.getDetail();
	},
	computed: {
		typeOption() {
			return [
				{
					id: "CRYTO",
					value: this.$messages.fieldLabelCollectTypeCryto(),
				},
				{
					id: "BANK",
					value: this.$messages.fieldLabelCollectTypeBank(),
				},
			];
		},
	},
	methods: {
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			this.ubtName = this.fieldOptions;
			this.type = this.ubtType;
			const record = {
				ubtId: this.recordId,
				...createInstance(this),
			};

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] = await this.$service.bankService.update(
				record
			);

			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "BankSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "BankSummaryPage" });
		},
		async getDetail() {
			const [error, result] = await this.$service.bankService.getDetail(
				this.recordId
			);

			if (error) {
				this.showError(error);
			} else {
				assign(this, result.content);
				this.fieldOptions = JSON.parse(this.ubtName);
			}
		},
	},
	watch: {
		languageOptions() {
			this.tabs = this.languageOptions.map((d) => {
				return {
					id: d.ltId.toString(),
					name: d.ltName,
					routeName: d.ltName,
				};
			});
			this.selectedTab = this.tabs[0];
		},
	},
};
</script>

<style></style>
