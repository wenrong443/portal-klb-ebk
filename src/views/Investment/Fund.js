// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.giptCancellationProcessingFeePercent = source.giptCancellationProcessingFeePercent || 0;
    target.giptDailyInterestRate = source.giptDailyInterestRate || 0;
    target.giptDisplayDescriptionLong = source.giptDisplayDescriptionLong || null;
    target.giptDisplayDescriptionShort = source.giptDisplayDescriptionShort || null;
    target.giptDisplayDividendPerShare = source.giptDisplayDividendPerShare || null;
    target.giptDisplayTitle = source.giptDisplayTitle || null;
    target.giptDisplayTotalIssuing = source.giptDisplayTotalIssuing || 0;
    target.giptIncreamentAmount = source.giptIncreamentAmount || 0;
    target.giptInvestmentCycle = source.giptInvestmentCycle || 0;
    target.giptLimitPerAccount = source.giptLimitPerAccount || 0;
    target.giptMaxAmount = source.giptMaxAmount || 0;
    target.giptMinAmount = source.giptMinAmount || 0;
    target.giptProjectScale = source.giptProjectScale || 0;
    target.giptStatus = source.giptStatus || 0;
    target.giptIsReturnModal = source.giptIsReturnModal || 0;
    target.payoutMode = source.payoutMode || "DAILY";
    target.returnModel = source.returnModel || false;
    target.giptId = source.giptId || false;
    target.fieldOptionDisplayDescriptionLongs = source.fieldOptionDisplayDescriptionLongs || false;
    target.fieldOptionDisplayDescriptionShorts = source.fieldOptionDisplayDescriptionShorts || false;
    target.fieldOptionDisplayDividendPerShares = source.fieldOptionDisplayDividendPerShares || false;
    target.fieldOptionDisplayTitles = source.fieldOptionDisplayTitles || false;
    target.image = source.image || null;
    target.giptImageFileName = source.giptImageFileName || null;
    return target;

}

function createValidator() {
    return {
        giptCancellationProcessingFeePercent: { required },
        giptDailyInterestRate: { required },
        fieldOptionDisplayDescriptionLongs: { checkIfSelectAllLanguage },
        fieldOptionDisplayDescriptionShorts: { checkIfSelectAllLanguage },
        fieldOptionDisplayDividendPerShares: { checkIfSelectAllLanguage },
        fieldOptionDisplayTitles: { checkIfSelectAllLanguage },
        giptDisplayTotalIssuing: { required },
        giptIncreamentAmount: { required },
        giptInvestmentCycle: { required },
        giptLimitPerAccount: { required },
        giptMaxAmount: { required },
        giptMinAmount: { required },
        giptProjectScale: { required },
        giptStatus: { required },
        payoutMode: { required },
        returnModel: { required },
        // image: {
		// 	required: requiredIf(function(value){
		// 		return this.giptImageFileName == null ? true : false;
		// 	}),
		// },
    }
}


const checkIfSelectAllLanguage = (value) => {
    if (value) {
        const checkedValue = value.filter(d => !d.value);
        if (checkedValue.length > 0) return false;
    }

    return true;
}
const STATUS_CLASS = {
    1: "badge-success",
    0: "badge-info",
    "-1": "badge-danger",
};

const STATUS = {
    1: "Approved",
    0: "Pending",
    "-1": "Rejected",
};

const RETURN_MODAL = {
    1: "Yes",
    0: "No",
}

const RETURN_MODAL_STATUS = {
    1: "badge-success",
    0: "badge-danger",
}

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        selectedTab: {},
        tabKey: 0,
        tabs: [],
        filter: {
            pageNumber: 0,
            rowPerPage: 0,
        },
        categoryOptions: [],
        languageOptions: [],
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.actStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.actStatus = newValue == false ? 0 : 1;
            }
        },
        returnModels() {
            return [
                { id: false, value: this.$messages.fieldLabelNo() },
                { id: true, value: this.$messages.fieldLabelYes() },
            ];
        },
        payoutModes() {
            return [
                { id: "DAILY", value: this.$messages.fieldLabelDailyDistribute() },
                { id: "WEEKLY", value: this.$messages.fieldLabelWeeklyDistribute() },
                { id: "MONTHLY", value: this.$messages.fieldLabelMonthlyDistribute() },
                { id: "LUMP_SUM", value: this.$messages.fieldLabelLumpSumDistribute() },
                { id: "DAILY_COMPOUND_INTEREST", value: this.$messages.fieldLabelDailyCompoundInterest() },
            ];
        },
        statusOptions() {
            return [
                {
                    id: -99,
                    name: this.$messages.fieldLabelAll(),
                },
                {
                    id: 1,
                    name: this.$messages.labelActive(),
                },
                {
                    id: 0,
                    name: this.$messages.labelSuspend(),
                },
            ];
        },
    },
    async created() {
        await this.getOptionList()
    },
    methods: {
        async getOptionList() {
            const [[, languageOptions]] = await Promise.all([
                this.$service.settingService.getAllLanguage(),
            ]);

            this.languageOptions = languageOptions.content;
        },
    },
    watch: {
        languageOptions() {
            this.fieldOptionDisplayDescriptionLongs = this.languageOptions.map(
                (d) => {
                    return {
                        ltId: d.ltId,
                        value: "",
                    };
                }
            );
            this.fieldOptionDisplayDescriptionShorts = this.languageOptions.map(
                (d) => {
                    return {
                        ltId: d.ltId,
                        value: "",
                    };
                }
            );
            this.fieldOptionDisplayDividendPerShares = this.languageOptions.map(
                (d) => {
                    return {
                        ltId: d.ltId,
                        value: "",
                    };
                }
            );
            this.fieldOptionDisplayTitles = this.languageOptions.map((d) => {
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
    },

};
export {
    createInstance, createValidator, assign, STATUS,
    STATUS_CLASS, mixin, RETURN_MODAL, RETURN_MODAL_STATUS
}