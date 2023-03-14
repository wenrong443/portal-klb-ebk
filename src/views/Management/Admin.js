// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.utId = source.utId || 0;
    target.utUsername = source.utUsername || null;
    target.utDepartmentId = source.utDepartmentId || null;
    target.utFullname = source.utFullname || null;
    target.utPassword = source.utPassword || "";
    target.utStatus = source.utStatus || 0;
    target.utRemarks = source.utRemarks || "";
    target.role = source.role || null;
    target.utCountryCode = source.utCountryCode || null;
    target.utMobileNumber = source.utMobileNumber || null;
    return target;

}

function createValidator(isPasswordRequired) {
    return {
        utUsername: { required, minLength: minLength(3), maxLength: maxLength(20) },
        utPassword: { required: requiredIf(isPasswordRequired), minLength: minLength(6), maxLength: maxLength(20) },
        utDepartmentId: { required },
        utFullname: { required, minLength: minLength(5), maxLength: maxLength(120) },
        role: { required },
        utCountryCode: { required },
        utMobileNumber: { required, minLength: minLength(5), maxLength: maxLength(20) },
    }
}


const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        departmentOptions: [],
        roleOptions: [
            {
                id: 'SUPER_ADMIN',
                value: 'SUPER ADMIN'
            },
            {
                id: 'ADMIN',
                value: 'ADMIN'
            },
            {
                id: 'FINANCE',
                value: 'FINANCE'
            },
            {
                id: 'CUSTOMER_SERVICE',
                value: 'CUSTOMER SERVICE'
            }
        ],
        countrys: [],
        
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.utStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.utStatus = newValue == false ? 0 : 1;
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
            const [[, departmentOptions],] = await Promise.all([
                this.$service.managementService.getDepartmentAllActive(),
            ]);

            this.departmentOptions = departmentOptions.content;
            const [error, result] = await this.$service.lookupService.getCountryList();
            this.countrys = result;
        },
    },

};
export { createInstance, createValidator, assign, mixin }