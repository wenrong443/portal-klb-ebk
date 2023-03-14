// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return await httpClient.post(`/mission/admin/list`, filter)
        },
        async getDetail(recordId) {
            return await httpClient.get(`/mission/admin/${recordId}`)
        },
        async add(record) {
            return await httpClient.post(`/mission/admin`, record)
        },
        async update(record) {
            return await httpClient.put(`/mission/admin`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`/mission/admin/${recordId}`)
        },
    }
}