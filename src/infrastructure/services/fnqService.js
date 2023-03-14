
export default function (config) {

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return await httpClient.post(`/fnq/admin/list`, filter)
        },
        async getDetail(recordId) {
            return await httpClient.get(`/fnq/admin/${recordId}`)
        },
        async add(record) {
            return await httpClient.post(`/fnq/admin`, record)
        },
        async update(record) {
            return await httpClient.put(`/fnq/admin`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`/fnq/admin/${recordId}`)
        },
    }
}