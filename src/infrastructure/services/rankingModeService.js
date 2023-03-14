// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    const url = {
        admin: '/ranking/mode/admin'
    }
    return {
        async getAll(filter) {
            return httpClient.post(`${url.admin}/list`, filter)
        },
        async getDetail(recordId) {
            return httpClient.get(`${url.admin}/${recordId}`)
        },
        async add(record) {
            return httpClient.post(`${url.admin}`, record)
        },
        async update(record) {
            return httpClient.put(`${url.admin}`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`${url.admin}/${recordId}`)
        },
    }
}