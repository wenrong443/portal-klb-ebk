import useVuelidate from '@vuelidate/core'
import { required, requiredIf, minLength, maxLength, minValue } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.ftId = source.ftId || 0;
    target.fnqTitle = source.fnqTitle || null;
    target.fnqDescription = source.fnqDescription || null;
    target.fieldOptionsTitle = source.fieldOptionsTitle || [];
    target.fieldOptionsDescription = source.fieldOptionsDescription || [];

    target.ftTitle = source.ftTitle || [];
    target.ftDescription = source.ftDescription || [];
    target.ftStatus = source.ftStatus || 0;

    return target;
}

function createValidator() {
    return {
        fieldOptionsTitle: { checkIfSelectAllLanguage },
        fieldOptionsDescription: { checkIfSelectAllLanguage },
    }
}

const checkIfSelectAllLanguage = (value) => {
    if (value) {
        const checkedValue = value.filter(d => !d.value);
        if (checkedValue.length > 0) return false;
    }

    return true;
}
import json from "@/infrastructure/json/config.json";

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        selectedTab: {},
        tabKey: 0,
        tabs: [],
        currency: json.currency,
        languageOptions: [],
        
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.ftStatus ? ( this.ftStatus == 1 ? true : false) : false;
            },
            set: function (newValue) {
                this.ftStatus = newValue == false ? 0 : 1;
            }
        },
    },
    async created() {
        await this.getLanguageOptions();
    },
    methods: {
        async getLanguageOptions() {
            const [error, result] =
                await this.$service.settingService.getAllLanguage();
            this.languageOptions = result.content;
            this.selectedLanguage = this.languageOptions[0].id;
        },
        cancel() {
            this.$router.push({ name: "FnqSummaryPage" });
        },
    },
    watch: {
        languageOptions() {
            this.fieldOptionsTitle = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });
            this.fieldOptionsDescription = this.languageOptions.map((d) => {
                return {
                    ltId: d.ltId,
                    value: "",
                };
            });

            this.tabs = this.languageOptions.map((d) => {
                return {
                    id: d.ltId.toString(),
                    name: d.ltName,
                    routeName: d.ltName,
                };
            });
            this.selectedTab = this.tabs[0];
        },
    },
};
export { createInstance, createValidator, assign, mixin }