// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
import {
    required,
    numeric,
    minLength,
    maxLength,
    requiredIf,
    minValue,
} from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.gmbotId = source.gmbotId || 0;
    target.gmbotBoostPercent = source.gmbotBoostPercent || 0;
    target.gmbotBoostProductId = source.gmbotBoostProductId || 0;
    target.gmbotReducePercent = source.gmbotReducePercent || 0;
    target.gmbotEndDatetime = source.gmbotEndDatetime || null;
    target.gmbotStartDatetime = source.gmbotStartDatetime || null;
    target.gmbotRemark = source.gmbotRemark || null;
    target.gmbotUsdtValue = source.gmbotUsdtValue || 0;
    target.gmbotStatus = source.gmbotStatus || 0;
    return target;
}

function createValidator(isRequired) {
    return {
        gmbotBoostPercent: { required },
        gmbotBoostProductId: { required },
        gmbotReducePercent: { required },
        gmbotEndDatetime: { required },
        gmbotStartDatetime: { required },
        gmbotRemark: { required },
        gmbotUsdtValue: { required },
    };
}

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        languageOptions: [],
        typeOptions: [
            {
                id: "HIGHLIGHTS",
                value: "HIGHLIGHTS"
            }, {
                id: "ONLY_FOR_YOU",
                value: "ONLY_FOR_YOU"
            }
        ]
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.sstStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.sstStatus = newValue == false ? 0 : 1;
            },
        },
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
export { createInstance, createValidator, assign, mixin };
