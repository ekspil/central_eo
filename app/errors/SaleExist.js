class NotAuthorized extends Error {

    constructor() {
        super()

        this.message = "Sale already exist"
    }
}

module.exports = NotAuthorized
