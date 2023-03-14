import queryString from "query-string";

export default function (config) {
    const { httpClient } = config;

    return {
        async getAll() {
            return httpClient.get(`/static/admin/content`);
        },
        async update(filter) {
            return httpClient.post(`/static/admin/content`, filter);
        },
        async uploadImage(file) {
            return httpClient.post(`/static/admin/company-image`, file)
        },
        async uploadWebsiteLogo(file) {
            return httpClient.post(`/settings/admin/upload-website-logo`, file)
        },
        async uploadWebsiteLogo2(file) {
            return httpClient.post(`/settings/admin/upload-website-logo2`, file)
        },
        async uploadPlayLogo(file) {
            return httpClient.post(`/settings/admin/upload-play-logo`, file)
        },
        async uploadReviewLoadingBackgroundImage(file) {
            return httpClient.post(`/settings/admin/upload-review-loading-background`, file)
        },
        async uploadReviewLoadingBackgroundGif(file) {
            return httpClient.post(`/settings/admin/upload-review-loading-gif`, file)
        },
    }
}