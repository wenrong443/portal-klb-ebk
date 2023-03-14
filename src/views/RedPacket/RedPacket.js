import useVuelidate from "@vuelidate/core";
import {
    required,
} from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function assign(target, source) {
    source = source || {};
    target.rptId = source.rptId || null;
    target.fieldOptionsTitle = source.fieldOptionsTitle || [];
    target.fieldOptionsDescription = source.fieldOptionsDescription || [];
    target.rptDescription = source.rptDescription || null;
    target.rptTitle = source.rptTitle || null;
    target.rptStart = source.rptStart || null;
    target.rptEnd = source.rptEnd || null;
    target.redPacketSubDAOList = source.redPacketSubDAOList || [];
    target.rptToDeposit = source.rptToDeposit || 0;
    target.rptShowEveryPage = source.rptShowEveryPage || 0;
    target.rptMaxPerUser = source.rptMaxPerUser || 0;
    target.rptExcludePurchaseOnce = source.rptExcludePurchaseOnce || 0;
    target.rptStatus = source.rptStatus || 0;
    target.image = source.image || null;
    target.animationImage = source.animationImage || null;
    target.rptImageLocation = source.rptImageLocation || null;
    target.rptAnimationLocation = source.rptAnimationLocation || null;
    return target;
}

function createValidator() {
    return {
        fieldOptionsTitle: { checkIfSelectAllLanguage },
        fieldOptionsDescription: { checkIfSelectAllLanguage },
        rptStart: { required },
        rptEnd: { required },
        rptToDeposit: { required },
        rptShowEveryPage: { required },
        rptMaxPerUser: { required },
        rptExcludePurchaseOnce: { required },
        rptStatus: { required },
        image: { checkIfImageRequired },
        animationImage: { checkIfAnimationImageRequired }
    };
}

const checkIfSelectAllLanguage = (value) => {
    if (value) {
        const checkedValue = value.filter(d => !d.value);
        if (checkedValue.length > 0) return false;
    }

    return true;
}

const checkIfImageRequired = (value, t) => {
    if (t.rptImageLocation) {
        return true;
    }
    if (!t.image) {
        return false
    }
    return true;
}

const checkIfAnimationImageRequired = (value, t) => {

    if (t.rptAnimationLocation) {
        return true;
    }
    console.log(t.animationImage)
    if (!t.animationImage) {
        console.log('s')
        return false
    }

    return true;
}


const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        languageOptions: [],
    }),
    methods: {
        async getLanguageOptions() {
            const [error, result] =
                await this.$service.settingService.getAllLanguage();
            this.languageOptions = result.content;
            this.selectedLanguage = this.languageOptions[0].id;
        },
        async uploadImage(id) {
            this.setLoading();
            console.log(this.image)
            if (!this.image) 
                return this.goToSummaryPage()

            var formData = new FormData();
            formData.append("image", this.image);

            const [error, result] = await this.$service.redPacketService.uploadImage(
                id,
                formData
            );
            if (error) {
                this.showError(error);
            }
            this.uploadAnimationImage(id)
        },
        async uploadAnimationImage(id) {
            this.setLoading();
            if (!this.animationImage)
                return this.goToSummaryPage()

            var formData = new FormData();
            formData.append("image", this.animationImage);

            const [error, result] = await this.$service.redPacketService.uploadAnimationImage(
                id,
                formData
            );
            if (error) {
                this.showError(error);
            }
            this.goToSummaryPage();
            this.setCompleted();
        },

        goToSummaryPage() {
            this.$router.push({ name: "RedPacketSummaryPage" });
        }
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
}
export { createInstance, createValidator, assign, mixin };
