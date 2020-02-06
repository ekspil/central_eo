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
                code: itArray[0],
                name: itArray[1],
                price: itArray[2],
                count: itArray[3],
                station: itArray[4]
            })
        })
        const newItems = await this.itemService.createItems({items:checkedItems}, user)
        sale.status = status
        sale.price = price
        const createdSale = await this.Sale.create(sale)
        await createdSale.setItems(newItems)
        return createdSale
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
