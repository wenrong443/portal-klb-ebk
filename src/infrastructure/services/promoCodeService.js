// TODO : implement the query string
const queryString = require('query-string');

export default function (config) {

    const { httpClient } = config;

    return {
        async add(filter) {
            return await httpClient.post(`promo/admin`, filter)
        },
        async update(filter) {
            return await httpClient.put(`promo/admin`, filter)
        },
        async getAll(filter) {
            return await httpClient.post(`promo/admin/list`, filter)
        },
        async getUsageAll(filter) {
            return await httpClient.post(`promo/admin/usage/list`, filter)
        },
        async getDetails(recordId) {
            return await httpClient.get(`promo/admin/${recordId}`)
        },
        async delete(recordId){
            return await httpClient.delete(`promo/admin/${recordId}`)
        }
    }
}