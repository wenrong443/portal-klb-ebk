const queryString = require('query-string');

export default function (config) {

    const { httpClient } = config;

    const urlAction = {
        admin: '/redpacket/admin',
    }
    return {
        async get(recordId) {
            return httpClient.get(`${urlAction.admin}/${recordId}`)
        },
        async getAll(filter) {
            return await httpClient.get(`${urlAction.admin}/list`, filter)
        },
        async add(record) {
            return httpClient.post(`${urlAction.admin}`, record)
        },
        async uploadImage(id, file) {
            const qs = queryString.stringify({ id: id });
            return httpClient.post(`${urlAction.admin}/image?${qs}`, file)
        },
        async uploadAnimationImage(id, file) {
            const qs = queryString.stringify({ id: id });
            return httpClient.post(`${urlAction.admin}/image-animation?${qs}`, file)
        },
        async update(record) {
            return httpClient.put(`${urlAction.admin}/product`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`${urlAction.admin}/${recordId}`)
        },
    }
}