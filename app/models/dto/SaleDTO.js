class SaleDTO {

    constructor({id, restoran, price, status, payType, source, type, pin, text, extId, createdAt}) {
        this.id = id
        this.restoran = restoran
        this.status = status
        this.payType = payType
        this.price = price
        this.source = source
        this.type = type
        this.pin = pin
        this.text = text
        this.extId = extId
        this.createdAt = createdAt
    }
}

module.exports = SaleDTO
