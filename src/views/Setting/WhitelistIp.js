import { required, minLength, maxLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.witIp = source.witIp || null;
    target.witRemarks = source.witRemarks || null;

    return target;

}

const ipValidator = (value) => {
    var expression = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var regex = new RegExp(expression);
    return value.match(regex) ? true : false;
};

function createValidator() {
    return {
        witIp: { required, ipValidator, minLength: minLength(5), maxLength: maxLength(50) },
        witRemarks: { required, maxLength: maxLength(300) },
    }
}

const mixin = {
    computed: {
    },
};
export { createInstance, createValidator, assign, mixin }