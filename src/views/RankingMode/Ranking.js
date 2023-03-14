import useVuelidate from "@vuelidate/core";
import {
    required,
} from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.rmtId = source.rmtId || null;
    target.fieldOptionsTitle = source.fieldOptionsTitle || [];
    target.fieldOptionsDescription = source.fieldOptionsDescription || [];
    target.rmtDescription = source.rmtDescription || null;
    target.fieldOptionsUnit = source.fieldOptionsUnit || [];
    target.rmtParam1 = source.rmtParam1 || null;
    target.rmtTitle = source.rmtTitle || null;
    target.rmtEnd = source.rmtEnd || null;
    target.rmtMode = source.rmtMode || null;
    target.rmtStart = source.rmtStart || null;
    target.rmtStatus = source.rmtStatus || 1;
    return target;
}

function createValidator() {
    return {
        fieldOptionsTitle: { checkIfSelectAllLanguage },
        fieldOptionsDescription: { checkIfSelectAllLanguage },
        fieldOptionsUnit: { checkIfSelectAllLanguage },
        rmtEnd: { required },
        rmtMode: { required },
        rmtStart: { required },
        rmtStatus: { required },
    };
}

const checkIfSelectAllLanguage = (value) => {
    if (value) {
        const checkedValue = value.filter(d => !d.value);
        if (checkedValue.length > 0) return false;
    }

    return true;
}

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        languageOptions: [],
        departmentOptions: [],
        modeOptions: [
            {
                id: "INVITE_FRIEND",
                value: "labelRankingModeInviteFriend",
            }, {
                id: "PURCHASE_MINE_TIER_1",
                value: "labelRankingModePurchaseMineTier1",
            }, {
                id: "PURCHASE_MINE_TIER_3",
                value: "labelRankingModePurchaseMineTier3",
            },

            {
                id: "DEPOSIT_AMOUNT_TIER_1",
                value: "labelRankingModeDepositAmountTier1",
            },
            {
                id: "DEPOSIT_AMOUNT_TIER_3",
                value: "labelRankingModeDepositAmountTier3",
            },
            {
                id: "DEPOSIT_PAX_TIER_1",
                value: "labelRankingModeDepositPaxTier1",
            },
            {
                id: "DEPOSIT_PAX_TIER_3",
                value: "labelRankingModeDepositPaxTier3",
            },
            {
                id: "UPGRADE_PAX_TIER_1",
                value: "labelRankingModeUpgradePaxTier1",
            },
            {
                id: "UPGRADE_PAX_TIER_3",
                value: "labelRankingModeUpgradePaxTier3",
            },
            {
                id: "GIFT_CARD_PAX_TIER_1",
                value: "labelRankingModeGiftCardPaxTier1",
            },
            {
                id: "GIFT_CARD_PAX_TIER_3",
                value: "labelRankingModeGiftCardPaxTier3",
            },
            {
                id: "GIFT_CARD_AMOUNT_TIER_1",
                value: "labelRankingModeGiftCardAmountTier1",
            },
            {
                id: "GIFT_CARD_AMOUNT_TIER_3",
                value: "labelRankingModeGiftCardAmountTier3",
            },

        ],
        statusOptions: [
            {
                id: -99,
                name: "fieldLabelAll",
            },
            {
                id: 1,
                name: "labelActive",
            },
            {
                id: 0,
                name: "labelSuspend",
            },
        ],
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.drdtStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.drdtStatus = newValue == false ? 0 : 1;
            },
        },
    },
    async created() {
    },
    methods: {
        async getLanguageOptions() {
            const [error, result] =
                await this.$service.settingService.getAllLanguage();
            this.languageOptions = result.content;
            this.selectedLanguage = this.languageOptions[0].id;
        },
    },
};
export { createInstance, createValidator, assign, mixin };
