import queryString from 'query-string';

export default function (config) {

    const { httpClient } = config;

    const urlAction = {
        mine: 'mine/admin'
    }
    return {
        async getAll(filter) {
            return httpClient.post(`${urlAction.mine}/package/list`, filter)
        },
        async getDetail(recordId) {
            return httpClient.get(`${urlAction.mine}/package/${recordId}`)
        },
        async addFund(record) {
            return httpClient.post(`${urlAction.mine}/package`, record)
        },
        async update(record) {
            return httpClient.put(`${urlAction.mine}/package`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`${urlAction.mine}/package/${recordId}`)
        },


        async getAllSchedule(filter) {
            return httpClient.post(`mine-package-schedule/admin/list`, filter)
        },
        async getDetailSchedule(recordId) {
            return httpClient.get(`mine-package-schedule/admin/${recordId}`)
        },
        async addSchedule(record) {
            return httpClient.post(`mine-package-schedule/admin`, record)
        },
        async updateSchedule(record) {
            return httpClient.put(`mine-package-schedule/admin`, record)
        },
        async deleteSchedule(recordId) {
            return httpClient.delete(`mine-package-schedule/admin/${recordId}`)
        },
        // async getBookingAll(filter) {
        //     const qs = queryString.stringify(filter);
        //     return httpClient.get(`${urlAction.investment}/booking/list?${qs}`)
        // },
        
    }
}