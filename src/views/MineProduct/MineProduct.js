// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.gmptCanSubscribeMultiplePackage = source.gmptCanSubscribeMultiplePackage || 0;
    target.gmptStatus = source.gmptStatus || 0;
    target.gmptDisplayDescriptionLong = source.gmptDisplayDescriptionLong || null;
    target.gmptDisplayDescriptionShort = source.gmptDisplayDescriptionShort || null;
    target.gmptDisplayTitle = source.gmptDisplayTitle || null;
    target.gmptShortCode = source.gmptShortCode || null;
    target.gmptMaxExchange = source.gmptMaxExchange || 0;
    target.gmptMinExchange = source.gmptMinExchange || 0;
    target.gmptId = source.gmptId || false;
    target.fieldOptionDisplayDescriptionLongs = source.fieldOptionDisplayDescriptionLongs || false;
    target.fieldOptionDisplayDescriptionShorts = source.fieldOptionDisplayDescriptionShorts || false;
    target.fieldOptionDisplayTitles = source.fieldOptionDisplayTitles || false;
    target.image = source.image || null;
    target.image2 = source.image2 || null;
    target.gmptImageFileName = source.gmptImageFileName || null;
    target.gmptExchangeable = source.gmptExchangeable || 0;
    target.imageForBanner = source.imageForBanner || null;
    target.fromColor = source.fromColor || null;
    target.toColor = source.toColor || null;
    target.contentColorFrom = source.contentColorFrom || null;
    target.contentColorTo = source.contentColorTo || null;
    return target;

}

function createValidator() {
    return {
        gmptCanSubscribeMultiplePackage: { required },
        gmptStatus: { required },
        fieldOptionDisplayDescriptionLongs: { checkIfSelectAllLanguage },
        fieldOptionDisplayDescriptionShorts: { checkIfSelectAllLanguage },
        fieldOptionDisplayTitles: { checkIfSelectAllLanguage },
        gmptShortCode: { required },
        gmptMaxExchange: { required },
        gmptMinExchange: { required },
        fromColor: { required },
        toColor: { required },
        contentColorFrom: { required },
        contentColorTo: {required },
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