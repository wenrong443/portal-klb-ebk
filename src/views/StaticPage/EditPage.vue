<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.fieldLabelOthersSettings() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length > 0"></tabs>
					</div>
					<div class="form-group">
						<label>{{ $messages.labelWebsiteTitle() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() +  $messages.labelWebsiteTitle()"
							v-model="websiteTitle" />
					</div>
					<div class="form-group">
						<cave-image-upload :title="$messages.labelWebsiteLogo()" v-model="logo" :existedImage="websiteLogo"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
                    <div class="form-group">
						<cave-image-upload :title="$messages.labelWebsiteLogo() + ' (Mono)'" v-model="image5" :existedImage="websiteLogo2"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
                    <div class="form-group">
						<cave-image-upload :title="$messages.labelPlayLogo()" v-model="image2" :existedImage="playLogo"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
                    <div class="form-group">
						<cave-image-upload :title="$messages.labelLoadingBackground()" v-model="image3" :existedImage="reviewLoadingBackground"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
                    <div class="form-group">
						<cave-image-upload :title="$messages.labelLoadingGif()" v-model="image4" :existedImage="reviewLoadingGif"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
                    <hr>
					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImage()" v-model="image" :existedImage="companyImage"></cave-image-upload>
					</div>
            
					<div class="form-group cave-form">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCompanyName() }}</label>
							<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() +  $messages.fieldLabelCompanyName()"
								v-model="companyName" />
							<div v-if="v$.companyName.$error">
								<div v-if="v$.companyName.required" class="error">
									{{ $messages.fieldLabelCompanyName() }} {{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
					</div>
					<div class="form-group cave-form">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCompanyAddress() }}</label>
							<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCompanyAddress()"
								v-model="companyAddress" />
							<div v-if="v$.companyAddress.$error">
								<div v-if="v$.companyAddress.required" class="error">
									{{ $messages.fieldLabelCompanyAddress() }} {{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
					</div>
					<div class="form-group cave-form">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCompanyContactNumber() }}</label>
							<input type="text" class="form-control"
								:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCompanyContactNumber()"
								v-model="companyContactNumber" />
							<div v-if="v$.companyContactNumber.$error">
								<div v-if="v$.companyContactNumber.required" class="error">
									{{ $messages.fieldLabelCompanyContactNumber() }} {{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
					</div>
					<div class="form-group cave-form">
						<div class="form-group">
							<label>{{ $messages.fieldLabelCompanyEmail() }}</label>
							<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCompanyEmail()"
								v-model="companyEmail" />
							<div v-if="v$.companyEmail.$error">
								<div v-if="v$.companyEmail.required" class="error">
									{{ $messages.fieldLabelCompanyEmail() }} {{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
					</div>

					<div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsCompanyBusinessHours" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelCompanyBusinessHours() }}</label>
								<cave-advanced-text-area v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsCompanyBusinessHours.$error">
							<div v-if="v$.fieldOptionsCompanyBusinessHours.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelCompanyBusinessHours() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<!-- <div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsPlatformNoticePage" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelPlatformNotice() }}</label>
								<cave-advanced-text-area v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsPlatformNoticePage.$error">
							<div v-if="v$.fieldOptionsPlatformNoticePage.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelPlatformNotice() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsBusinessHoursPage" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelBusinessHoursPage() }}</label>
								<cave-advanced-text-area v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsBusinessHoursPage.$error">
							<div v-if="v$.fieldOptionsBusinessHoursPage.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelBusinessHoursPage() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

                    <div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsWithdrawProcessPage" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelWithdrawProcessPage() }}</label>
								<cave-advanced-text-area v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsWithdrawProcessPage.$error">
							<div v-if="v$.fieldOptionsWithdrawProcessPage.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelWithdrawProcessPage() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

                    <div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsReloadProcessPage" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelReloadProcessPage() }}</label>
								<cave-advanced-text-area  v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsReloadProcessPage.$error">
							<div v-if="v$.fieldOptionsReloadProcessPage.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelReloadProcessPage() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

                    <div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsTutorialPage" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelTutorialPage() }}</label>
								<cave-advanced-text-area  v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsTutorialPage.$error">
							<div v-if="v$.fieldOptionsTutorialPage.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelTutorialPage() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div> -->
				</div>
				<div class="card-footer">
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
import json from "../../infrastructure/json/config.json";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveTextArea from "@components/CaveTextArea";
import CaveImageUpload from "@components/CaveImageUpload";

import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./StaticPage";
import Tabs from "@components/Tabs.vue";
import useVuelidate from "@vuelidate/core";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveAdvancedTextArea, CaveTextArea, Tabs, CaveImageUpload },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		tabs: [],
		selectedTab: {},
		currency: json.currency,
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {
		await this.getDetail();
	},
	computed: {},
	methods: {
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
                console.log("invalid")
				return;
			}

			this.companyBusinessHours = this.fieldOptionsCompanyBusinessHours;
			this.businessHoursPage = this.fieldOptionsBusinessHoursPage;
			this.withdrawProcessPage = this.fieldOptionsWithdrawProcessPage;
			this.reloadProcessPage = this.fieldOptionsReloadProcessPage;
			this.platformNoticePage = this.fieldOptionsPlatformNoticePage;
			this.tutorialPage = this.fieldOptionsTutorialPage;

			const record = {
				...createInstance(this),
			};

			var formData = new FormData();
			formData.append("image", this.image);

			await this.$service.staticPageService.uploadImage(formData);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.staticPageService.update(record);
			loader.hide();

			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
			}

			if (this.logo != null) {
				let loader2 = this.$loading.show({
					// Optional parameters
					container: null,
				});
				var formData2 = new FormData();
				formData2.append("image", this.logo);
				await this.$service.staticPageService.uploadWebsiteLogo(
					formData2
				);
				loader2.hide();
			}

            if (this.image5 != null) {
				let loader5 = this.$loading.show({
					// Optional parameters
					container: null,
				});
				var formData5 = new FormData();
				formData5.append("image", this.image5);
				await this.$service.staticPageService.uploadWebsiteLogo2(
					formData5
				);
				loader5.hide();
			}

            if (this.image2 != null) {
				let loader2 = this.$loading.show({
					// Optional parameters
					container: null,
				});
				var formData2 = new FormData();
				formData2.append("image", this.image2);
				await this.$service.staticPageService.uploadPlayLogo(
					formData2
				);
				loader2.hide();
			}

            if (this.image3 != null) {
				let loader3 = this.$loading.show({
					// Optional parameters
					container: null,
				});
				var formData3 = new FormData();
				formData3.append("image", this.image3);
				await this.$service.staticPageService.uploadReviewLoadingBackgroundImage(
					formData3
				);
				loader3.hide();
			}

            if (this.image4 != null) {
				let loader4 = this.$loading.show({
					// Optional parameters
					container: null,
				});
				var formData4 = new FormData();
				formData4.append("image", this.image4);
				await this.$service.staticPageService.uploadReviewLoadingBackgroundGif(
					formData4
				);
				loader4.hide();
			}
		},
		async getDetail() {
			const [error, result] =
				await this.$service.staticPageService.getAll();

			if (error) {
			} else {
				assign(this, result.content);
				this.fieldOptionsBusinessHoursPage = JSON.parse(
					this.businessHoursPage
				);
				this.fieldOptionsWithdrawProcessPage = JSON.parse(
					this.withdrawProcessPage
				);
				this.fieldOptionsReloadProcessPage = JSON.parse(
					this.reloadProcessPage
				);
				this.fieldOptionsPlatformNoticePage = JSON.parse(
					this.platformNoticePage
				);
				this.fieldOptionsTutorialPage = JSON.parse(this.tutorialPage);
				this.fieldOptionsCompanyBusinessHours = JSON.parse(
					this.companyBusinessHours
				);
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
