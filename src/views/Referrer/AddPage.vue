<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelReferrerAddPage() }}</h4>
				</div>
				<div class="card-body">

					<label>{{ $messages.fieldLabelTargetUser() }}</label>
					<div class="cave-form--group">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCountryCode() }}</label>
							<select v-model="ownerCountryCode" class="form-control">
								<option v-for="country in countrys" v-bind:value="country.id" v-bind:key="country.id">{{country.value}}</option>
							</select>
							<div v-if="v$.ownerCountryCode.$error">
								<div v-if="v$.ownerCountryCode.required" class="error">{{ $messages.fieldLabelCountryCodeIsRequired() }}</div>
							</div>
						</div>
						<div class="form-group">
							<label>{{ $messages.fieldLabelUserMobileNumber() }}</label>
							<input type="text" class="form-control"  :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserMobileNumber()" v-model="ownerPhoneNumber" />
							<div v-if="v$.ownerPhoneNumber.$error">
								<div v-if="v$.ownerPhoneNumber.required" class="error">
									{{ $messages.fieldLabelUserMobileNumber() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
					</div>

					<label>{{ $messages.fieldLabelNewReferrer() }}</label>
					<div class="cave-form--group">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCountryCode() }}</label>
							<select v-model="newReferrerCountryCode" class="form-control">
								<option v-for="country in countrys" v-bind:value="country.id" v-bind:key="country.id">{{country.value}}</option>
							</select>
							<div v-if="v$.newReferrerCountryCode.$error">
								<div v-if="v$.newReferrerCountryCode.required" class="error">
                                    {{ $messages.fieldLabelCountryCodeIsRequired() }}
                                </div>
							</div>
						</div>
						<div class="form-group">
							<label>{{ $messages.fieldLabelUserMobileNumber() }}</label>
							<input type="text" class="form-control"  :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserMobileNumber()" v-model="newReferrerPhoneNumber" />
							<div v-if="v$.newReferrerPhoneNumber.$error">
								<div v-if="v$.newReferrerPhoneNumber.required" class="error">
                                    {{ $messages.fieldLabelUserMobileNumber() }}{{ $messages.fieldLabelIsRequired() }}
                                </div>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.labelOTP() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelOTP()" v-model="otp" />
						<div v-if="v$.otp.$error">
							<div v-if="v$.otp.required" class="error">
                                {{ $messages.labelOTP() }}{{ $messages.fieldLabelIsRequired() }}
                            </div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelUserRemarks() }}</label>
						<textarea v-model="crhtRemarks" class="form-control"></textarea>
						<div v-if="v$.crhtRemarks.$error">
							<div v-if="v$.crhtRemarks.required" class="error">{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}</div>
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
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./Referrer";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: {},
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
		...createValidator(),
	},
	async created() {},
	computed: {},
	methods: {
		// TODO: Come back later to test the add result
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
			const [error, result] = await this.$service.referrerService.add(
				record
			);
            loader.hide();

			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "BankSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "BankSummaryPage" });
		},
	},
	watch: {},
};
</script>

<style></style>
