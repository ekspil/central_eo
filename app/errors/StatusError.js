class StatusError extends Error {

    constructor() {
        super()

        this.message = "Order already ready"
        this.code = 10020
    }
}

module.exports = StatusError
