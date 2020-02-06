class ItemDTO {

    constructor({id, code, name, price, count, station}) {
        this.id = id
        this.code = code
        this.name = name
        this.price = price
        this.count = count
        this.station = station
    }
}

module.exports = ItemDTO
