const ItemInfo = require("../models/ItemInfo")
const NotAuthorized = require("../errors/NotAuthorized")
const Permission = require("../enum/Permission")

class ItemInfoService {

    constructor({ItemInfoModel}) {
        this.ItemInfo = ItemInfoModel

        this.getItemInfo = this.getItemInfo.bind(this)
        this.setItemInfo = this.setItemInfo.bind(this)
    }

    async getItemInfo(input) {
        const {uid, source} = input
        const where = {
            uid,
            source
        }
        const itemInfo = await this.ItemInfo.findOne({where})
        if(!itemInfo){
            return "Состав: ... К/Б/Ж/У: ..."
        }
        return itemInfo.info
    }

    async setItemInfo(input, user) {
        if (!user || !user.checkPermission(Permission.CREATE_ITEM_INFO)) {
            throw new NotAuthorized()
        }
        const {uid, source, info} = input
        const where = {
            uid,
            source
        }
        const existInfo = await this.ItemInfo.findOne({where})
        if(!existInfo){
            const itemInfo = new ItemInfo(input)
            await this.ItemInfo.create(itemInfo)
            return true
        }

        existInfo.info = info
        await existInfo.save()
        return true
    }

}

module.exports = ItemInfoService