// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async addTask(record) {
            return await httpClient.post(`/review/admin`, record)
        },
        async updateTask(record, recordId) {
            return await httpClient.put(`/review/admin/${recordId}`, record)
        },
        async deleteTask(recordId) {
            return await httpClient.delete(`/review/admin/${recordId}`)
        },
        async getAllTask(filter) {
            return await httpClient.post(`/review/admin/list`, filter)
        },
        async getTaskDetail(recordId) {
            return await httpClient.get(`/review/admin/${recordId}`)
        },
        async approveDenyTask(record) {
            return await httpClient.post(`/review/admin/approve-deny-task`, record)
        },
        async assignSpecialTask(record) {
            return await httpClient.post(`/review/admin/assign-special-task`, record)
        },
        async getAllTaskTaken(filter) {
            return await httpClient.post(`/review/admin/booking/list`, filter)
        },
        async releaseOnHoldTask(record) {
            return await httpClient.post(`/review/admin/release-onhold-task`, record)
        },
        async removeSpecialTask(recordId) {
            return await httpClient.delete(`/review/admin/remove-special-task/${recordId}`)
        },
        async getAllSpcialTaskByUser(filter) {
            return await httpClient.post(`/review/admin/special-task-by-user/list`, filter)
        },
        async getAllSpcialTaskList(filter) {
            return await httpClient.post(`/review/admin/special-task/list`, filter)
        },
    }
}