// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.actId = source.actId || 0;
    target.actName = source.actName || null;
    target.actUiLink = source.actUiLink || null;
    target.actRemarks = source.actRemarks || "";
    target.actStatus = source.actStatus || 0;
    return target;

}

function createValidator() {
    return {
        actName: { required, minLength: minLength(3), maxLength: maxLength(255) },
        actUiLink: { required, minLength: minLength(3), maxLength: maxLength(255) },
    }
}


const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        filter: {
            pageNumber: 0,
            rowPerPage: 0,
        },
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.actStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.actStatus = newValue == false ? 0 : 1;
            }
        },
        // formattedDisplayType: {
        //     get: function () {
        //         return this.atDisplayType == 1 ? true : false;
        //     },
        //     set: function (newValue) {
        //         this.atDisplayType = newValue == false ? 0 : 1;
        //     }
        // }
    },
    async created() {
        await this.getOptionList()
    },
    methods: {
        async getOptionList() {
            
        },
    },

};
export { createInstance, createValidator, assign, mixin }