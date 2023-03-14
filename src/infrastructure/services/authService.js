// TODO : implement the query string

export default function (config) {

    const { noAuthHttpClient, httpClient } = config;
    const urlAction = {
        auth: 'auth'
    };

    return {
        async login(record) {
            return noAuthHttpClient.post(`${urlAction.auth}/admin`, record)
        },
        async userLogin(record) {
            return noAuthHttpClient.post(`${urlAction.auth}/normal`, record)
        },
        async logout(record = {}) {
            return httpClient.post(`${urlAction.auth}/logout`, record)
        }
    }
}