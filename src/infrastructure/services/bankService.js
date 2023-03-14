// TODO : implement the query string
const queryString = require('query-string');

export default function (config) {

    const { httpClient } = config;
    const urlAction = {
        admin: 'bank/admin',
        user: 'announcement/user'
    }
    return {
        async getAdminAll(filter) {
            return await httpClient.post(`${urlAction.admin}/userbank/list`, filter)
        },
        async getUserAll(filter) {
            return await httpClient.post(`${urlAction.user}/list`, filter)
        },
        async getDetail(recordId) {
            return await httpClient.get(`${urlAction.admin}/userbank/${recordId}`)
        },
        async getCategoryAll() {
            return await httpClient.post(`${urlAction.admin}/category/list`)
        },
        async update(record) {
            return await httpClient.put(`${urlAction.admin}/userbank`, record)
        },
        async add(record) {
            return await httpClient.post(`${urlAction.admin}/userbank`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`${urlAction.admin}/userbank/${recordId}`)
        },
        async getCollectMoneyBankAll(filter) {
            return await httpClient.post(`${urlAction.admin}/collectmoneybank/list`, filter)
        },
        async addCollectMoneyBank(record) {
            return await httpClient.post(`${urlAction.admin}/collectmoneybank`, record)
        },
        async getCollectMoneyBankDetail(recordId) {
            return await httpClient.get(`${urlAction.admin}/collectmoneybank/${recordId}`)
        },
        async updateCollectMoneyBankDetail(record) {
            return await httpClient.put(`${urlAction.admin}/collectmoneybank`, record)
        },
        async deleteCollectMoneyBankDetail(recordId) {
            return await httpClient.delete(`${urlAction.admin}/collectmoneybank/${recordId}`)
        },
        async getUserBindBankAll(userId, filter) {
            return await httpClient.post(`${urlAction.admin}/userbindbank/list/${userId}`, filter)
        },
        async updateUserBank(recordId, filter) {
            return await httpClient.put(`bank/userbindbank/${recordId}`, filter)
        },
        async deleteUserBindBank(recordId) {
            return await httpClient.delete(`bank/userbindbank/${recordId}`)
        },
    }
}