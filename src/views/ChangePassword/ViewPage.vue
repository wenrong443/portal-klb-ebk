<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelChangePassword() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelOldPassword() }}</label>
						<input type="password" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelOldPassword()" v-model="oldPassword" />
						<div v-if="v$.oldPassword.$error">
							<div v-if="v$.oldPassword.required" class="error">
								{{ $messages.fieldLabelOldPassword() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelNewPassword() }}</label>
						<input type="password" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNewPassword()" v-model="newPassword" />
						<div v-if="v$.newPassword.$error">
							<div v-if="v$.newPassword.required" class="error">
								{{ $messages.fieldLabelNewPassword() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.newPassword.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.newPassword.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelConfirmNewPassword() }}</label>
						<input type="password" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelConfirmNewPassword()" v-model="confirmNewPassword" />
						<div v-if="v$.confirmNewPassword.$error">
							<div v-if="v$.confirmNewPassword.required" class="error">
								{{ $messages.fieldLabelConfirmNewPassword() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
						<div v-if="!v$.confirmNewPassword.$error && confirmNewPasswordError">
							<div class="error">
								{{ $messages.fieldLabelMustSameNewPassword() }}
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
							<div v-if="v$.otp.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.otp.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer" style="text-align: right">
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
} from "./ChangePassword";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: {},
	mixins: [pageBehaviour, RecordMixin],
	props: {
		recordId: { type: Number, required: true, default: null },
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		confirmNewPasswordError: false,
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {},
	methods: {
		async save() {
			this.v$.$touch();
			this.confirmNewPasswordError = false;

			if (this.v$.$invalid) {
				return;
			}
			if (this.confirmNewPassword != this.newPassword) {
				this.confirmNewPasswordError = true;
				return;
			}

			const record = {
				...createInstance(this),
			};

let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });

			const [error, result] =
				await this.$service.userService.changePassword(record);
			if (error) {
                loader.hide();
                this.showError(error);
			} else {
                loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
			}
		},
	},
};
</script>

<style>
</style>