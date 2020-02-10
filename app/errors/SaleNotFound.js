class NotAuthorized extends Error {

    constructor() {
        super()

        this.message = "Sale not found"
    }
}

module.exports = NotAuthorized
