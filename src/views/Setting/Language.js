import { required, minLength, maxLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.ltId = source.ltId || null;
    target.ltFileName = source.ltFileName || null;
    target.ltName = source.ltName || null;
    target.ltPriority = parseInt(source.ltPriority) || 0;
    target.ltRemarks = source.ltRemarks || "";
    target.ltStatus = source.ltStatus || 0;
    return target;

}

function createValidator() {
    return {
        ltFileName: { required, minLength: minLength(3), maxLength: maxLength(30) },
        ltName: { required, minLength: minLength(1), maxLength: maxLength(30) },
        ltPriority: { required },
        ltRemarks: { required, maxLength: maxLength(300) },
        ltStatus: { required },
    }
}


const mixin = {
    computed: {
        formattedStatus: {
            get: function () {
                return this.ltStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.ltStatus = newValue ? 0 : 1;
            }
        },
    },
};
export { createInstance, createValidator, assign, mixin }