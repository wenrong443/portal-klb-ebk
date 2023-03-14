// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.crhtFromUtId = source.crhtFromUtId || null;
    target.crhtFromUtUsername = source.crhtFromUtUsername || null;
    target.crhtId = source.crhtId || [];
    target.crhtProcessedByUtId = source.crhtProcessedByUtId || [];
    target.crhtProcessedByUtUsername = source.crhtProcessedByUtUsername || null;
    target.crhtRemarks = source.crhtRemarks || null;
    target.crhtStatus = source.crhtStatus || 0;
    target.crhtTargetUtId = source.crhtTargetUtId || null;
    target.crhtTargetUtUsername = source.crhtTargetUtUsername || null;
    target.crhtToUtId = source.crhtToUtId || 0;
    target.crhtToUtUsername = source.crhtToUtUsername || null;
    target.updatedDatetime = source.updatedDatetime || null;
    target.otp = source.otp || null;
    target.newReferrerCountryCode = source.newReferrerCountryCode || null;
    target.newReferrerPhoneNumber = source.newReferrerPhoneNumber || null;
    target.ownerCountryCode = source.ownerCountryCode || null;
    target.ownerPhoneNumber = source.ownerPhoneNumber || null;

    return target;
}

function createValidator() {
    return {
        crhtRemarks: { required },
        newReferrerCountryCode: { required },
        newReferrerPhoneNumber: { required, minLength: minLength(3) },
        otp: { required },
        ownerCountryCode: { required },
        ownerPhoneNumber: { required }
    }
}

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        countrys: []
    }),
    computed: {

    },
    async created() {
        await this.getCountryList();
    },
    methods: {
        async getCountryList() {
            const [error, result] = await this.$service.lookupService.getCountryList();
            this.countrys = result;
        }
    },

};
export { createInstance, createValidator, assign, mixin }