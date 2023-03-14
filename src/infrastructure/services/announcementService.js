// TODO : implement the query string
const queryString = require('query-string');

export default function (config) {

    const { httpClient } = config;
    const urlAction = {
        admin: 'announcement/admin',
        user: 'announcement/user'
    }
    return {
        async getAdminAll(filter) {
            return await httpClient.post(`${urlAction.admin}/list`, filter)
        },
        async getUserAll(filter) {
            return await httpClient.post(`${urlAction.user}/list`, filter)
        },
        async getDetail(announcementId) {
            return await httpClient.get(`${urlAction.admin}/${announcementId}`)
        },
        async update(record) {
            return await httpClient.put(`${urlAction.admin}/`, record)
        },
        async add(record) {
            return await httpClient.post(`${urlAction.admin}/`, record)
        },
        async delete(recordId) {
            return await httpClient.delete(`${urlAction.admin}/${recordId}`)
        },
        async getCategoryDetail(recordId) {
            return await httpClient.post(`${urlAction.admin}/category/${recordId}`)
        },
        async getCategoryAll(filter) {
            return await httpClient.post(`${urlAction.admin}/category/list`, filter)
        },
        async updateCategory(record) {
            return await httpClient.put(`${urlAction.admin}/category`, record)
        },
        async addCategory(record) {
            return await httpClient.post(`${urlAction.admin}/category`, record)
        },
        async deleteCategory(recordId) {
            return await httpClient.delete(`${urlAction.admin}/category/${recordId}`)
        },
    }
}