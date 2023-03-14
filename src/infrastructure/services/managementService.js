// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getUserAll(filter) {
            return await httpClient.post(`/management/admin/user/list`, filter)
        },
        async getUserDetail(recordId) {
            return await httpClient.post(`/management/admin/user/${recordId}`)
        },
        async addUser(record) {
            return await httpClient.post(`/management/admin/user`, record)
        },
        async updateUser(record) {
            return await httpClient.put(`/management/admin/user`, record)
        },
        async deleteUser(recordId) {
            return await httpClient.delete(`/management/admin/user/${recordId}`)
        },
        async getDepartmentAll(filter) {
            return await httpClient.post(`/management/admin/department/list`, filter)
        },
        async getDepartmentAllActive() {
            return await httpClient.get(`/management/admin/department/active/list`)
        },
        async getDepartmentDetail(recordId) {
            return await httpClient.post(`/management/admin/department/${recordId}`)
        },
        async addDepartment(record) {
            return await httpClient.post(`/management/admin/department`, record)
        },
        async updateDepartment(record) {
            return await httpClient.put(`/management/admin/department`, record)
        },
        async deleteDepartment(recordId) {
            return await httpClient.delete(`/management/admin/department/${recordId}`)
        },
    }
}