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
    target.pctId = source.pctId || 0;
    target.pctCode = source.pctCode || null;
    target.pctDeductType = source.pctDeductType || null;
    target.pctMaxDistribute = source.pctMaxDistribute || 0;
    target.pctValue = source.pctValue || 0;
    target.pctMaxPerUser = source.pctMaxPerUser || 0;
    target.pctSpecificPackage = source.pctSpecificPackage || 0;
    target.pctSpecificProducts = source.pctSpecificProducts || 0;
    target.pctStatus = source.pctStatus || 0;
    target.pctTitle = source.pctTitle || null;
    target.pctTo = source.pctTo || null;
    target.pctType = source.pctType || null;
    target.pctValidEnd = source.pctValidEnd || null;
    target.pctValidStart = source.pctValidStart || null;
    return target;
}

function createValidator() {
    return {
        pctTitle: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(200),
        },
        pctCode: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(200),
        },
        pctType: { required },
        pctDeductType: { required },
        pctTo: { required },
        pctMaxPerUser: { required, minValue: minValue(1) },
        pctMaxDistribute: { required, minValue: minValue(1) },
        pctValue: { required, minValue: minValue(0) },
        pctValidStart: { required },
        pctValidEnd: { required },
        // pctSpecificProducts: { required },
        // pctSpecificPackage: { required },
    };
}

const mixin = {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        languageOptions: [],
        typeOptions: [
            {
                id: "DISCOUNT",
                value: "DISCOUNT"
            }, {
                id: "CASHBACK",
                value: "CASHBACK"
            }
        ],
        deductTypeOptions: [
            {
                id: "PERCENTAGE",
                value: "PERCENTAGE"
            }, {
                id: "FIXED_AMOUNT",
                value: "FIXED AMOUNT"
            }
        ],
        toOptions: [
            {
                id: "NONE",
                value: "NONE"
            }
        ], productOptions: [
            {
                gmptId: 0,
                gmptShortCode: "All"
            }
        ], packageOptions: [
            {
                gmpaatId: 0,
                title: "All",
                gmpaatGmptShortCode: "-"
            }
        ]
    }),
    computed: {
        formattedStatus: {
            get: function () {
                return this.pctStatus == 1 ? true : false;
            },
            set: function (newValue) {
                this.pctStatus = newValue == false ? 0 : 1;
            },
        },
    },
    async created() {
        await this.getOptionList();
    },
    methods: {
        async getOptionList() {
            const [error, result] = await this.$service.mineProductService.getAll(
				{
                    gmptShortCode: "",
                    gmptStatus: -99,
                    paginationDAO: {
                        pageNumber: 0,
                        rowPerPage: 0,
                    },
                    sort: {
                        sortBy: "gmptId",
                        sortDirection: "ASC",
                    },
                }
			);
			if (error) {
			} else {
				this.productOptions = [
                    ...this.productOptions,
                    ...result.content
                ];
			}

            const [error2, result2] = await this.$service.minePackageService.getAll(
				{
                    gmpaatGmptId: -99,
                    gmpaatStatus: -99,
                    paginationDAO: {
                        pageNumber: 0,
                        rowPerPage: 0,
                    },
                    sort: {
                        sortBy: "gmpaatId",
                        sortDirection: "ASC",
                    },
                }
			);
			if (error2) {
			} else {
				this.packageOptions = [
                    ...this.packageOptions,
                    ...result2.content
                ];
			}
        },
        missionTypeOnChange(event) {
			if (
				event.target.value == "DISCOUNT"
			) {
				this.toOptions = [
					{
                        id: "NONE",
                        value: "NONE"
                    }
				];
			} else {
				this.toOptions = [
					{
                        id: "DEPOSIT_BALANCE",
                        value: "DEPOSIT BALANCE"
                    }, {
                        id: "WITHDRAWAL_BALANCE",
                        value: "WITHDRAWAL BALANCE"
                    }
				];
			}
		},
    },
};
export { createInstance, createValidator, assign, mixin };
