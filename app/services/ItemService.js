const NotAuthorized = require("../errors/NotAuthorized")
const Permission = require("../enum/Permission")

class ItemService {

    constructor({ItemModel}) {
        this.Item = ItemModel

        this.createItems = this.createItems.bind(this)
    }

    async createItems(input, user) {
        if (!user || !user.checkPermission(Permission.CREATE_SALE)) {
            throw new NotAuthorized()
        }
        const {items} = input
        const positions = await this.Item.bulkCreate(items)
        return positions.map(its => {
            return its.id
        })
    }

}

module.exports = ItemService