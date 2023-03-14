// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
import {
    required,
    numeric,
    minLength,
    maxLength,
    requiredIf,
    minValue,
} from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.sstId = source.sstId || 0;
    target.sstType = source.sstType || null;
    target.sstName = source.sstName || null;
    target.sstLtId = source.sstLtId || null;
    target.language = source.language || null;
    target.sstUrl = source.sstUrl || null;
    target.sstPriority = source.sstPriority || 0;
    target.sstStatus = source.sstStatus || 0;
    target.image = source.image || null;
    target.fileDownloadURL = source.fileDownloadURL || null;
    target.sstDescription = source.sstDescription || "";
    return target;
}

function createValidator(isRequired) {
    return {
        image: { required: requiredIf(isRequired) },
        sstLtId: { required },
        sstType: { required },
        sstName: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(50),
        },
        sstPriority: { required, minValue: minValue(0) },
        // sstDescription: { required },
    };
}

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        languageOptions: [],
        typeOptions: [
            // {
            //     id: "HIGHLIGHTS",
            //     value: "HIGHLIGHTS"
            // }, {
            //     id: "ONLY_FOR_YOU",
            //     value: "ONLY_FOR_YOU"
            // }, 
            {
                id: "MEDIA",
                value: "MEDIA"
            }, {
                id: "ABOUT",
                value: "ABOUT"
            },  {
                id: "HIGHLIGHTS1",
                value: "HIGHLIGHTS"
            }, {
                id: "HIGHLIGHTS2",
                value: "BROWSE MORE"
            }
        ]
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.sstStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.sstStatus = newValue == false ? 0 : 1;
            },
        },
    },
    async created() {
        await this.getOptionList();
    },
    methods: {
        async getOptionList() {
            const [[, languageOptions]] = await Promise.all([
                this.$service.settingService.getAllLanguage(),
            ]);
            this.languageOptions = languageOptions.content;
        },
    },
};
export { createInstance, createValidator, assign, mixin };
