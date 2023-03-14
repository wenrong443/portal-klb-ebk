// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return await httpClient.post(`/settings/admin/slideshow/list`, filter)
        },
        async getDetail(recordId) {
            return await httpClient.get(`/settings/admin/slideshow/${recordId}`)
        },
        async add(record) {
            return await httpClient.post(`/settings/admin/slideshow`, record)
        },
        async update(record) {
            return await httpClient.put(`/settings/admin/slideshow`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`/settings/admin/slideshow/${recordId}`)
        },
    }
}