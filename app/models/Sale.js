class Sale {
    constructor(id, restoran, status, price, source, type, payType, pin) {
        this.id = id
        this.restoran = restoran
        this.payType = payType
        this.status = status
        this.source = source
        this.type = type
        this.pin = pin
        this.price = price
    }
}

module.exports = Sale
