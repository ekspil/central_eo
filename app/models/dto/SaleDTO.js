class SaleDTO {

    constructor({id, restoran, price, status, createdAt}) {
        this.id = id
        this.restoran = restoran
        this.status = status
        this.price = price
        this.createdAt = createdAt
    }
}

module.exports = SaleDTO
