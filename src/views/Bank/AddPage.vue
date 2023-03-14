<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelUserBankAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length >  0"></tabs>
						<div class="form-group">
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
						<select class="form-control" v-model="type">
							<option v-for="typeOption in typeOption" v-bind:value="typeOption.id" v-bind:key="typeOption.id">{{ typeOption.value }}
							</option>
						</select>
						<div v-if="v$.type.$error">
							<div v-if="v$.type.required" class="error">{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}</div>
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
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, Tabs },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		selectedTab: {},
		tabKey: 0,
		tabs: [],
		...createInstance(),
	}),
	validations: {
		type: { required },
		...createValidator(),
	},
	async created() {},
	computed: {},
	methods: {
		forceRender() {
			this.tabKey++;
		},
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			this.ubtName = this.fieldOptions;
			const record = {
				...createInstance(this),
			};

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] = await this.$service.bankService.add(record);

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
	},
	watch: {
		languageOptions() {
			this.fieldOptions = this.languageOptions.map((d) => {
				return {
					ltId: d.ltId,
					value: "",
				};
			});

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
