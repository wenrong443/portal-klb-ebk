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
  target.drdtId = source.drdtId || 0;
  target.drdtCountryCode = source.drdtCountryCode || null;
  target.drdtMobileNumber = source.drdtMobileNumber || null;
  target.drdtType = source.drdtType || null;
  target.drdtProfileImage = source.drdtProfileImage || 0;
  target.drdtAmount = source.drdtAmount || 0.0;
  target.drdtStatus = source.drdtStatus || 0;
  return target;
}

function createValidator() {
  return {
    drdtCountryCode: { required },
    drdtMobileNumber: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    drdtType: { required },
    drdtProfileImage: { required },
    drdtAmount: { required, minValue: minValue(1) },
  };
}

const mixin = {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    departmentOptions: [],
    typeOptions: [
      {
        id: "USER",
        value: "fieldLabelUser",
      },
      {
        id: "ADVERTISER",
        value: "fieldLabelAdvertiser",
      },
    ],
    typeOptionsForFilter: [
      {
        id: "",
        value: "fieldLabelAll",
      },
      {
        id: "USER",
        value: "fieldLabelUser",
      },
      {
        id: "ADVERTISER",
        value: "fieldLabelAdvertiser",
      },
    ],
    countrys: [],
    statusOptions: [
      {
        id: -99,
        name: "fieldLabelAll",
      },
      {
        id: 1,
        name: "labelActive",
      },
      {
        id: 0,
        name: "labelSuspend",
      },
    ],
  }),
  computed: {
    formattedStatus: {
      get: function() {
        return this.drdtStatus == 1 ? true : false;
      },
      set: function(newValue) {
        this.drdtStatus = newValue == false ? 0 : 1;
      },
    },
  },
  async created() {
    await this.getOptionList();
  },
  methods: {
    async getOptionList() {
      const [
        error,
        result,
      ] = await this.$service.lookupService.getCountryList();
      this.countrys = result;
    },
  },
};
export { createInstance, createValidator, assign, mixin };
