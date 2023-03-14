// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.dtId = source.dtId || 0;
    target.dtName = source.dtName || null;
    target.dtRemarks = source.dtRemarks || "";
    target.dtStatus = source.dtStatus || 0;
    return target;

}

function createValidator() {
    return {
        dtName: { required, minLength: minLength(3), maxLength: maxLength(20) },
        dtRemarks: { maxLength: maxLength(300) },
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
                return this.dtStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.dtStatus = newValue == false ? 0 : 1;
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