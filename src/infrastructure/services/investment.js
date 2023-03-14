import queryString from 'query-string';

export default function (config) {

    const { httpClient } = config;

    const urlAction = {
        investment: 'investment/admin'
    }
    return {
        async getAll(filter) {
            return httpClient.post(`${urlAction.investment}/project/list`, filter)
        },
        async getDetail(recordId) {
            return httpClient.get(`${urlAction.investment}/project/${recordId}`)
        },
        async addFund(record) {
            return httpClient.post(`${urlAction.investment}/project`, record)
        },
        async update(record) {
            return httpClient.put(`${urlAction.investment}/project`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`${urlAction.investment}/project/${recordId}`)
        },
        async getBookingAll(filter) {
            const qs = queryString.stringify(filter);
            return httpClient.get(`${urlAction.investment}/booking/list?${qs}`)
        },
        
        async getBookingAllForUserDetails(userId, filter) {
            return httpClient.post(`${urlAction.investment}/booking/list/${userId}`, filter)
        },
        async uploadImage(id, file) {
            const qs = queryString.stringify({ id: id });
            return httpClient.post(`${urlAction.investment}/project/image?${qs}`, file)
        },
    }
}