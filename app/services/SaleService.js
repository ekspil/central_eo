const NotAuthorized = require("../errors/NotAuthorized")
const SaleNotFound = require("../errors/SaleNotFound")
const Sale = require("../models/Sale")
const Item = require("../models/Item")
const Permission = require("../enum/Permission")
const fetchUtils = require("../utils/fetchUtils")

class SaleService {

    constructor({SaleModel, ItemModel, itemService, restoranService}) {
        this.Sale = SaleModel
        this.Item = ItemModel
        this.itemService = itemService
        this.restoranService = restoranService

        this.createSale = this.createSale.bind(this)
        this.getSaleStatus = this.getSaleStatus.bind(this)


    }


    async createSale(input, user) {
        if (!user || !user.checkPermission(Permission.CREATE_SALE)) {
            throw new NotAuthorized()
        }

        const {restoran, items, status, price, payType, source, type, pin} = input
        const restInfo = await this.restoranService.getRestoranByUid({uid: restoran}, user)

        const sale = new Sale()
        sale.restoran = restoran
        const newItems = await this.itemService.createItems({items}, user)
        sale.status = status
        sale.price = price
        sale.payType = payType
        sale.pin = pin
        sale.type = type
        sale.source = source
        const createdSale = await this.Sale.create(sale)
        await createdSale.setItems(newItems)

        await fetchUtils.sendToRestoran({id: createdSale.id , restoran, items, status, price, payType, source, type, pin}, restInfo.url)

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

    async changeSaleStatus(input, user) {
        if (!user || !user.checkPermission(Permission.CHANGE_STATUS_VL)) {
            throw new NotAuthorized()
        }
        const {id, status} = input
        if (status !== "CLOSED" && !user.checkPermission(Permission.CHANGE_STATUS)){
            throw new NotAuthorized()
        }

        const sale = await this.Sale.findOne({
            where: {id}
        })
        if(!sale){
            throw new SaleNotFound()
        }
        sale.status = status
        return sale.save()
    }

}

module.exports = SaleService
