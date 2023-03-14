import queryString from 'query-string';

export default function (config) {

    const { httpClient } = config;

    const urlAction = {
        mine: 'mine/admin'
    }
    return {
        async getAll(filter) {
            return httpClient.post(`${urlAction.mine}/product/list`, filter)
        },
        async getAll2() {
            return httpClient.get(`${urlAction.mine}/product/list2`)
        },
        async getDetail(recordId) {
            return httpClient.get(`${urlAction.mine}/product/${recordId}`)
        },
        async addFund(record) {
            return httpClient.post(`${urlAction.mine}/product`, record)
        },
        async update(record) {
            return httpClient.put(`${urlAction.mine}/product`, record)
        },
        async delete(recordId) {
            return httpClient.delete(`${urlAction.mine}/product/${recordId}`)
        },
        // async getBookingAll(filter) {
        //     const qs = queryString.stringify(filter);
        //     return httpClient.get(`${urlAction.investment}/booking/list?${qs}`)
        // },
        // async getBookingAllForUserDetails(userId, filter) {
        //     return httpClient.post(`${urlAction.investment}/booking/list/${userId}`, filter)
        // },
        async uploadImage(id, file) {
            const qs = queryString.stringify({ id: id });
            return httpClient.post(`${urlAction.mine}/product/image?${qs}`, file)
        },
        async uploadImagePackage(id, file) {
            const qs = queryString.stringify({ id: id });
            return httpClient.post(`${urlAction.mine}/package/image?${qs}`, file)
        },
        async getBookingAll(filter) {
            const qs = queryString.stringify(filter);
            return httpClient.get(`${urlAction.mine}/booking/list?${qs}`)
        },
        async getBookingAll2(filter, record) {
            return httpClient.post(`${urlAction.mine}/booking/list2?status=${filter}`, record)
        },
        async getPriceInfo(recordId) {
            return httpClient.get(`mine/exchange/info/${recordId}`)
        },
        async updatePrice(data) {
            return httpClient.post(`mine/admin/update/product`, data)
        },
        async getManualPrice(data, id) {
            return httpClient.post(`mine/admin/product/manual/price/` + id, data)
        },
        async getExchangeHistory(filter) {
            return httpClient.post(`mine/exchange/admin/history`, filter)
        },
        async getExchangeHistory2(userId, filter) {
            return httpClient.post(`mine/exchange/history/${userId}`, filter)
        },
        async getBookingAllForUserDetails(userId, filter) {
            return httpClient.post(`${urlAction.mine}/booking/list/${userId}`, filter)
        },
    }
}