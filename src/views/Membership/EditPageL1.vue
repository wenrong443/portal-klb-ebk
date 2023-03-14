<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelMembershipEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length > 0"></tabs>
						<div class v-for="fieldOption in fieldOptionsTitle" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelTitle() }}</label>
								<input type="text" class="form-control mr-2" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
									v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsTitle.$error">
							<div v-if="v$.fieldOptionsTitle.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group cave-form">
						<div class v-for="fieldOption in fieldOptionsDescription" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelDescription() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDescription()" v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsDescription.$error">
							<div v-if="v$.fieldOptionsDescription.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelDescription() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelLevel() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelLevel()"
							v-model="mtLevel" :readonly="true" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelPrice() }} ({{currency}})</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPrice()"
							v-model="mtPrice" :readonly="true" />
					</div>

					<!-- <div class="form-group">
						<label>{{ $messages.fieldLabelTaskReward() }} ({{ $messages.fieldLabelSelf() }}) ({{currency}})</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskReward() + ' (' + $messages.fieldLabelSelf() + ')'"
							v-model="mtRewardPerTask" />
						<div v-if="v$.mtRewardPerTask.$error">
							<div v-if="v$.mtRewardPerTask.required" class="error">
								{{ $messages.fieldLabelTaskReward() }} ({{ $messages.fieldLabelSelf() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtRewardPerTask.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div> -->

					<div class="form-group">
						<label>{{ $messages.fieldLabelTaskPerDay() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPerDay()"
							v-model="mtTotalTask" />
						<div v-if="v$.mtTotalTask.$error">
							<div v-if="v$.mtTotalTask.required" class="error">
								{{ $messages.fieldLabelTaskPerDay() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtTotalTask.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelUpgradeDiscount() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUpgradeDiscount()"
							v-model="mtUpgradeDiscount" />
						<div v-if="v$.mtUpgradeDiscount.$error">
							<div v-if="v$.mtUpgradeDiscount.required" class="error">
								{{ $messages.fieldLabelUpgradeDiscount() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtUpgradeDiscount.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelMinWithdraw() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMinWithdraw()"
							v-model="mtMinWithdraw" />
						<div v-if="v$.mtMinWithdraw.$error">
							<div v-if="v$.mtMinWithdraw.required" class="error">
								{{ $messages.fieldLabelMinWithdraw() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtMinWithdraw.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelMaxWithdraw() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMaxWithdraw()"
							v-model="mtMaxWithdraw" />
						<div v-if="v$.mtMaxWithdraw.$error">
							<div v-if="v$.mtMaxWithdraw.required" class="error">
								{{ $messages.fieldLabelMaxWithdraw() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtMaxWithdraw.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelMaxWithdrawPerDay() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMaxWithdrawPerDay()"
							v-model="mtMaxWithdrawPerDay" />
						<div v-if="v$.mtMaxWithdrawPerDay.$error">
							<div v-if="v$.mtMaxWithdrawPerDay.required" class="error">
								{{ $messages.fieldLabelMaxWithdrawPerDay() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtMaxWithdrawPerDay.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelCommision2() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCommision2()"
							v-model="mtCommissionPercent" />
						<div v-if="v$.mtCommissionPercent.$error">
							<div v-if="v$.mtCommissionPercent.required" class="error">
								{{ $messages.fieldLabelCommision2() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtCommissionPercent.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelMinRemainingAtWallet() }}</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMinRemainingAtWallet()" v-model="mtMinLeftAtWallet" />
						<div v-if="v$.mtMinLeftAtWallet.$error">
							<div v-if="v$.mtMinLeftAtWallet.required" class="error">
								{{ $messages.fieldLabelMinRemainingAtWallet() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtMinLeftAtWallet.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelValidity() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelValidity()"
							v-model="mtValidity" />
						<div v-if="v$.mtValidity.$error">
							<div v-if="v$.mtValidity.required" class="error">
								{{ $messages.fieldLabelValidity() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mtValidity.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

                    <div class="form-group" v-if="!isV2">
						<label>{{ $messages.fieldLabelTaskPriceStart() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPriceStart()"
							v-model="taskPriceStart" />
						<div v-if="v$.taskPriceStart.$error">
							<div v-if="v$.taskPriceStart.required" class="error">
								{{ $messages.fieldLabelTaskPriceStart() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.taskPriceStart.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="!isV2">
						<label>{{ $messages.fieldLabelTaskPriceEnd() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPriceEnd()"
							v-model="taskPriceEnd" />
						<div v-if="v$.taskPriceEnd.$error">
							<div v-if="v$.taskPriceEnd.required" class="error">
								{{ $messages.fieldLabelTaskPriceEnd() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.taskPriceEnd.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

                    
                    <div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskPriceStart() }} (Low)</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPriceStart()"
							v-model="taskPriceStartLow" />
						<div v-if="v$.taskPriceStartLow.$error">
							<div v-if="v$.taskPriceStartLow.required" class="error">
								{{ $messages.fieldLabelTaskPriceStart() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.taskPriceStartLow.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskPriceEnd() }}  (Low)</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPriceEnd()"
							v-model="taskPriceEndLow" />
						<div v-if="v$.taskPriceEndLow.$error">
							<div v-if="v$.taskPriceEndLow.required" class="error">
								{{ $messages.fieldLabelTaskPriceEnd() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.taskPriceEndLow.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

                    <div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskPriceStart() }} (High)</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPriceStart()"
							v-model="taskPriceStartHigh" />
						<div v-if="v$.taskPriceStartHigh.$error">
							<div v-if="v$.taskPriceStartHigh.required" class="error">
								{{ $messages.fieldLabelTaskPriceStart() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.taskPriceStartHigh.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskPriceEnd() }} (High)</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskPriceEnd()"
							v-model="taskPriceEndHigh" />
						<div v-if="v$.taskPriceEndHigh.$error">
							<div v-if="v$.taskPriceEndHigh.required" class="error">
								{{ $messages.fieldLabelTaskPriceEnd() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.taskPriceEndHigh.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

                    <div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelSeqHigh() }} (e.g. 1,2,3)</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelSeqHigh()"
							v-model="highSequence" />
                            <div v-if="v$.highSequence.$error">
							<div v-if="v$.highSequence.required" class="error">
								{{ $messages.fieldLabelSeqHigh() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
							
						</div>
					</div>

                    <div class="form-group">
						<label>{{ $messages.fieldLabelColor() }} (e.g. #F4F4F4)</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelColor()"
							v-model="color" />
						<div v-if="v$.color.$error">
							<div v-if="v$.color.required" class="error">
								{{ $messages.fieldLabelColor() }} {{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImage()" v-model="image" :existedImage="mtImage"></cave-image-upload>
					</div>

					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImageBanner()" v-model="banner" :existedImage="mtBannerImage">
						</cave-image-upload>
					</div>

					<!-- sada -->

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskReward() }} (1st {{ $messages.fieldLabelReferral() }}) (%)</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskReward() + ' (1st ' + $messages.fieldLabelReferral() + ')'"
							v-model="mt1stTaskCommission" />
						<div v-if="v$.mt1stTaskCommission.$error">
							<div v-if="v$.mt1stTaskCommission.required" class="error">
								{{ $messages.fieldLabelTaskReward() }} (1st
								{{ $messages.fieldLabelReferral() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mt1stTaskCommission.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskReward() }} (2nd {{ $messages.fieldLabelReferral() }}) (%)</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskReward() + ' (2nd ' + $messages.fieldLabelReferral() + ')'"
							v-model="mt2ndTaskCommission" />
						<div v-if="v$.mt2ndTaskCommission.$error">
							<div v-if="v$.mt2ndTaskCommission.required" class="error">
								{{ $messages.fieldLabelTaskReward() }} (2nd
								{{ $messages.fieldLabelReferral() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mt2ndTaskCommission.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTaskReward() }} (3rd {{ $messages.fieldLabelReferral() }}) (%)</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTaskReward() + ' (3rd ' + $messages.fieldLabelReferral() + ')'"
							v-model="mt3rdTaskCommission" />
						<div v-if="v$.mt3rdTaskCommission.$error">
							<div v-if="v$.mt3rdTaskCommission.required" class="error">
								{{ $messages.fieldLabelTaskReward() }} (3rd
								{{ $messages.fieldLabelReferral() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mt3rdTaskCommission.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTopupReward() }} (1st {{ $messages.fieldLabelReferral() }}) (%)</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTopupReward() + ' (1st ' + $messages.fieldLabelReferral() + ')'"
							v-model="mt1stDepositCommission" />
						<div v-if="v$.mt1stDepositCommission.$error">
							<div v-if="v$.mt1stDepositCommission.required" class="error">
								{{ $messages.fieldLabelTopupReward() }} (1st
								{{ $messages.fieldLabelReferral() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mt1stDepositCommission.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTopupReward() }} (2nd {{ $messages.fieldLabelReferral() }}) (%)</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTopupReward() + ' (2nd ' + $messages.fieldLabelReferral() + ')'"
							v-model="mt2ndDepositCommission" />
						<div v-if="v$.mt2ndDepositCommission.$error">
							<div v-if="v$.mt2ndDepositCommission.required" class="error">
								{{ $messages.fieldLabelTopupReward() }} (2nd
								{{ $messages.fieldLabelReferral() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mt2ndDepositCommission.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelTopupReward() }} (3rd {{ $messages.fieldLabelReferral() }}) (%)</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTopupReward() + ' (3rd ' + $messages.fieldLabelReferral() + ')'"
							v-model="mt3rdDepositCommission" />
						<div v-if="v$.mt3rdDepositCommission.$error">
							<div v-if="v$.mt3rdDepositCommission.required" class="error">
								{{ $messages.fieldLabelTopupReward() }} (3rd
								{{ $messages.fieldLabelReferral() }}){{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.mt3rdDepositCommission.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<cave-switch-checkbox v-model="mtStatus" :text="$messages.labelStatus()" isDisabled="false"></cave-switch-checkbox>
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
import json from "../../infrastructure/json/config.json";

import {
	createInstance,
	createValidatorForLevel1,
	assign,
	mixin as RecordMixin,
} from "./Membership";
import Tabs from "@components/Tabs.vue";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveImageUpload from "@components/CaveImageUpload";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, Tabs, CaveImageUpload },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, required: true },
	},
	data: () => ({
		tabs: [],
		selectedTab: {},
		currency: json.currency,
        isV2: process.env.IS_V2 == "true" ? true : false,
		...createInstance(),
	}),
	validations: {
		...createValidatorForLevel1(),
	},
	async created() {
		await this.getDetail();
	},
	computed: {},
	methods: {
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			this.mtTitle = this.fieldOptionsTitle;
			this.mtDescription = this.fieldOptionsDescription;

			const record = {
				mtId: this.recordId,
				...createInstance(this),
			};

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] =
				await this.$service.membershipService.update(record);

			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				var formData = new FormData();
				formData.append("id", result.content);
				formData.append("image", this.image);
				formData.append("bannerImage", this.banner);
				const [error2, result2] =
					await this.$service.membershipService.uploadImage(formData);

				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "MembershipSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "MembershipSummaryPage" });
		},
		async getDetail() {
			const [error, result] =
				await this.$service.membershipService.getDetail(this.recordId);

			if (error) {
			} else {
				assign(this, result.content);
				this.fieldOptionsTitle = JSON.parse(this.mtTitle);
				this.fieldOptionsDescription = JSON.parse(this.mtDescription);
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
