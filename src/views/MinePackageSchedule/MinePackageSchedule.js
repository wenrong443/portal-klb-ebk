// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, requiredIf } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.gmpstId = source.gmpstId || 0;
    target.packageTitle = source.packageTitle || null;
    target.gmpstGmpaatId = source.gmpstGmpaatId || 0;
    target.gmpstStart = source.gmpstStart || null;
    target.gmpstEnd = source.gmpstEnd || null;
    target.gmpstStatus = source.gmpstStatus || 0;
    return target;

}

function createValidator() {
    return {
        gmpstGmpaatId: { required },
        gmpstStart: { required },
        gmpstEnd: { required }
        // image: {
		// 	required: requiredIf(function(value){
		// 		return this.giptImageFileName == null ? true : false;
		// 	}),
		// },
    }
}


const STATUS_CLASS = {
    1: "badge-success",
    0: "badge-info",
    "-1": "badge-danger",
};

const STATUS = {
    1: "Approved",
    0: "Pending",
    "-1": "Rejected",
};

const RETURN_MODAL = {
    1: "Yes",
    0: "No",
}

const RETURN_MODAL_STATUS = {
    1: "badge-success",
    0: "badge-danger",
}

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        selectedTab: {},
        tabKey: 0,
        tabs: [],
        filter: {
            pageNumber: 0,
            rowPerPage: 0,
        },
        categoryOptions: [],
        languageOptions: [],
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
    
   
        statusOptions() {
            return [
                {
                    id: -99,
                    name: this.$messages.fieldLabelAll(),
                },
                {
                    id: 1,
                    name: this.$messages.labelActive(),
                },
                {
                    id: 0,
                    name: this.$messages.labelSuspend(),
                },
            ];
        },
    },
    async created() {
        await this.getOptionList()
    },
    methods: {
        
    },
    watch: {
        
    },

};
export {
    createInstance, createValidator, assign, STATUS,
    STATUS_CLASS, mixin, RETURN_MODAL, RETURN_MODAL_STATUS
}