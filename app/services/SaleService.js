const NotAuthorized = require("../errors/NotAuthorized")
const Sale = require("../models/Sale")
const Item = require("../models/Item")
const Permission = require("../enum/Permission")

class SaleService {

    constructor({SaleModel, ItemModel, itemService}) {
        this.Sale = SaleModel
        this.Item = ItemModel
        this.itemService = itemService

        this.createSale = this.createSale.bind(this)
        this.getSaleStatus = this.getSaleStatus.bind(this)


    }


    async createSale(input, user) {
        if (!user || !user.checkPermission(Permission.CREATE_SALE)) {
            throw new NotAuthorized()
        }

        const {restoran, items, status, price} = input

        const sale = new Sale()
        sale.restoran = restoran
        const arrayItems = items.split("/")
        const checkedItems = arrayItems.map(it => {
            const itArray = it.split("@")
            return new Item({
                name: itArray[0],
                price: itArray[1],
                count: itArray[2],
                station: itArray[3]
            })
        })
        console.log(checkedItems)
        const newItems = await this.itemService.createItems({items:checkedItems}, user)
        sale.status = status
        sale.price = price
        console.log(sale)
        console.log(newItems)
        const createdSale = await this.Sale.create(sale)
        createdSale.setItems(newItems)
        return true
    }

    async getSaleStatus(saleId, user) {
        if (!user || !user.checkPermission(Permission.GET_SALES)) {
            throw new NotAuthorized()
        }

        return await this.Sale.findOne({
            where: {id: saleId}
        })
    }

}

module.exports = SaleService
