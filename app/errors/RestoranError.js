class NotAuthorized extends Error {

    constructor() {
        super()

        this.message = "No such restoran"
        this.code = 10001
    }
}

module.exports = NotAuthorized
