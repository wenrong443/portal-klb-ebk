export default function (config) {

    const urlAction = {
        referrer: '/change-referrer/admin'
    }

    const { httpClient } = config;

    return {
        async getAll(filter) {
            return httpClient.post(`${urlAction.referrer}/list`, filter);
        },
        async add(record) {
            return httpClient.post(`${urlAction.referrer}`, record);
        },
    }
}