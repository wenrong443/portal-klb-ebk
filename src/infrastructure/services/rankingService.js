// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return httpClient.post(`/ranking/admin/list`, filter)
        },
        async getDetail(recordId) {
            return httpClient.get(`/ranking/admin/${recordId}`)
        },
        async add(record) {
            return httpClient.post(`/ranking/admin`, record)
        },
        async update(record) {
            return httpClient.put(`/ranking/admin`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`/ranking/admin/${recordId}`)
        },
    }
}