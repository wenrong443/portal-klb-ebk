// TODO : implement the query string
const queryString = require('query-string');

export default function (config) {

    const urlAction = {
        setting: '/settings/admin'
    }

    const { httpClient } = config;

    return {
        async getAll(filter) {
            const qs = queryString.stringify(filter);
            return httpClient.get(`${urlAction.setting}/general/list?${qs}`)
        },
        async update(record) {
            return httpClient.put(`${urlAction.setting}/general/list`, record)
        },
        async getAllLanguage() {
            return httpClient.get(`${urlAction.setting}/language/active`);
        },
        async getAllLanguageIncludeNotActive() {
            return httpClient.get(`${urlAction.setting}/language/list`);
        },
        async addLanguage(record) {
            return httpClient.post(`${urlAction.setting}/language`, record)
        },
        async getLanguage(recordId) {
            return httpClient.get(`${urlAction.setting}/language/${recordId}`);
        },
        async updateLanguage(record) {
            return httpClient.put(`${urlAction.setting}/language`, record);
        },
        async deleteLanguage(recordId) {
            return httpClient.delete(`${urlAction.setting}/language/${recordId}`);
        },
        async getAllWhitelistIp() {
            return httpClient.get(`${urlAction.setting}/whitelistip/list`);
        },
        async addWhitelistIp(record) {
            return httpClient.post(`${urlAction.setting}/whitelistip`, record)
        },
        async deleteWhitelistIp(recordId) {
            return httpClient.delete(`${urlAction.setting}/whitelistip/${recordId}`);
        },

        async getGeneralSetting(){
            return httpClient.get(`/settings/normal-nl/general/list`);
        }
    }
}