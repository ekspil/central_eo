class Sale {
    constructor(id, restoran, status, price, source, type, payType, pin, text, extId, sendToEO) {
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
        this.sendToEO = sendToEO
    }
}

module.exports = Sale
