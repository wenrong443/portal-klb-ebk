// TODO : implement the query string
const queryString = require('query-string');

export default function (config) {

    const urlAction = {
        statistic: '/statistics'
    }

    const { httpClient } = config;

    return {
        async getGeneralAll() {
            return httpClient.get(`${urlAction.statistic}/general`)
        },
        async getGeneralAll2() {
            return httpClient.get(`${urlAction.statistic}/general2`)
        },
        async getMineAll() {
            return httpClient.get(`${urlAction.statistic}/mine`)
        },
        async getAllGameInvest(filter) {
            const qs = queryString.stringify(filter);
            return httpClient.get(`${urlAction.statistic}/game-invest?${qs}`);
        },
        async geBurceForceIPAll(limit) {
            return httpClient.get(`${urlAction.statistic}/bruce-force-ip?limit=${limit}`)
        },
    }
}