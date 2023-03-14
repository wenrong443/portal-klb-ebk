<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelManagementAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelRole() }}</label>
						<select class="form-control" v-model="role">
							<option v-for="roleOption in roleOptions" v-bind:value="roleOption.id" v-bind:key="roleOption.id">
								{{ roleOption.value }}
							</option>
						</select>
						<div v-if="v$.role.$error">
							<div v-if="v$.role.required" class="error">{{ $messages.fieldLabelRole() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.labelUsername() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelUsername()" v-model="utUsername" />
						<div v-if="v$.utUsername.$error">
							<div v-if="v$.utUsername.required" class="error">
								{{ $messages.labelUsername() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.utUsername.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.utUsername.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserFullname() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserFullname()" v-model="utFullname" />
						<div v-if="v$.utFullname.$error">
							<div v-if="v$.utFullname.required" class="error">
								{{ $messages.fieldLabelUserFullname() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.utFullname.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.utFullname.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 120 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<label>{{ $messages.fieldLabelMobileInfo() }}</label>
					<div class="cave-form--group">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCountryCode() }}</label>
							<select v-model="utCountryCode" class="form-control">
								<option v-for="country in countrys" v-bind:value="country.id" v-bind:key="country.id">
									{{ country.value }}
								</option>
							</select>
							<div v-if="v$.utCountryCode.$error">
								<div v-if="v$.utCountryCode.required" class="error">
									{{ $messages.fieldLabelCountryCodeIsRequired() }}
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>{{ $messages.fieldLabelUserMobileNumber() }}</label>
							<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserMobileNumber()" v-model="utMobileNumber" />
							<div v-if="v$.utMobileNumber.$error">
								<div v-if="v$.utMobileNumber.required" class="error">
									 {{ $messages.fieldLabelUserMobileNumber() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
								<div v-if="v$.utMobileNumber.minLength" class="error">
									{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
								</div>
								<div v-if="v$.utMobileNumber.maxLength" class="error">
									{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelPassword() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPassword()" v-model="utPassword" />
						<div v-if="v$.utPassword.$error">
							<div v-if="v$.utPassword.required" class="error">
								{{ $messages.fieldLabelPassword() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.utPassword.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 6 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.utPassword.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelDepartment() }}</label>
						<select class="form-control" v-model="utDepartmentId">
							<option v-for="departmentOption in departmentOptions" v-bind:value="departmentOption.dtId"
								v-bind:key="departmentOption.dtId">
								{{ departmentOption.dtName }}
							</option>
						</select>
						<div v-if="v$.utDepartmentId.$error">
							<div v-if="v$.utDepartmentId.required" class="error">
								{{ $messages.fieldLabelDepartment() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()" v-model="utRemarks" />
					</div>

					<cave-switch-checkbox v-model="utStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
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
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./Admin";
import useVuelidate from "@vuelidate/core";

export default {
	name: "AdminAddPage",
	mixins: [pageBehaviour, RecordMixin],
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(true),
	},
	created() {},
	methods: {
        cancel() {
			history.back();
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

			const [error, result] = await this.$service.managementService.addUser(
				record
			);

			if (error) {
                loader.hide();
				this.showError(error);
			} else {
                loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "AdminSummaryPage" });
			}
		},
	},
};
</script>

<style></style>