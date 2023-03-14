// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.atId = source.announcementId || false;
    target.atStatus = source.atStatus || 0;
    target.atActId = source.atActId || null;
    target.atContent = source.atContent || null;
    target.atLtId = source.atLtId || null;
    target.atDisplayType = source.atDisplayType || 0;
    target.atTitle = source.atTitle || null;
    target.htmlContent = source.htmlContent || null;
    return target;
}

function createValidator() {
    return {
        atStatus: { required },
        atActId: { required },
        atContent: { required, minLength: minLength(20) },
        atLtId: { required },
        atDisplayType: { required },
        atTitle: { required, minLength: minLength(3) },
        htmlContent: { required },

    };
}

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        categoryOptions: [],
        categoryOptions2: [],
        languageOptions: [],
        languageOptions2: [],
        filterForCategory: {},
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.atStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.atStatus = newValue == false ? 0 : 1;
            },
        },
        formattedDisplayType: {
            get: function () {
                return this.atDisplayType == 1 ? true : false;
            },
            set: function (newValue) {
                this.atDisplayType = newValue == false ? 0 : 1;
            },
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
        }
    },
    async created() {
        await this.getOptionList();
    },
    methods: {
        async getOptionList() {

            const [[, categoryOptions], [, languageOptions]] = await Promise.all([
                this.$service.announcementService.getCategoryAll(
                    this.filterForCategory
                ),
                this.$service.settingService.getAllLanguage(),
            ]);
            this.categoryOptions2 = categoryOptions.content;
            this.categoryOptions = [
                {
                    actId: -99,
                    actName: this.$messages.fieldLabelAll(),
                },
            ];
            this.categoryOptions = this.categoryOptions.concat.apply(
                this.categoryOptions,
                categoryOptions.content
            );
            this.languageOptions2 = languageOptions.content;
            this.languageOptions = [
                {
                    ltId: -99,
                    ltName: this.$messages.fieldLabelAll(),
                },
            ];
            this.languageOptions = this.languageOptions.concat.apply(
                this.languageOptions,
                languageOptions.content
            );
        },
    },
};
export { createInstance, createValidator, assign, mixin };
