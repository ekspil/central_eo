class NotAuthorized extends Error {

    constructor() {
        super()

        this.message = "Can't deliver message to restoran."
        this.code = 10002
    }
}

module.exports = NotAuthorized
