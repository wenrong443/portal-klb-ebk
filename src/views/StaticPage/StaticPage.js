// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from '@vuelidate/core'
import { required, numeric, minLength, maxLength, minValue } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.websiteTitle = source.websiteTitle || null;
    target.websiteLogo = source.websiteLogo || null;
    target.websiteLogo2 = source.websiteLogo2 || null;
    target.companyImage = source.companyImage || null;
    target.playLogo = source.playLogo || null;
    target.reviewLoadingBackground = source.reviewLoadingBackground || null;
    target.reviewLoadingGif = source.reviewLoadingGif || null;
    target.companyName = source.companyName || null;
    target.companyAddress = source.companyAddress || null;
    target.companyContactNumber = source.companyContactNumber || null;
    target.companyEmail = source.companyEmail || null;
    target.companyBusinessHours = source.companyBusinessHours || null;
    target.businessHoursPage = source.businessHoursPage || null;
    target.withdrawProcessPage = source.withdrawProcessPage || null;
    target.reloadProcessPage = source.reloadProcessPage || null;
    target.platformNoticePage = source.platformNoticePage || null;
    target.tutorialPage = source.tutorialPage || null;
    target.fieldOptionsTutorialPage = source.fieldOptionsTutorialPage || [];
    target.fieldOptionsBusinessHoursPage = source.fieldOptionsBusinessHoursPage || [];
    target.fieldOptionsWithdrawProcessPage = source.fieldOptionsWithdrawProcessPage || [];
    target.fieldOptionsReloadProcessPage = source.fieldOptionsReloadProcessPage || [];
    target.fieldOptionsPlatformNoticePage = source.fieldOptionsPlatformNoticePage || [];
    target.fieldOptionsCompanyBusinessHours = source.fieldOptionsCompanyBusinessHours || [];
    target.image = source.image || null;
    target.image2 = source.image2 || null;
    target.image3 = source.image3 || null;
    target.image4 = source.image4 || null;
    target.image5 = source.image5 || null;
    target.logo = source.logo || null;
    return target;
}

function createValidator() {
    return {
        // fieldOptionsTutorialPage: { checkIfSelectAllLanguage },
        // fieldOptionsBusinessHoursPage: { checkIfSelectAllLanguage },
        // fieldOptionsWithdrawProcessPage: { checkIfSelectAllLanguage },
        // fieldOptionsReloadProcessPage: { checkIfSelectAllLanguage },
        // fieldOptionsPlatformNoticePage: { checkIfSelectAllLanguage },
        fieldOptionsCompanyBusinessHours: { checkIfSelectAllLanguage },
        companyName: { required,},
        companyAddress: { required},
        companyContactNumber: { required },
        companyEmail: { required },
        companyBusinessHours: { required },
        websiteLogo: {required}
    }
}

const checkIfSelectAllLanguage = (value) => {
    if(value){
        const checkedValue = value.filter(d => !d.value);
        if(checkedValue.length > 0) return false;
    }
   
    return true;
}

const mixin = {
    setup() {
        return { v$: useVuelidate() }
    },
    data: () => ({
        languageOptions: [],
    }),
    computed: {
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
export { createInstance, createValidator, assign, mixin }