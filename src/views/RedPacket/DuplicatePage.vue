<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelRedPacketAddTitle() }}
					</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey"
							v-if="tabs.length > 0"></tabs>
						<div class v-for="fieldOption in fieldOptionsTitle" v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group" v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelTitle() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRedPacketTitle()"
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
								<label>{{ $messages.fieldLabelRedPacketDescription() }}</label>
								<cave-advanced-text-area v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsDescription.$error">
							<div v-if="v$.fieldOptionsDescription.checkIfSelectAllLanguage" class="error">
								{{ $messages.fieldLabelRedPacketDescription() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<cave-date-time-picker :label="$messages.fieldLabelRankingModeStartDate()" v-model="rptStart">
						</cave-date-time-picker>
						<div v-if="v$.rptStart.$error">
							<div v-if="v$.rptStart.required" class="error">
								{{ $messages.fieldLabelRedPacketStartDate() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<cave-date-time-picker :label="$messages.fieldLabelRankingModeEndDate()" v-model="rptEnd">
						</cave-date-time-picker>
						<div v-if="v$.rptEnd.$error">
							<div v-if="v$.rptEnd.required" class="error">
								{{ $messages.fieldLabelRedPacketEndDate() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<cave-switch-checkbox v-model="rptStatus" :text="$messages.fieldLabelRedPacketStatus()">
					</cave-switch-checkbox>
					<cave-switch-checkbox v-model="rptExcludePurchaseOnce"
						:text="$messages.fieldLabelRedPacketExcludePurchaseOnce()">
					</cave-switch-checkbox>
					<cave-switch-checkbox v-model="rptToDeposit" :text="$messages.fieldLabelRedPacketDeposit()"></cave-switch-checkbox>
                    <cave-switch-checkbox v-model="rptShowEveryPage" :text="$messages.fieldLabelRedPacketShowAtEveryPage()"></cave-switch-checkbox>
					<div class="form-group">
						<label>{{ $messages.fieldLabelRedPacketMaxPerUser() }}</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRedPacketMaxPerUser()"
							v-model="rptMaxPerUser" />
					</div>
					<red-packet-sub ref="redPacketSub" :records="redPacketSubDAOList" :key="redPacketSubComponentKey" :productList="productList">
					</red-packet-sub>
					<div v-if="isShowNestedListError">
						<div class="error">
							{{ $messages.fieldLabelRedPacketSub() }}{{ $messages.fieldLabelIsRequired() }}
						</div>
					</div>
					<cave-image-upload v-model="image" :existedImage="rptImageLocation" :title="$messages.fieldLabelRedPacketImage()"
						@deleteExistedImage="deleteExistedImage" />
					<div v-if="v$.image.$error">
						<div v-if="v$.image.checkIfImageRequired" class="error">
							{{ $messages.fieldLabelRedPacketImage() }}{{ $messages.fieldLabelIsRequired() }}
						</div>
					</div>
                    <cave-image-upload v-model="animationImage" :existedImage="rptAnimationLocation"
						@deleteExistedImage="deleteExistedAnimation" :title="$messages.fieldLabelRedPacketAnimationImage()" />
					<div v-if="v$.animationImage.$error">
						<div v-if="v$.animationImage.checkIfAnimationImageRequired" class="error">
							{{ $messages.fieldLabelRedPacketAnimationImage() }}{{ $messages.fieldLabelIsRequired() }}
						</div>
					</div>
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
					<p>Discovere how a title would help to make the post
						attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveDateTimePicker from "@components/CaveDateTimePicker";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import Tabs from "@components/Tabs.vue";
import RedPacketSub from "./@components/RedPacketSub.vue";
import {
	formatToDateTime,
	formatToDateTimePicker,
} from "seedwork/dateFormatter";
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./RedPacket";
import useVuelidate from "@vuelidate/core";
import CaveImageUpload from "@components/CaveImageUpload.vue";

export default {
	name: "RankingAddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: {
		CaveAdvancedTextArea,
		CaveSwitchCheckbox,
		Tabs,
		RedPacketSub,
		CaveDateTimePicker,
		CaveImageUpload,
	},
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, required: true },
	},
	data: () => ({
		selectedTab: {},
		isShowNestedListError: false,
		tabs: [],
        productList: [],
		redPacketSubComponentKey: 0,
		isShowExistedImage: true,
		...createInstance(),
	}),
	validations: {
		...createValidator(true),
	},
	async created() {
		this.setLoading();
		await this.getLanguageOptions();
		await this.get();
        const [error, result] =
			await this.$service.mineProductService.getAll2();
		if (error) {
			this.showError(error);
		} else {
			// this.productList = result.content;

            this.productList = [
                {
					gmptId: -1,
					gmptShortCode: "PROMO",
				},
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
		this.setCompleted();
	},
	methods: {
        cancel() {
			history.back();
		},
		async get() {
			const [error, result] = await this.$service.redPacketService.get(
				this.recordId
			);
			if (error) {
				this.showError(error);
			} else {
				assign(this, result.content);
				this.fieldOptionsTitle = JSON.parse(result.content.rptTitle);
				this.fieldOptionsDescription = JSON.parse(
					result.content.rptDescription
				);
				this.rptStart = formatToDateTimePicker(this.rptStart);
				this.rptEnd = formatToDateTimePicker(this.rptEnd);
				this.redPacketSubDAOList = result.content.redPacketPrizeBeanList;
				this.redPacketSubComponentKey++;
                this.deleteExistedImage();
                this.deleteExistedAnimation();
			}
		},
		async save() {
			this.v$.$touch();

			this.redPacketSubDAOList = this.$refs.redPacketSub.updatedRecords;

			if (this.redPacketSubDAOList.length <= 0) {
				this.isShowNestedListError = true;
			}

			if (this.v$.$invalid) {
				return;
			}

			this.isShowNestedListError = false;
			this.rptStart = formatToDateTime(this.rptStart);

			this.rptEnd = formatToDateTime(this.rptEnd);
			this.rptTitle = this.fieldOptionsTitle;
			this.rptDescription = this.fieldOptionsDescription;

			const record = {
				...createInstance(this),
			};
			this.setLoading();
			const [error, result] = await this.$service.redPacketService.add(
				record
			);
			if (error) {
				this.showError(error);
			} else {
				await this.uploadImage(result.content);
			}
		},
		deleteExistedImage() {
			this.rptImageLocation = null;
		},
        deleteExistedAnimation() {
            this.rptAnimationLocation = null;
        }
	},
};
</script>
