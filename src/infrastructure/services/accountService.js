import queryString from "query-string";

export default function (config) {

    const urlAction = {
        account: '/deposit-n-withdraw/admin'
    }

    const { httpClient } = config;

    return {
        async getPendingCount() {
            return httpClient.get(`/deposit-n-withdraw/pending-request`);
        },
        async getDepositAll(filter) {
            return httpClient.post(`${urlAction.account}/deposit/list`, filter);
        },
        async getWithdrawAll(filter) {
            return httpClient.post(`${urlAction.account}/withdraw/list`, filter);
        },
        async getManualFundAll(filter) {
            return httpClient.post(`${urlAction.account}/manualfund/list`, filter);
        },
        async uploadCSV(formData) {
            return httpClient.post(`${urlAction.account}/manualfund/import-csv`, formData);
        },
        async uploadReviewCSV(formData) {
            return httpClient.post(`/review/admin/import-csv`, formData);
        },
        async addManualFund(record) {
            return httpClient.post(`${urlAction.account}/manualfund`, record);
        },
        async createManualFundRecord(record) {
            return httpClient.post(`${urlAction.account}/create-manual-fund`, record);
        },
        async createDepositRecord(record) {
            return httpClient.post(`${urlAction.account}/create-deposit-request`, record);
        },
        async getDeposit(recordId) {
            return httpClient.get(`${urlAction.account}/deposit/${recordId}`);
        },
        async approveDeposit(recordId) {
            return httpClient.put(`${urlAction.account}/deposit/approve/${recordId}`);
        },
        async rejectDeposit(recordId) {
            return httpClient.put(`${urlAction.account}/deposit/reject/${recordId}`);
        },
        async rejectDeposit2(recordId, remark) {
            remark = encodeURIComponent(remark);
            return httpClient.put(`${urlAction.account}/deposit/reject/${recordId}?remark=${remark}`);
        },
        async getWithdraw(recordId) {
            return httpClient.get(`${urlAction.account}/withdraw/${recordId}`);
        },
        async approveWithdraw(recordId) {
            return httpClient.put(`${urlAction.account}/withdraw/approve/${recordId}`);
        },
        async rejectWithdraw(recordId, remark) {
            remark = encodeURIComponent(remark);
            return httpClient.put(`${urlAction.account}/withdraw/reject/${recordId}?remark=${remark}`);
        },
        async add(record) {
            return httpClient.post(`${urlAction.account}`, record);
        },
        async getDepositAllForUserDetails(userId, filter) {
            return httpClient.post(`${urlAction.account}/deposit/list/${userId}`, filter);
        },
        async getWithdrawAllForUserDetails(userId, filter) {
            return httpClient.post(`${urlAction.account}/withdraw/list/${userId}`, filter);
        },
        async getManualFundAllForUserDetails(userId, filter) {
            return httpClient.post(`${urlAction.account}/manualfund/list/${userId}`, filter);
        },
        async batchDeposit(record, type, remark){
            remark = encodeURIComponent(remark);
            return httpClient.post(`${urlAction.account}/deposit/batch/${type}?remark=${remark}`, record);
        },
        async batchWithdraw(record, type, remark){
            remark = encodeURIComponent(remark);
            return httpClient.post(`${urlAction.account}/withdraw/batch/${type}?remark=${remark}`, record);
        },
        async updateAmount(recordId, record) {
            const qs = queryString.stringify(record);
            return httpClient.put(`${urlAction.account}/deposit/modify/amount/${recordId}?${qs}`);
        },
    }
}