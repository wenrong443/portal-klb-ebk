import {
    required,
    minLength,
    maxLength,
} from "@vuelidate/validators";

function createValidator() {
    return {
        oldPassword: {
            required
        },
        newPassword: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(20),
        },
        confirmNewPassword: {
            required,
        },
        otp: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(20),
        },
    };
}

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.oldPassword = source.oldPassword || null;
    target.newPassword = source.newPassword || null;
    target.confirmNewPassword = source.confirmNewPassword || null;
    target.otp = source.otp || null;

    return target;
}

const mixin = {
    setup() {
        return {}
    },
    data: () => ({
    }),
    computed: {

    },
    async created() {
    },
    methods: {
        
    },

};
export { createInstance, assign, createValidator, mixin }