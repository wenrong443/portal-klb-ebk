// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.productTitle = source.productTitle || null;
    target.packageTitle = source.packageTitle || null;
    target.gmpaatCanPurchaseMultiple = source.gmptCanSubscribeMultiplePackage || 0;
    target.gmpaatDisplayTitle = source.gmpaatDisplayTitle || null;
    target.gmpaatDisplayDescription = source.gmpaatDisplayDescription || null;
    target.gmpaatStatus = source.gmpaatStatus || 0;
    target.gmpaatPackagePrice = source.gmpaatPackagePrice || 0;
    target.gmpaatRewardPerDay = source.gmpaatRewardPerDay || 0;
    target.gmpaatValidityDay = source.gmpaatValidityDay || 0;
    target.gmptId = source.gmptId || false;
    target.gmpaatId = source.gmpaatId || false;
    target.fieldOptionDisplayDescriptionShorts = source.fieldOptionDisplayDescriptionShorts || false;
    target.fieldOptionDisplayTitles = source.fieldOptionDisplayTitles || false;
    target.image = source.image || null;
    target.gmptImageFileName = source.gmptImageFileName || null;
    target.gmpaatGmptId = source.gmpaatGmptId || null;
    target.gmpaatPurchaseOnce = source.gmpaatPurchaseOnce || 0;
    target.conditionalGmpaatId = source.conditionalGmpaatId || 0;
    target.imageForCalculator = source.imageForCalculator || null;
    target.imageForBanner = source.imageForBanner || null;
    target.image = source.image || null;
    target.image2 = source.image2 || null;
    target.originalPrice = source.originalPrice || 0;

    target.gmpaatNotavailableConditional = source.gmpaatNotavailableConditional || null;
    target.gmpaatNotavailableInactive = source.gmpaatNotavailableInactive || null;
    target.gmpaatNotavailableDowngrade = source.gmpaatNotavailableDowngrade || null;
    target.gmpaatNotavailablePurchaseonce = source.gmpaatNotavailablePurchaseonce || null;
    target.gmpaatNotavailableCurrent = source.gmpaatNotavailableCurrent || null;

    target.gmpaatAvailableUpgrade = source.gmpaatAvailableUpgrade || null;
    target.gmpaatAvailablePurchase = source.gmpaatAvailablePurchase || null;

    target.fieldOptionNotavailableConditionals = source.fieldOptionNotavailableConditionals || false;
    target.fieldOptionNotavailableInactives = source.fieldOptionNotavailableInactives || false;
    target.fieldOptionNotavailableDowngrades = source.fieldOptionNotavailableDowngrades || false;
    target.fieldOptionNotavailablePurchaseonces = source.fieldOptionNotavailablePurchaseonces || false;
    target.fieldOptionNotavailableCurrents = source.fieldOptionNotavailableCurrents || false;

    target.fieldOptionAvailableUpgrades = source.fieldOptionAvailableUpgrades || false;
    target.fieldOptionAvailablePurchases = source.fieldOptionAvailablePurchases || false;

    return target;

}

function createValidator() {
    return {
        gmpaatCanPurchaseMultiple: { required },
        gmpaatStatus: { required },
        fieldOptionDisplayDescriptionLongs: { checkIfSelectAllLanguage },
        fieldOptionDisplayDescriptionShorts: { checkIfSelectAllLanguage },
        fieldOptionDisplayTitles: { checkIfSelectAllLanguage },
        gmpaatValidityDay: { required },
        gmpaatPackagePrice: { required },
        gmpaatRewardPerDay: { required },
        gmpaatGmptId: {required},
        originalPrice: {required},
        fieldOptionNotavailableConditionals: { checkIfSelectAllLanguage },
        fieldOptionNotavailableInactives: { checkIfSelectAllLanguage },
        fieldOptionNotavailableDowngrades: { checkIfSelectAllLanguage },
        fieldOptionNotavailablePurchaseonces: { checkIfSelectAllLanguage },
        fieldOptionNotavailableCurrents: { checkIfSelectAllLanguage },
        fieldOptionAvailableUpgrades: { checkIfSelectAllLanguage },
        fieldOptionAvailablePurchases: { checkIfSelectAllLanguage }
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
        packageOptions: [
            {
                gmpaatId: 0,
                title: "None",
            }
        ]
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

            const [error2, result2] = await this.$service.minePackageService.getAll(
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
			);
			if (error2) {
			} else {
				this.packageOptions = [
                    ...this.packageOptions,
                    ...result2.content
                ];
			}
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
//
            this.fieldOptionNotavailableConditionals = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionNotavailableInactives = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionNotavailableDowngrades = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionNotavailablePurchaseonces = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionNotavailableCurrents = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionAvailableUpgrades = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionAvailablePurchases = this.languageOptions.map((d) => {
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