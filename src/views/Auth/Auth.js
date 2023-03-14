// import { required, email } from "vuelidate/lib/validators";
import { required, numeric, minLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.username = source.username || null;
    target.password = source.password || null;
    target.recaptchaToken = source.recaptchaToken || "123456";
    target.countryCode = source.countryCode || null
    target.phoneNumber = source.phoneNumber || null
   
    return target;

}

function createValidator() {
    return {
        username: { required },
        password: { required },
        recaptchaToken: { required },
    }
}

function createUserValidator() {
    return {
        countryCode: { required },
        phoneNumber: { required },
        password: { required },
        recaptchaToken: { required },
    }
}

const mixin = {
  
    data: () => ({
    
    }),
    computed: {
       
    },
    async created() {
    },
    methods: {
       
    },

};
export { createInstance, createValidator, createUserValidator, assign, mixin }