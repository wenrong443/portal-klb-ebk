import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

function createInstance(options) {
    return assign({}, options);
}

function createDepositInstance(options) {
    return assignDeposit({}, options);
}

function createManualFundInstance(options) {
    return assignManualFund({}, options);
}

function assignManualFund(target, source) {
    source = source || {};

    target.countryCode = source.countryCode || null;
    target.mfrtAmount = source.mfrtAmount || null;
    target.mfrtIsRealMoneyTransaction = source.mfrtIsRealMoneyTransaction || null;
    target.depositWallet = source.depositWallet || null;
    target.mfrtRemarks = source.mfrtRemarks || null;
    target.otp = source.otp || null;
    target.phoneNumber = source.phoneNumber || null;
    target.type = source.type || null;
    target.productId = source.productId || null;

    return target;
}

function assign(target, source) {
    source = source || {};
    target.cdrtAmount = source.cdrtAmount || null;
    target.cwrtUbbtAccountName = source.cwrtUbbtAccountName || null;
    target.cwrtUbbtAccountNo = source.cwrtUbbtAccountNo || null;
    target.cwrtAmount = source.cwrtAmount || null;
    target.cwrtUbbtId = source.cwrtUbbtId || null;
    target.cwrtUtLevelId = source.cwrtUtLevelId || null;
    target.cwrtCreatedOn = source.cwrtCreatedOn || null;
    target.cwrtId = source.cwrtId || null;
    target.cwrtOrderNo = source.cwrtOrderNo || null;
    target.cwrtPaymentProve1 = source.cwrtPaymentProve1 || null;
    target.cwrtPaymentProve2 = source.cwrtPaymentProve2 || null;
    target.cwrtPaymentProve3 = source.cwrtPaymentProve3 || null;
    target.cwrtProcessedByUtId = source.cwrtProcessedByUtId || null;
    target.cwrtProcessedByUtUsername = source.cwrtProcessedByUtUsername || "-";
    target.cwrtProcessedOn = source.cwrtProcessedOn || "-";
    target.cwrtProcessingFee = source.cwrtProcessingFee || 0;
    target.cwrtRemarks = source.cwrtRemarks || null;
    target.cwrtStatus = source.cwrtStatus || 0;
    target.cwrtUtId = source.cwrtUtId || null;
    target.cwrtUtUsername = source.cwrtUtUsername || null;
    target.cwrtMtName = source.cwrtMtName || null;
    target.cwrtUbtName = source.cwrtUbtName || null;
    target.cwrtUbtType = source.cwrtUbtType || null;
    target.cwrtParam4 = source.cwrtParam4 || "-";
    target.cwrtParam5 = source.cwrtParam5 || "-";
    target.cwrtParam6 = source.cwrtParam6 || "-";
    target.cwrtParam7 = source.cwrtParam7 || "-";
    target.cwrtParam8 = source.cwrtParam8 || "-";

    target.cwrtUbbtExAccType = source.cwrtUbbtExAccType || "-";
    target.cwrtUbbtExBranch = source.cwrtUbbtExBranch || "-";
    target.cwrtUbbtExIfsc = source.cwrtUbbtExIfsc || "-";
    target.cwrtUbbtExHqIfsc = source.cwrtUbbtExHqIfsc || "-";
    return target;
}

function assignDeposit(target, source) {
    source = source || {};
    target.cdrtAmount = source.cdrtAmount || null;
    target.cdrtCmbtAccountName = source.cdrtCmbtAccountName || null;
    target.cdrtCmbtAccountNo = source.cdrtCmbtAccountNo || null;
    target.cdrtCmbtBankName = source.cdrtCmbtBankName || [];
    target.cdrtCmbtId = source.cdrtCmbtId || null;
    target.cdrtCmbtType = source.cdrtCmbtType || null;
    target.cdrtCreatedOn = source.cdrtCreatedOn || null;
    target.cdrtId = source.cdrtId || null;
    target.cdrtOrderNo = source.cdrtOrderNo || null;
    target.cdrtPaymentProve1 = source.cdrtPaymentProve1 || null;
    target.cdrtPaymentProve2 = source.cdrtPaymentProve2 || null;
    target.cdrtPaymentProve3 = source.cdrtPaymentProve3 || null;
    target.cdrtProcessedByUtId = source.cdrtProcessedByUtId || null;
    target.cdrtProcessedByUtUsername = source.cdrtProcessedByUtUsername || "-";
    target.cdrtProcessedOn = source.cdrtProcessedOn || "-";
    target.cdrtProcessingFee = source.cdrtProcessingFee || 0;
    target.cdrtRemarks = source.cdrtRemarks || null;
    target.cdrtStatus = source.cdrtStatus || 0;
    target.cdrtUtId = source.cdrtUtId || null;
    target.cdrtUtUsername = source.cdrtUtUsername || null;
    target.cdrtParam4 = source.cdrtParam4 || "-";
    target.cdrtParam5 = source.cdrtParam5 || "-";
    target.cdrtParam6 = source.cdrtParam6 || "-";
    target.cdrtParam7 = source.cdrtParam7 || "-";
    target.cdrtParam8 = source.cdrtParam8 || "-";
    return target;
}

function createValidator() {
    return {
        crhtRemarks: { required },
        newReferrerCountryCode: { required },
        newReferrerPhoneNumber: { required, minLength: minLength(3) },
        otp: { required, maxLength: maxLength(6) },
        ownerCountryCode: { required },
        ownerPhoneNumber: { required },
    };
}

function createManualFundValidator() {
    return {
        countryCode: { required },
        mfrtAmount: { required, minLength: minLength(1) },
        mfrtRemarks: { required, maxLength: maxLength(300) },
        otp: { required },
        phoneNumber: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(20),
        },
        type: { required },
        productId: { required }
    };
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
import json from "@/infrastructure/json/config.json";

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        currency: json.currency,
        modalOrderNo: "",
        modalId: 0,
        showModal: false,
        selectedItems: [],
        statusOptions: [],
        rocOptions: [],
        countrys: [],
        typeOptions: [
            {
                id: 'IN',
                value: 'IN'
            },
            {
                id: 'OUT',
                value: 'OUT'
            },
        ],
        timeCount: localStorage.getItem("autoRefreshDeposit") || 60,
        selectedTime: localStorage.getItem("autoRefreshDeposit") || 60,
        totalAmount: 0.0,
        deferTime: null,
        languageOptions: [],
    }),
    computed: {
        showBatchActions() {
            return this.selectedItemsLength > 0;
        },
        selectedItemsLength() {
            return this.selectedItems.length;
        },
        timerOptions() {
            return [
                { id: 0, value: this.$messages.fieldLabelDisableAutoRefresh() },
                { id: 30, value: this.$messages.fieldLabelEverySeconds(30) },
                { id: 60, value: this.$messages.fieldLabelEverySeconds(60) },
                { id: 180, value: this.$messages.fieldLabelEverySeconds(180) },
                { id: 300, value: this.$messages.fieldLabelEverySeconds(300) }
            ]
        }
    },
    async created() {
        this.statusOptions = [
            {
                id: 0,
                name: this.$messages.fieldLabelPending(),
            },
            {
                id: 1,
                name: this.$messages.fieldLabelApproved(),
            },

            {
                id: -1,
                name: this.$messages.fieldLabelRejected(),
            }];
            this.rocOptions = [
                {
                    id: -99,
                    name: 'All',
                },
                {
                    id: 1,
                    name: 'No',
                },
    
                {
                    id: 2,
                    name: 'Yes',
                }];

        const [error, result] = await this.$service.lookupService.getCountryList();
        this.countrys = result;
        this.getLanguageOptions();
    },
    methods: {
        closeDialog() {
            this.showModal = false;
        },
        showQuickView(id, orderNo) {
            this.showModal = false;
            this.modalOrderNo = orderNo;
            this.modalId = id;
            this.showModal = true;
        },
        dismissQuickView(){
            this.showModal = false;
        },
        toggleSelected(value) {
            if (!value.selected) {
                this.selectedItems.push(value.id);
            } else {
                const index = this.selectedItems.indexOf(value.id);
                this.selectedItems.splice(index, 1);
            }
        },
        async getLanguageOptions() {
            const [error, result] = await this.$service.settingService.getAllLanguage();
            this.languageOptions = result.content; 
        }
    },
    watch: {
        filterCriteria() {
            if (this.filterCriteria !== null) {
                this.getAll();
            }
        },
    },
};
export {
    createInstance,
    createDepositInstance,
    createValidator,
    createManualFundInstance,
    createManualFundValidator,
    assign,
    assignDeposit,
    assignManualFund,
    STATUS,
    STATUS_CLASS,
    mixin,
};
