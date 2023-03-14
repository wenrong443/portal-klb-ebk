// import { required, email } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

function createInstance(options) {
  return assign({}, options);
}

function createManualFundInstance(options) {
    return assignManualFund({}, options);
}

function createManualFundValidator() {
    return {
        amount: { required, minLength: minLength(1) },
        remark: { required, maxLength: maxLength(300) },
    };
}

function assignManualFund(target, source) {
    source = source || {};

    target.utId = source.utId || null;
    target.amount = source.amount || null;
    target.remark = source.remark || null;

    return target;
}

function assign(target, source) {
  source = source || {};
  target.username = source.username || null;
  target.fullName = source.fullName || null;
  target.countryCode = source.countryCode || null;
  target.mobileNumber = source.mobileNumber || null;
  target.referrerCode = source.referrerCode || null;
  target.creditScore = source.creditScore || null;
  target.walletBalance = source.walletBalance || "-";
  target.depositBalance = source.depositBalance || "-";
  target.withdrawBalance = source.withdrawBalance || "-";

  target.registeredOn = source.registeredOn || null;
  target.status = source.status || null;
  target.remarks = source.remarks || null;
  target.lsLevel = source.lsLevel || null;

  target.lastLoginOn = source.lastLoginOn || null;
  target.lastLoginIP = source.lastLoginIP || null;
  target.leader = source.leader || null;
  target.risk = source.risk || null;
  target.totalInvite = source.totalInvite || 0;
  target.totalTopUp = source.totalTopUp || "-";
  target.totalWithdraw = source.totalWithdraw || "-";
  target.withdrawPassword = source.withdrawPassword || null;
  target.btcPackage = source.btcPackage || null;
  target.ethPackage = source.ethPackage || null;
  target.ltcPackage = source.ltcPackage || null;

  target.btcBalance = source.btcBalance || 0;
  target.ethBalance = source.ethBalance || 0;
  target.ltcBalance = source.ltcBalance || 0;

  target.crytoPackageInfoList = source.crytoPackageInfoList || [];
  target.crytoBalanceInfoList = source.crytoBalanceInfoList || [];

  target.uplineUsername = source.uplineUsername || "-";
  target.uplineCode = source.uplineCode || "-";

  target.loginPassword = source.loginPassword || null;
  target.email = source.email || null;
  target.test = source.test || null;
  target.icImage = source.icImage || null;


  return target;
}

 
const STATUS_CLASS = {
  1: "badge-success",
  0: "badge-danger",
  "-1": "badge-danger",
};

const STATUS = {
  1: "Active",
  0: "Suspended",
  '-1': 'Error'
};

const mixin = {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    showModal1: false,
    showModal2: false,
    showModal3: false,
    selectedUsername: "",
    countrys: [],
    selectedItems: [],
    statusOptions: [
      {
        id: 0,
        name: "Pending",
      },
      {
        id: 1,
        name: "Approved",
      },

      {
        id: -1,
        name: "Rejected",
      },
    ],
  }),
  computed: {
    showBatchActions() {
        return this.selectedItemsLength > 0;
    },
    selectedItemsLength() {
        return this.selectedItems.length;
    },
  },
  async created() {
  },
  methods: {
    toggleSelected(value) {
        if (!value.selected) {
            this.selectedItems.push(value.id);
        } else {
            const index = this.selectedItems.indexOf(value.id);
            this.selectedItems.splice(index, 1);
        }
    },
    closeDialog1() {
        this.showModal1 = false;
    },
    showQuickView1(id) {
        this.showModal1 = false;
        this.modalId = id;
        this.showModal1 = true;
    },
    dismissQuickView1(){
        this.showModal1 = false;
    },
    closeDialog2() {
        this.showModal2 = false;
    },
    showQuickView2(id, username) {
        this.showModal2 = false;
        this.selectedUsername = username;
        this.modalId = id;
        this.showModal2 = true;
    },
    dismissQuickView2(){
        this.showModal2 = false;
    },
    closeDialog3() {
        this.showModal3 = false;
    },
    showQuickView3(id, username) {
        this.showModal3 = false;
        this.selectedUsername = username;
        this.modalId = id;
        this.showModal3 = true;
    },
    dismissQuickView3(){
        this.showModal3 = false;
    },
  },
};
export {
  createInstance,
  assign,
  createManualFundInstance,
  createManualFundValidator,
  STATUS,
  STATUS_CLASS,
  mixin,
};
