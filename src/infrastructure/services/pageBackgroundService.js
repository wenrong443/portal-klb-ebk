// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return await httpClient.post(`/settings/admin/page-background/list`, filter)
        },
        async getDetail(recordId) {
            return await httpClient.get(`/settings/admin/page-background/${recordId}`)
        },
        async add(record) {
            return await httpClient.post(`/settings/admin/page-background`, record)
        },
        async update(record, recordId) {
            return await httpClient.put(`/settings/admin/page-background/${recordId}`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`/settings/admin/page-background//${recordId}`)
        },
    }
}