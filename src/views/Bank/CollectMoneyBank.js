// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.cmbtAccountName = source.cmbtAccountName || null;
    target.cmbtAccountNo = source.cmbtAccountNo || null;
    target.cmbtBankName = source.cmbtBankName || null;
    target.cmbtMinAmount = source.cmbtMinAmount || 0;
    target.cmbtRemarks = source.cmbtRemarks || null;
    target.cmbtStatus = source.cmbtStatus || 0;
    target.type = source.type || null;
    target.bankAccountName = source.bankAccountName || null;
    target.bankExchangeRate = source.bankExchangeRate || 0.0;
    target.currency = source.currency || null;
    target.cmbtParam4 = source.cmbtParam4 || null;
    return target;
}

function createValidator() {
    return {
        cmbtAccountName: { required, minLength: minLength(3) },
        cmbtAccountNo: { required, minLength: minLength(3) },
        cmbtBankName: { required, minLength: minLength(3) },
        cmbtMinAmount: { required },
        cmbtRemarks: { required },
        cmbtStatus: { required },
        type: { required },
        bankAccountName: { minLength: minLength(1) },
        currency: { minLength: minLength(1) },
    }
}

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        categoryOptions: [],
        languageOptions: [],
        countrys: []
    }),
    computed: {
        typeOptions() {
            return [
                { id: "CRYTO", value: this.$messages.fieldLabelCollectTypeCryto() },
                { id: "BANK", value: this.$messages.fieldLabelCollectTypeBank() },
                { id: "CUSTOMER_SUPPORT", value: this.$messages.labelCustomerSupport() },
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
        const [error, result] = await this.$service.lookupService.getCountryList();
        this.countrys = result;
    },
    methods: {

    },

};
export { createInstance, createValidator, assign, mixin }