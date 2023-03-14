// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, minValue } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.dtId = source.dtId || 0;
    target.membershipTitle = source.membershipTitle || null;
    target.membershipDescription = source.membershipDescription || null;
    target.fieldOptionsTitle = source.fieldOptionsTitle || [];
    target.fieldOptionsDescription = source.fieldOptionsDescription || [];
    target.mtTitle = source.mtTitle || [];
    target.mtDescription = source.mtDescription || [];
    target.mtLevel = source.mtLevel || 0;
    target.mtPrice = source.mtPrice || 0.0;
    target.mtTotalTask = source.mtTotalTask || 0;
    target.color = source.color || null;

    if (process.env.IS_V2 == 'true'){
        target.taskPriceStartLow = source.taskPriceStartLow || 0.0;
        target.taskPriceEndLow = source.taskPriceEndLow || 0.0;
        target.taskPriceStartHigh = source.taskPriceStartHigh || 0.0;
        target.taskPriceEndHigh = source.taskPriceEndHigh || 0.0;
        target.highSequence = source.highSequence || "";
    }else{
        target.taskPriceStart = source.taskPriceStart || 0.0;
        target.taskPriceEnd = source.taskPriceEnd || 0.0;
    }
    

    target.mtMinWithdraw = source.mtMinWithdraw || 0.0;
    target.mtMaxWithdraw = source.mtMaxWithdraw || 0.0;
    target.mtMaxWithdrawPerDay = source.mtMaxWithdrawPerDay || 0;
    target.mtCommissionPercent = source.mtCommissionPercent || 0.0;
    target.mtMinLeftAtWallet = source.mtMinLeftAtWallet || 0.0;
    target.mtUpgradeDiscount = source.mtUpgradeDiscount || 0.0;

    target.mtImage = source.mtImage || null;
    target.mtBannerImage = source.mtBannerImage || null;
    target.mtValidity = source.mtValidity || 0;

    if (process.env.IS_V2 == 'true') {
        target.mt1stTaskCommission = source.mt1stTaskCommission || 0.0;
        target.mt2ndTaskCommission = source.mt2ndTaskCommission || 0.0;
        target.mt3rdTaskCommission = source.mt3rdTaskCommission || 0.0;
        target.mt1stDepositCommission = source.mt1stDepositCommission || 0.0;
        target.mt2ndDepositCommission = source.mt2ndDepositCommission || 0.0;
        target.mt3rdDepositCommission = source.mt3rdDepositCommission || 0.0;
    }

    target.mtStatus = source.mtStatus || 0;

    return target;
}

function createValidator() {

    if (process.env.IS_V2 == 'true') {
        return {
            fieldOptionsTitle: { checkIfSelectAllLanguage },
            fieldOptionsDescription: { checkIfSelectAllLanguage },
            mtLevel: { required, minValue: minValue(1) },
            mtPrice: { required, minValue: minValue(1) },
            // mtRewardPerTask: { required, minValue: minValue(1)},
            mtTotalTask: { required, minValue: minValue(1) },

            mtCommissionPercent: { required, minValue: minValue(0) },
            mtMaxWithdraw: { required, minValue: minValue(0) },
            mtMaxWithdrawPerDay: { required, minValue: minValue(0) },
            mtMinLeftAtWallet: { required, minValue: minValue(0) },
            mtMinWithdraw: { required, minValue: minValue(0) },
            mtUpgradeDiscount: { required, minValue: minValue(0) },
            mtValidity: { required, minValue: minValue(0) },
            color: { required },
            taskPriceStartLow: { required, minValue: minValue(0) },
            taskPriceEndLow: { required, minValue: minValue(0) },
            taskPriceStartHigh: { required, minValue: minValue(0) },
            taskPriceEndHigh: { required, minValue: minValue(0) },
            highSequence: { required,},

            mt1stTaskCommission: { required, minValue: minValue(0) },
            mt2ndTaskCommission: { required, minValue: minValue(0) },
            mt3rdTaskCommission: { required, minValue: minValue(0) },
            mt1stDepositCommission: { required, minValue: minValue(0) },
            mt2ndDepositCommission: { required, minValue: minValue(0) },
            mt3rdDepositCommission: { required, minValue: minValue(0) },
            // mtStatus: { required }
        }
    } else {
        return {
            fieldOptionsTitle: { checkIfSelectAllLanguage },
            fieldOptionsDescription: { checkIfSelectAllLanguage },
            mtLevel: { required, minValue: minValue(1) },
            mtPrice: { required, minValue: minValue(1) },
            // mtRewardPerTask: { required, minValue: minValue(1)},
            mtTotalTask: { required, minValue: minValue(1) },

            mtCommissionPercent: { required, minValue: minValue(0) },
            mtMaxWithdraw: { required, minValue: minValue(0) },
            mtMaxWithdrawPerDay: { required, minValue: minValue(0) },
            mtMinLeftAtWallet: { required, minValue: minValue(0) },
            mtMinWithdraw: { required, minValue: minValue(0) },
            mtUpgradeDiscount: { required, minValue: minValue(0) },
            mtValidity: { required, minValue: minValue(0) },
            color: { required },
            taskPriceStart: { required, minValue: minValue(0) },
            taskPriceEnd: { required, minValue: minValue(0) },

            // mt1stTaskReward: { required, minValue: minValue(0)},
            // mt2ndTaskReward: { required, minValue: minValue(0)},
            // mt3rdTaskReward: { required, minValue: minValue(0)},
            // mt1stTopupReward: { required, minValue: minValue(0)},
            // mt2ndTopupReward: { required, minValue: minValue(0)},
            // mt3rdTopupReward: { required, minValue: minValue(0)},
            // mtStatus: { required }
        }
    }

}


function createValidatorForLevel1() {
    if (process.env.IS_V2 == 'true') {
        return {
            fieldOptionsTitle: { checkIfSelectAllLanguage },
            fieldOptionsDescription: { checkIfSelectAllLanguage },
            // mtRewardPerTask: { required, minValue: minValue(1)},
            mtTotalTask: { required, minValue: minValue(1) },
            mtCommissionPercent: { required, minValue: minValue(0) },
            mtMaxWithdraw: { required, minValue: minValue(0) },
            mtMaxWithdrawPerDay: { required, minValue: minValue(0) },
            mtMinLeftAtWallet: { required, minValue: minValue(0) },
            mtMinWithdraw: { required, minValue: minValue(0) },
            mtUpgradeDiscount: { required, minValue: minValue(0) },
            mtValidity: { required, minValue: minValue(0) },
            color: { required },
            taskPriceStartLow: { required, minValue: minValue(0) },
            taskPriceEndLow: { required, minValue: minValue(0) },
            taskPriceStartHigh: { required, minValue: minValue(0) },
            taskPriceEndHigh: { required, minValue: minValue(0) },
            highSequence: { required,},
            mt1stTaskCommission: { required, minValue: minValue(0) },
            mt2ndTaskCommission: { required, minValue: minValue(0) },
            mt3rdTaskCommission: { required, minValue: minValue(0) },
            mt1stDepositCommission: { required, minValue: minValue(0) },
            mt2ndDepositCommission: { required, minValue: minValue(0) },
            mt3rdDepositCommission: { required, minValue: minValue(0) },
            mtStatus: { required }
        }
    } else {
        return {
            fieldOptionsTitle: { checkIfSelectAllLanguage },
            fieldOptionsDescription: { checkIfSelectAllLanguage },
            // mtRewardPerTask: { required, minValue: minValue(1)},
            mtTotalTask: { required, minValue: minValue(1) },
            mtCommissionPercent: { required, minValue: minValue(0) },
            mtMaxWithdraw: { required, minValue: minValue(0) },
            mtMaxWithdrawPerDay: { required, minValue: minValue(0) },
            mtMinLeftAtWallet: { required, minValue: minValue(0) },
            mtMinWithdraw: { required, minValue: minValue(0) },
            mtUpgradeDiscount: { required, minValue: minValue(0) },
            mtValidity: { required, minValue: minValue(0) },
            color: { required },
            taskPriceStart: { required, minValue: minValue(0) },
            taskPriceEnd: { required, minValue: minValue(0) },
            // mt1stTaskReward: { required, minValue: minValue(0)},
            // mt2ndTaskReward: { required, minValue: minValue(0)},
            // mt3rdTaskReward: { required, minValue: minValue(0)},
            // mt1stTopupReward: { required, minValue: minValue(0)},
            // mt2ndTopupReward: { required, minValue: minValue(0)},
            // mt3rdTopupReward: { required, minValue: minValue(0)},
            mtStatus: { required }
        }
    }

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
        return { v$: useVuelidate() }
    },
    data: () => ({
        languageOptions: [],
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.mtStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.mtStatus = newValue == false ? 0 : 1;
            }
        }
    },
    async created() {
        await this.getOptionList();

    },
    methods: {
        async getOptionList() {
            const [[, languageOptions]] = await Promise.all([
                this.$service.settingService.getAllLanguage(),
            ]);

            this.languageOptions = languageOptions.content;
        },
    },

};
export { createInstance, createValidator, createValidatorForLevel1, assign, mixin }