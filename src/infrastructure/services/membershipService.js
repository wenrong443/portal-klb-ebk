// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return await httpClient.post(`/membership/admin/list`, filter)
        },
        async getDetail(recordId) {
            return await httpClient.get(`/membership/admin/${recordId}`)
        },
        async add(record) {
            return await httpClient.post(`/membership/admin`, record)
        },
        async update(record) {
            return await httpClient.put(`/membership/admin`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`/membership/admin/${recordId}`)
        },
        async uploadImage(record) {
            return await httpClient.post(`/membership/admin/image`, record)
        },
    }
}