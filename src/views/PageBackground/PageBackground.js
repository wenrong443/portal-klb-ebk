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
    target.pbtId = source.pbtId || 0;
    target.pbtUiLink = source.pbtUiLink || null;
    target.pbtImage = source.pbtImage || null;
    target.pbtRemark = source.pbtRemark || null;
    target.pbtStatus = source.pbtStatus || 0;
    target.image = source.image || null;
    return target;
}

function createValidator(isRequired) {
    return {
        image: { required: requiredIf(isRequired) },
        pbtUiLink: { required },
        pbtRemark: { required },
    };
}

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.pbtStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.pbtStatus = newValue == false ? 0 : 1;
            },
        },
    },
    async created() {
    },
    methods: {
        
    },
};
export { createInstance, createValidator, assign, mixin };
