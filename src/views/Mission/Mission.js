import useVuelidate from '@vuelidate/core'
import { required, requiredIf, minLength, maxLength, minValue } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.mitId = source.mitId || 0;
    target.missionTitle = source.missionTitle || null;
    target.missionDescription = source.missionDescription || null;
    target.fieldOptionsTitle = source.fieldOptionsTitle || [];
    target.fieldOptionsDescription = source.fieldOptionsDescription || [];
    target.mitAddInfo1 = source.mitAddInfo1 || "";

    target.mitTitle = source.mitTitle || [];
    target.mitDescription = source.mitDescription || [];
    target.mitType = source.mitType || null;
    target.mitRepeatType = source.mitRepeatType || 1;
    target.mitRewardAmount = source.mitRewardAmount || 0;
    target.mitRewardType = source.mitRewardType || null;
    target.mitStatus = source.mitStatus || 0;
    target.goTo = source.goTo || "DEPOSIT";
    target.packageId = source.packageId || 0;
    target.productId = source.productId || 0;
    target.profitBoost = source.profitBoost || 0;
    target.sameToPromoCode = source.sameToPromoCode || "";
    target.total = source.total || 0;
    target.url = source.url || "";
    target.forActiveMiner = source.forActiveMiner || 0;
    target.priority = source.priority || 0;
    return target;
}

function createValidator() {
    return {
        fieldOptionsTitle: { checkIfSelectAllLanguage },
        fieldOptionsDescription: { checkIfSelectAllLanguage },
        // mitAddInfo1: { minLength: minLength(3), maxLength: maxLength(255) },
        mitType: { required, },
        mitRewardType: { required },
        mitRewardAmount: { required, minValue: minValue(0) },
        mitRepeatType: { required },
        mitStatus: { required },
        goTo: { required },
        packageId: { required: requiredIf((value, vm) => vm.isShowPackageId) },
        productId: { required: requiredIf((value, vm) => vm.isShowProductId) },
        profitBoost: { required: requiredIf((value, vm) => vm.isShowProfitBoost) },
        sameToPromoCode: { required: requiredIf((value, vm) => vm.isShowSameToPromoCode) },
        total: { required: requiredIf((value, vm) => vm.isShowTotal) },
        url: { required: requiredIf((value, vm) => vm.isShowUrl) },
        priority: { required, minValue: minValue(0) },
    }
}

const checkIfSelectAllLanguage = (value) => {
    if (value) {
        const checkedValue = value.filter(d => !d.value);
        if (checkedValue.length > 0) return false;
    }

    return true;
}
import json from "@/infrastructure/json/config.json";

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        selectedTab: {},
        tabKey: 0,
        tabs: [],
        currency: json.currency,
        languageOptions: [],
        missionTypes: [
            { id: "BROWSE_URL", value: "fieldLabelBrowseSpecificURL" },
            { id: "DEPOSIT", value: "labelDeposit" },
            { id: "WITHDRAW", value: "labelWithdraw" },
            { id: "SHARE_INVITE_FRIEND_LINK", value: "fieldLabelShareInvitationURL" },
            { id: "SUCCESS_INVITE_FRIEND", value: "fieldLabelSuccessInviteNewUser" },
            { id: "BIND_EMAIL_ADDRESS", value: "fieldLabelMissionTypeBindEmailAddress" },
            { id: "RECOMMENDED_FRIEND_PURCHASE_MINE", value: "fieldLabelMissionTypeRecommendedFriendPurchaseMine" },
            { id: "MVP", value: "fieldLabelMissionTypeMvp" },
            { id: "DREAM_TEAM", value: "fieldLabelMissionTypeDreamTeam" },
            { id: "COMPLETED", value: "fieldLabelMissionTypeCompleted" },
        ],
        rewardTypes: [
            { id: "CASH", value: "fieldLabelRewardTypeCash" },
            { id: "PERCENT", value: "fieldLabelRewardTypePercentage" },
            { id: "PROFIT_BOOST", value: "fieldLabelRewardTypeProfitBoost" },
            { id: "PROMO_CODE", value: "fieldLabelRewardTypePromoCode" },
        ],
        repeatTypes: [
            { id: 1, value: "fieldLabelShowOnceOnly" },
            { id: 2, value: "labelRepeatReset" }
        ],
        goToOptions: [],
        productOptions: [{ gmptId: 0, gmptShortCode: "All" }],
        packageOptions: [{ gmpaatId: 0, title: "All", gmpaatGmptShortCode: "-" }]
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.mitStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.mitStatus = newValue == false ? 0 : 1;
            }
        },
        isShowUrl() {
            return this.mitType == "BROWSE_URL";
        },
        isShowProductId() {
            return this.mitType == "RECOMMENDED_FRIEND_PURCHASE_MINE";
        },
        isShowPackageId() {
            return this.mitType == "RECOMMENDED_FRIEND_PURCHASE_MINE";
        },
        isShowProfitBoost() {
            return this.mitRewardType == "PROFIT_BOOST";
        },
        isShowSameToPromoCode() {
            return this.mitRewardType == "PROMO_CODE";
        },
        isShowTotal() {
            const mitTypes = [
                "SUCCESS_INVITE_FRIEND",
                "RECOMMENDED_FRIEND_PURCHASE_MINE",
                "DREAM_TEAM",
                "MVP",
            ];
            return mitTypes.includes(this.mitType);
        },
    },
    async created() {
        await this.getLanguageOptions();
        await this.getOptionList();
    },
    methods: {
        async getLanguageOptions() {
            const [error, result] =
                await this.$service.settingService.getAllLanguage();
            this.languageOptions = result.content;
            this.selectedLanguage = this.languageOptions[0].id;
        },
        async getOptionList() {
            const [[, productOptions], [, packageOptions]] = await Promise.all([
                this.$service.mineProductService.getAll(
                    {
                        gmptShortCode: "",
                        gmptStatus: -99,
                        paginationDAO: {
                            pageNumber: 0,
                            rowPerPage: 0,
                        },
                        sort: {
                            sortBy: "gmptId",
                            sortDirection: "ASC",
                        },
                    }
                ),
                this.$service.minePackageService.getAll(
                    {
                        gmpaatGmptId: -99,
                        gmpaatStatus: -99,
                        paginationDAO: {
                            pageNumber: 0,
                            rowPerPage: 0,
                        },
                        sort: {
                            sortBy: "gmpaatId",
                            sortDirection: "ASC",
                        },
                    }
                )
            ]);

            this.productOptions = [
                ...this.productOptions,
                ...productOptions.content
            ];
            this.packageOptions = [
                ...this.packageOptions,
                ...packageOptions.content
            ];
        },
        cancel() {
            this.$router.push({ name: "MissionSummaryPage" });
        },
    },
    watch: {
        languageOptions() {
            this.fieldOptionsTitle = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionsDescription = this.languageOptions.map((d) => {
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
        mitType() {
            switch (this.mitType) {
                case "DEPOSIT":
                case "WITHDRAW":
                    this.rewardTypes = [
                        { id: "CASH", value: "fieldLabelRewardTypeCash" },
                        { id: "PERCENT", value: "fieldLabelRewardTypePercentage" },
                        { id: "PROFIT_BOOST", value: "fieldLabelRewardTypeProfitBoost" },
                        { id: "PROMO_CODE", value: "fieldLabelRewardTypePromoCode" },
                    ];
                    break;
                default:
                    this.rewardTypes = this.rewardTypes.filter((d) => d.id != "PERCENT");
                    break;
            }
        },
        mitRewardType() {
            switch (this.mitRewardType) {
                case "CASH":
                case "PERCENT":
                    this.goToOptions = [
                        {
                            id: "DEPOSIT",
                            value: "fieldLabelMissionGoToDeposit",
                        },
                        {
                            id: "WITHDRAW",
                            value: "fieldLabelMissionGoToWithdraw",
                        },
                    ];
                    break;
                case "PROFIT_BOOST":
                    this.goToOptions = [
                        { id: "PROFIT_BOOST", value: "fieldLabelMissionGoToProfitBoost" },
                    ];
                    break;
                case "PROMO_CODE":
                    this.goToOptions = [
                        { id: "PROMO_CODE", value: "fieldLabelMissionGoToPromoCode" },
                    ];
                    break;
            }
        },
    },
};
export { createInstance, createValidator, assign, mixin }