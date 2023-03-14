// TODO : implement the query string
const queryString = require('query-string');

export default function (config) {

    const { httpClient } = config;

    return {
        async getAdminAll(filter) {
            return await httpClient.post(`bank/admin/collectmoneybank/list`, filter)
        },
        
    }
}