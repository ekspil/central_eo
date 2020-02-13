const NotAuthorized = require("../errors/NotAuthorized")
const SaleNotFound = require("../errors/SaleNotFound")
const SaleExist = require("../errors/SaleExist")
const EOError = require("../errors/EOError")
const RestoranError = require("../errors/RestoranError")
const Sale = require("../models/Sale")
const {Op} = require("sequelize")
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

        const {restoran, items, status, price, payType, source, type, pin, text, extId} = input
        const restInfo = await this.restoranService.getRestoranByUid({uid: restoran}, user)
        if(!restInfo){
            throw new RestoranError()
        }
        const existSale = await this.Sale.findOne({
            where: {extId}
        })
        if(existSale){
            throw new SaleExist()
        }

        const sale = new Sale({})
        sale.restoran = restoran
        const newItems = await this.itemService.createItems({items}, user)
        sale.status = status
        sale.price = price
        sale.payType = payType
        sale.pin = pin
        sale.type = type
        sale.source = source
        sale.text = text
        sale.extId = extId
        sale.sendToEO = false
        const createdSale = await this.Sale.create(sale)
        await createdSale.setItems(newItems)

        const eores = await fetchUtils.sendToRestoran({id: createdSale.id , restoran, items, status, price, payType, source, type, pin, extId, text}, restInfo.url)
        if(!eores){
            throw new EOError()
        }
        createdSale.sendToEO = true
        await createdSale.save()

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

    async getActiveSales(restoran, user) {
        if (!user || !user.checkPermission(Permission.GET_SALES)) {
            throw new NotAuthorized()
        }

        return await this.Sale.findAll({
            where: {
            [Op.and]: [{restoran}, {createdAt: {
                    [Op.gt]: (new Date().getTime() - 24*60*60*1000)
                }},
                {[Op.or]: [{status: "PAYED"},{status: "READY"}]}]
        }
        })
    }

    async changeSaleStatus(input, user) {
        if (!user || !user.checkPermission(Permission.CHANGE_STATUS_VL)) {
            throw new NotAuthorized()
        }
        const {id, status} = input

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
