class NotAuthorized extends Error {

    constructor() {
        super()

        this.message = "Can't send status to VL"
        this.code = 10005
    }
}

module.exports = NotAuthorized
