import {
    required,
    minLength,
    maxLength,
} from "@vuelidate/validators";

function createValidator() {
    return {
        mobileNumber: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(20),
        },
        fullName: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(230),
        },
    };
}

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.id = source.id || 0;
    target.profileImage = source.profileImage || 0;
    target.username = source.username || null;
    target.fullName = source.fullName || null;
    target.countryCode = source.countryCode || null;
    target.mobileNumber = source.mobileNumber || null;
    target.department = source.department || null;

    return target;
}

const mixin = {
    setup() {
        return {}
    },
    data: () => ({
        countrys: []
    }),
    computed: {

    },
    async created() {
        await this.getOptionList();
    },
    methods: {
        async getOptionList() {
            const [
                error,
                result,
            ] = await this.$service.lookupService.getCountryList();
            this.countrys = result;
        },
    },

};
export { createInstance, assign, createValidator, mixin }