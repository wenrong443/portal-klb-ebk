/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
'use strict'

const path = require('path')

module.exports = {
    resolve: function (dir) {
        return path.join(__dirname, '..', dir)
    }
}