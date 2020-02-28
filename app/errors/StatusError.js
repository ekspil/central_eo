class StatusError extends Error {

    constructor() {
        super()

        this.message = "Order in status, that can not be canceled"
        this.code = 10020
    }
}

module.exports = StatusError
