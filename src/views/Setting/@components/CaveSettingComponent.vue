<template>
	<div class="cave__component-setting">
		<label class="cave__component-setting-title">{{formattedTitle}}</label>
		<div v-if="booleanType">
			<select :value="setting" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)">
				<option v-bind:value="true">{{ $messages.fieldLabelYes() }}</option>
				<option v-bind:value="false">{{ $messages.fieldLabelNo() }}</option>
			</select>
		</div>
		<div v-if="integerType">
			<input :value="setting" type="number" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)" />
		</div>
		<div v-if="textType">
			<input :value="setting" type="text" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)" />
		</div>
		<div v-if="doubleType">
			<input :value="setting" type="number" step="0.01" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)" />
		</div>
		<div v-if="enumType">
			<select :value="setting" class="form-control" :disabled="!read" @input="updateSetting($event.target.value)">
				<option v-bind:value="enumOption.id" v-for="enumOption in enumOptions" v-bind:key="enumOption.id">{{enumOption.value}}</option>
			</select>
		</div>
		<div v-if="urlType">
			<input :value="setting" type="url" class="form-control" :disabled="!read" @change="urlValidator($event.target.value)"
				@input="updateSetting($event.target.value)" />
			<span v-if="!isUrlValid" class="error">URL no valid</span>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import json from "../../../infrastructure/json/config.json";

export default {
	name: "CaveSwitchCheckbox",
	setup(props, { emit }) {
		let isUrlValid = ref(true);
		const updateSetting = (value) => {
			console.log(value);
			emit("update:setting", value);
		};

		const urlValidator = (value) => {
			var expression =
				/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
			var regex = new RegExp(expression);
			isUrlValid.value = value.match(regex) ? true : false;
			emit("update:validation", isUrlValid);
		};

		return { updateSetting, urlValidator, isUrlValid };
	},
	components: {},
	props: {
		setting: { required: false },
		title: { type: String, required: false, default: "TEXT bos" },
		description: { type: String, required: false, default: "TEXT Box" },
		type: { type: String, required: false, default: "text" },
		read: { type: Boolean, required: false, default: false },
		validation: { type: Boolean, required: false, default: false },
	},
	computed: {
		formattedTitle() {
			switch (this.title) {
				case "ADMIN_LOGIN_IP_FILTERING":
					return this.$messages.fieldLabelAdminPortalIPFiltering();
				case "SERVICE_HOTLINE_URL":
					return this.$messages.fieldLabelServiceHotlineURL();
				case "TOPUP_HOTLINE_URL":
					return this.$messages.fieldLabelTopupHotlineURL();
				case "FIRST_TIME_MIN_WITHDRAW":
					return (
						this.$messages.fieldLabelFirstTimeMinWithdraw() +
						" (" +
						json.currency +
						")"
					);
				case "FIRST_TIME_MAX_WITHDRAW":
					return (
						this.$messages.fieldLabelFirstTimeMaxWithdraw() +
						" (" +
						json.currency +
						")"
					);
				case "MIN_WITHDRAW":
					return (
						this.$messages.fieldLabelMinWithdraw() +
						" (" +
						json.currency +
						")"
					);
				case "MAX_WITHDRAW":
					return (
						this.$messages.fieldLabelMaxWithdraw() +
						" (" +
						json.currency +
						")"
					);
				case "WITHDRAW_PROCESSING_FEE":
					return (
						this.$messages.fieldLabelWithdrawProcessingFee() +
						" (" +
						json.currency +
						")"
					);
				case "MAX_WITHDRAW_PER_WEEK":
					return this.$messages.fieldLabelWithdrawLimitPerWeek();
				case "TASK_LS_APPROVAL_MODE":
					return this.$messages.fieldLabelGameLSApprovalMode();
				case "TASK_LS_STORE_TASK_IMAGE":
					return this.$messages.fieldLabelGameLSStoreTaskImageMode();
				case "DAILY_CHECK_IN_REWARDS":
					return (
						this.$messages.fieldLabelDailyCheckInReward() +
						" (" +
						json.currency +
						")"
					);
				case "REGISTER_FREE_CASH":
					return (
						this.$messages.fieldLabelRegisterFreeCash() +
						" (" +
						json.currency +
						")"
					);
				case "MIN_TOPUP_TO_REFRESH_REVIEW_TASK":
					return (
						this.$messages.fieldLabelMinTopupToRefreshTask() +
						" (" +
						json.currency +
						")"
					);
				case "INVESTMENT_L1_FIRST_INVEST_REWARD":
					return (
						this.$messages.fieldLabelGameInvestFirstInvestReward() +
						" (1st) (%)"
					);
				case "INVESTMENT_L2_FIRST_INVEST_REWARD":
					return (
						this.$messages.fieldLabelGameInvestFirstInvestReward() +
						" (2nd) (%)"
					);
				case "INVESTMENT_L3_FIRST_INVEST_REWARD":
					return (
						this.$messages.fieldLabelGameInvestFirstInvestReward() +
						" (3rd) (%)"
					);
				case "INVESTMENT_L1_FIRST_INVEST_INTEREST_REWARD":
					return (
						this.$messages.fieldLabelGameInvestFirstInvestInterestReward() +
						" (1st) (%)"
					);
				case "INVESTMENT_L2_FIRST_INVEST_INTEREST_REWARD":
					return (
						this.$messages.fieldLabelGameInvestFirstInvestInterestReward() +
						" (2nd) (%)"
					);
				case "INVESTMENT_L3_FIRST_INVEST_INTEREST_REWARD":
					return (
						this.$messages.fieldLabelGameInvestFirstInvestInterestReward() +
						" (3rd) (%)"
					);
				case "MINE_L1_FIRST_INVEST_REWARD":
					return (
						this.$messages.fieldLabelGameMineFirstInvestReward() +
						" (1st) (%)"
					);
				case "MINE_L2_FIRST_INVEST_REWARD":
					return (
						this.$messages.fieldLabelGameMineFirstInvestReward() +
						" (2nd) (%)"
					);
				case "MINE_L3_FIRST_INVEST_REWARD":
					return (
						this.$messages.fieldLabelGameMineFirstInvestReward() +
						" (3rd) (%)"
					);
				case "MINE_L1_FIRST_INVEST_INTEREST_REWARD":
					return (
						this.$messages.fieldLabelGameMineFirstInvestInterestReward() +
						" (1st) (%)"
					);
				case "MINE_L2_FIRST_INVEST_INTEREST_REWARD":
					return (
						this.$messages.fieldLabelGameMineFirstInvestInterestReward() +
						" (2nd) (%)"
					);
				case "MINE_L3_FIRST_INVEST_INTEREST_REWARD":
					return (
						this.$messages.fieldLabelGameMineFirstInvestInterestReward() +
						" (3rd) (%)"
					);
				case "WEBSITE_TITLE":
					return this.$messages.labelWebsiteTitle();
				case "WEBSITE_LOGO":
					return this.$messages.labelWebsiteLogo();
				case "ONHOLD_MESSAGE":
					return this.$messages.labelReviewOnHoldMessage();
				case "SEARCH_LINK":
					return this.$messages.labelReviewSearchLink();
				case "DELUXE_INCENTIVE_X":
					return this.$messages.labelReviewDeluxeBoost();
				case "ROYAL_INCENTIVE_X":
					return this.$messages.labelReviewRoyalBoost();
				case "MIN_TASK_COMPLETED_BEFORE_WITHDRAW":
					return this.$messages.labelReviewTaskCompleteBeforeWithdraw();
				case "TASK_REVIEW_APPROVAL_MODE":
					return this.$messages.labelReviewTaskApprovalMode();
				case "WITHDRAW_TIME_START":
					return this.$messages.labelWithdrawStartTime();
				case "WITHDRAW_TIME_END":
					return this.$messages.labelWithdrawEndTime();
				case "GET_TASK_TIME_START":
					return this.$messages.labelGetTaskStartTime();
				case "GET_TASK_TIME_END":
					return this.$messages.labelGetTaskEndTime();
                    case "BUTTON_COLOR_1":
					return this.$messages.labelButtonColor() + " (1) (e.g. primary button - gradient)";
                    case "BUTTON_COLOR_2":
					return this.$messages.labelButtonColor() + " (2) (e.g. secondary button)";
                    case "BUTTON_COLOR_3":
					return this.$messages.labelButtonColor() + " (3) (e.g. primary button - dialog)";
                    case "BUTTON_COLOR_4":
					return this.$messages.labelButtonColor() + " (4)";
                    case "BUTTON_COLOR_5":
					return this.$messages.labelButtonColor() + " (5)";
			}
			return "Unknow - " + this.title;
		},
		booleanType() {
			return this.type == "boolean";
		},
		doubleType() {
			return this.type == "double";
		},
		enumType() {
			return this.type == "enum";
		},
		urlType() {
			return this.type == "url";
		},
		integerType() {
			return this.type == "int";
		},
		textType() {
			return this.type == "text";
		},
		enumOptions() {
			return [
				{
					id: "AUTO_APPROVE_IMMEDIATELY",
					value: this.$messages.fieldLabelAutoApproveImmediately(),
				},
				{
					id: "AUTO_APPROVE_AFTER_1_HOURS",
					value: this.$messages.fieldLabelAutoApproveAfter1Hour(),
				},
				{
					id: "APPROVE_MANUALLY",
					value: this.$messages.fieldLabelApproveManually(),
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped>
.cave__component-setting {
	display: grid;
	grid-template-columns: 300px auto;
	border-top: 1px solid #ddd;
	padding: 18px 0px;

	.cave__component-setting-title {
		text-transform: capitalize;
	}
	.cave__component-setting-description {
		font-size: 10px;
		text-transform: capitalize;
	}

	label {
		font-size: 14px;
	}
}
</style>