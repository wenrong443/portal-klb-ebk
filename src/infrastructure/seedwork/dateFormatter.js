const moment = require("moment");

function formatMilliseconds(milliseconds) {
    return moment(parseInt(milliseconds)).format("DD MMM YYYY hh:mm a")
}

function formatToDateTime(dateTime) {
    return moment(dateTime).format("yyyy-MM-DD HH:mm:ss")
}

function formatToDateTimePicker(dateTime) {
    return moment(dateTime).format("YYYY-MM-DDTHH:mm")
}

function formatDate(dateTime) {
    return moment(dateTime).format('yyyy-MM-DD')
}
export {
    formatMilliseconds,
    formatDate,
    formatToDateTime,
    formatToDateTimePicker
}