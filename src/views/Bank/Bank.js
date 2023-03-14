// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.language = source.language || false;
    target.bankName = source.bankName || null;
    target.ubtName = source.ubtName || [];
    target.fieldOptions = source.fieldOptions || [];
    target.ubtRemarks = source.ubtRemarks || null;
    target.ubtSwiftCode = source.ubtSwiftCode || null;
    target.type = source.type || null;
    target.ubtType = source.ubtType || null;
    target.ubtStatus = source.ubtStatus || 0;
    target.bankExchangeRate = source.bankExchangeRate || 0.0;
    target.currency = source.currency || null;
    target.ubtParam4 = source.ubtParam4 || null;
    return target;
}

function createValidator() {
    return {
        fieldOptions: { checkIfSelectAllLanguage },
        ubtRemarks: { required },
        ubtSwiftCode: { required, minLength: minLength(3)},
        ubtStatus: { required },
        bankAccountName: { minLength: minLength(1) },
        currency: { minLength: minLength(1) },
    }
}

const checkIfSelectAllLanguage = (value) => {
    if(value){
        const checkedValue = value.filter(d => !d.value);
        if(checkedValue.length > 0) return false;
    }
   
    return true;
}

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        languageOptions: [],
        countrys: []
    }),
    computed: {
        typeOption() {
			return [{ id: "CRYTO", value: this.$messages.fieldLabelCollectTypeCryto() }, { id: "BANK", value: this.$messages.fieldLabelCollectTypeBank() }];
		},
        formattedStatus: {
            get: function () {
                return this.atStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.atStatus = newValue == false ? 0 : 1;
            }
        },
        formattedDisplayType: {
            get: function () {
                return this.atDisplayType == 1 ? true : false;
            },
            set: function (newValue) {
                this.atDisplayType = newValue == false ? 0 : 1;
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

            const [error, result] = await this.$service.lookupService.getCountryList();
            this.countrys = result;
        },
    },

};
export { createInstance, createValidator, assign, mixin }