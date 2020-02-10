class Sale {
    constructor(id, restoran, status, price, source, type, payType, pin, text, extId) {
        this.id = id
        this.restoran = restoran
        this.payType = payType
        this.status = status
        this.source = source
        this.type = type
        this.pin = pin
        this.price = price
        this.text = text
        this.extId = extId
    }
}

module.exports = Sale
