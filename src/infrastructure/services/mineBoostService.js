import queryString from 'query-string';

export default function (config) {

    const { httpClient } = config;

    const urlAction = {
        mine: 'mine-boost/admin'
    }
    return {
        async getAll(filter) {
            return httpClient.post(`${urlAction.mine}/list`, filter)
        },
        async getDetail(recordId) {
            return httpClient.post(`${urlAction.mine}/${recordId}`)
        },
        async add(record) {
            return httpClient.post(`${urlAction.mine}`, record)
        },
        async update(record) {
            return httpClient.put(`${urlAction.mine}`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`${urlAction.mine}/${recordId}`)
        },
        
    }
}