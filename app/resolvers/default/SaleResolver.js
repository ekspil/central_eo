const ItemDTO = require("../../models/dto/ItemDTO")

function SaleResolver({saleService, itemService, userService}) {

    const items = async (obj, args, context) => {
        const {user} = context

        const pitems = await itemService.getSaleItems(obj, user)
        return pitems.map(item =>  new ItemDTO(item))
    }

    return {
        items,
    }

}

module.exports = SaleResolver
