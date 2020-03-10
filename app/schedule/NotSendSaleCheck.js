const cron = require('node-cron')
const Sale = require("../models/Sale")
const fetchUtils = require("../utils/fetchUtils")
const EOError = require("../errors/EOError")
const Item = require("../models/Item")

class Schedule {

    constructor({SaleModel, ItemModel, itemService, restoranService}) {
        this.Sale = SaleModel
        this.Item = ItemModel
        this.itemService = itemService
        this.restoranService = restoranService



        cron.schedule('1 * * * * *', async () => {
            const notSendSales = await this.Sale.findAll({
                where: {sendToEO: false}
            })
            if(notSendSales && notSendSales.length < 1){
                return false
            }
            const user = {}
            user.checkPermission = () => true

            for(let sale of notSendSales){
                const restInfo = await this.restoranService.getRestoranByUid({uid: sale.restoran}, user)
                if(!restInfo){
                    continue
                }

                const sendingInfo = new Sale(sale)
                const items = await sale.getItems()
                sendingInfo.items = items.map(i => {
                    return new Item(i)
                })


                const result = await fetchUtils.sendToRestoran(sendingInfo, restInfo.url)
                if(!result){
                    console.log(`CRON: Ошибка отправки заказа - ${sendingInfo.extId} в ресторан ${sendingInfo.restoran}`)
                    continue
                }
                sale.sendToEO = true
                await sale.save()
                console.log(`CRON: Успешно отправлен заказ - ${sendingInfo.extId} в ресторан ${sendingInfo.restoran}`)

            }


        });

    }

}

module.exports = Schedule