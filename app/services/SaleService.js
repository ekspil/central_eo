const NotAuthorized = require("../errors/NotAuthorized")
const SaleNotFound = require("../errors/SaleNotFound")
const NotSendToVL = require("../errors/NotSendToVL")
const SaleExist = require("../errors/SaleExist")
const EOError = require("../errors/EOError")
const StatusError = require("../errors/StatusError")
const RestoranError = require("../errors/RestoranError")
const Sale = require("../models/Sale")
const {Op} = require("sequelize")
const Item = require("../models/Item")
const Permission = require("../enum/Permission")
const fetchUtils = require("../utils/fetchUtils")

class SaleService {

    constructor({SaleModel, ItemModel, itemService, restoranService, itemInfoService}) {
        this.Sale = SaleModel
        this.Item = ItemModel
        this.itemService = itemService
        this.restoranService = restoranService
        this.itemInfoService = itemInfoService

        this.createSale = this.createSale.bind(this)
        this.getSaleStatus = this.getSaleStatus.bind(this)
        this.getAllSales = this.getAllSales.bind(this)


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
        sale.sendToEO = true
        const createdSale = await this.Sale.create(sale)
        await createdSale.setItems(newItems)
        if(source === "VL.RU"){

            await fetchUtils.sendToPrinter({items, extId, restInfo, price}, restInfo.kkmServerUrl,  this.itemInfoService, source)
        }
        const eores = await fetchUtils.sendToRestoran({id: createdSale.id , restoran, items, status, price, payType, source, type, pin, extId, text}, restInfo.url)
        if(!eores){
            createdSale.sendToEO = false
            await createdSale.save()
            throw new EOError()
        }


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


    async getAllSales(input, user) {
        if (!user || !user.checkPermission(Permission.GET_SALES)) {
            throw new NotAuthorized()
        }
        const {restorans, period, statuses} = input
        const date = new Date()
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        let where = {}
        if(!period){
            where = {
                [Op.and]: [{restoran: {[Op.or]: restorans}}, {createdAt: {
                        [Op.gt]: dayStart
                    }}]
            }
            if(statuses && statuses.length > 0){
                where[Op.and].push(
                    {[Op.or]: statuses.map(status => {
                            return {status}
                        })})
            }

        }else{
            where = {
                [Op.and]: [{restoran: {[Op.or]: restorans}}, {createdAt: {
                        [Op.gt]: period.from
                    }},{createdAt: {
                        [Op.lt]: period.to
                    }}]
            }
            if(statuses && statuses.length > 0){
                where[Op.and].push(
                    {[Op.or]: statuses.map(status => {
                            return {status}
                        })})
            }
        }
        return await this.Sale.findAll({
            where
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
        if(sale.source === "VL.RU" && status === "CANCELED"  ){
            if(sale.status !== "PAYED"){
                throw new StatusError()
            }
            const restInfo = await this.restoranService.getRestoranByUid({uid: sale.restoran}, user)
            if(!restInfo){
                throw new RestoranError()
            }
            const result = await fetchUtils.deleteInRestoran({id, status}, restInfo.url)
            if(!result){
                throw new EOError()
            }
        }
        if(sale.source === "VL.RU" && status === "READY" ){
            const result = await fetchUtils.sendStatusToVL({id, status})
            if(!result){
                throw new NotSendToVL()
            }
        }
        sale.status = status
        return sale.save()
    }

}

module.exports = SaleService
