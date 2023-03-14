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
  target.grtType = source.grtType || 1;
  target.grtPrice = source.grtPrice || 0.0;
  target.grtQuantity = source.grtQuantity || 0;
  target.grtMaxPerUser = source.grtMaxPerUser || 0;
  target.grtTitle = source.grtTitle || null;
  target.grtDescription = source.grtDescription || null;
  target.grtStatus = source.grtStatus || 0;
  target.grtImage1 = source.grtImage1 || null;
  target.image = source.image || null;
  return target;
}

function createValidator() {
  return {
    grtTitle: { required },
    grtDescription: { required },
    grtType: { required },
    grtPrice: { required, minValue: minValue(1) },
    grtQuantity: { required, minValue: minValue(0) },
    grtMaxPerUser: { required, minValue: minValue(0) },    
    image: {required}
  };
}

function createValidatorEdit() {
    return {
      grtTitle: { required },
      grtDescription: { required },
      grtType: { required },
      grtPrice: { required, minValue: minValue(1) },
      grtQuantity: { required, minValue: minValue(0) },
      grtMaxPerUser: { required, minValue: minValue(0) }   
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
            id: 1,
            value: "fieldLabelNormal",
          },
          {
            id: 2,
            value: "fieldLabelDeluxe",
          },
          {
            id: 3,
            value: "fieldLabelRoyal",
          },
    ],
    typeOptionsForFilter: [
      {
        id: -99,
        value: "fieldLabelAll",
      },
      {
        id: 1,
        value: "fieldLabelNormal",
      },
      {
        id: 2,
        value: "fieldLabelDeluxe",
      },
      {
        id: 3,
        value: "fieldLabelRoyal",
      },
    ],
    countrys: [],
    statusOptions: [
      {
        id: -99,
        name: "fieldLabelAll",
      },
      {
        id: -1,
        name: "fieldLabelRejected",
      },
      {
        id: 0,
        name: "fieldLabelInProgress",
      },
      {
        id: 1,
        name: "fieldLabelOnHold",
      },
      {
        id: 2,
        name: "fieldLabelInReview",
      },
      {
        id: 3,
        name: "fieldLabelCompleted",
      },
    ],
  }),
  computed: {
    formattedStatus: {
      get: function() {
        return this.grtStatus == 1 ? true : false;
      },
      set: function(newValue) {
        this.grtStatus = newValue == false ? 0 : 1;
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
export { createInstance, createValidator, createValidatorEdit, assign, mixin };
