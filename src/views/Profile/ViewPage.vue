<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelMyProfile() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.labelUsername() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelUsername()" v-model="username" :readonly="true" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelDepartment() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDepartment()" v-model="department" :readonly="true" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserFullname() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserFullname()" v-model="fullName" :readonly="!isEdit" />
						<div v-if="v$.fullName.$error">
							<div v-if="v$.fullName.required" class="error">
								{{ $messages.fieldLabelUserFullname() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.fullName.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
							</div>
							<div v-if="v$.fullName.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 120 {{ $messages.fieldLabelCharacters() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelProfileImage() }}</label>
						<div class="row ml-2">
							<div class="form-check-radio col-md-2" v-for="profileIndex in totalProfileImages" v-bind:value="profileIndex"
								v-bind:key="profileIndex">
								<label class="form-check-label">
									<input class="form-check-input" type="radio" name="profileImage" v-model="profileImage" :value="profileIndex - 1"
										:readonly="!isEdit" />

									<span class="form-check-sign"></span>
									<img style="height: 35px; width: 35px" :src="getImgUrl(profileIndex - 1)" />
								</label>
							</div>
						</div>
					</div>
					<label>{{ $messages.fieldLabelMobileInfo() }}</label>
					<div class="cave-form--group">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCountryCode() }}</label>
							<select v-model="countryCode" class="form-control" :readonly="!isEdit">
								<option v-for="country in countrys" v-bind:value="country.id" v-bind:key="country.id">
									{{ country.value }}
								</option>
							</select>
						</div>
						<div class="form-group">
							<label>{{ $messages.fieldLabelUserMobileNumber() }}</label>
							<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserMobileNumber()" v-model="mobileNumber" :readonly="!isEdit" />
							<div v-if="v$.mobileNumber.$error">
								<div v-if="v$.mobileNumber.required" class="error">
									{{ $messages.fieldLabelUserMobileNumber() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
								<div v-if="v$.mobileNumber.minLength" class="error">
									{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
								</div>
								<div v-if="v$.mobileNumber.maxLength" class="error">
									{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer" style="text-align: right">
					<button type="submit" class="btn btn-info btn-round" @click="editOrSaveBtnOnClick()">
						{{ editTitle }}
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
} from "./Profile";
import useVuelidate from "@vuelidate/core";
import json from "../../infrastructure/json/config.json";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: {},
	mixins: [RecordMixin, pageBehaviour],
	props: {
		recordId: { type: Number, required: true, default: null },
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		isEdit: false,
		totalProfileImages: json.totalProfileImages,
		...createInstance(),
	}),
	computed: {
		editTitle() {
			return (this.editTitle = this.isEdit
				? this.$messages.labelSave()
				: this.$messages.labelEdit());
		},
	},
	validations: {
		...createValidator(),
	},
	async created() {
		await this.getDetail();
	},
	methods: {
		getImgUrl(index) {
			index = index % this.totalProfileImages;
			var images = require.context(
				"../../assets/img/profile",
				false,
				/\.png$/
			);
			return images("./" + index + ".png");
		},
		async getDetail() {
			const [error, result] =
				await this.$service.userService.getAdminInfo(this.recordId);

			if (error) {
				this.$swal("Failed to get detail");
			} else {
				assign(this, result.content);
			}
		},
		async editOrSaveBtnOnClick() {
			this.isEdit = !this.isEdit;
			if (!this.isEdit) {
				this.v$.$touch();
				if (this.v$.$invalid) {
					this.isEdit = !this.isEdit;
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
					await this.$service.userService.updateAdminProfile(record);
                    loader.hide();
				if (error) {
					this.isEdit = !this.isEdit;
					this.showError(error);
				} else {
					localStorage.loggedInUserFullName = this.fullName;
					localStorage.loggedInUserProfileImage = this.profileImage;
					this.$swal("", this.$messages.labelSuccess(), "success");
				}
			}
		},
	},
};
</script>

<style>
</style>