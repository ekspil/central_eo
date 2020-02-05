class ItemDTO {

    constructor({id, name, price, count, station}) {
        this.id = id
        this.name = name
        this.price = price
        this.count = count
        this.station = station
    }
}

module.exports = ItemDTO
