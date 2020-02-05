const ItemDTO = require("../../models/dto/ItemDTO")

function SaleMutations({userService, saleService, itemService}) {

    const createSale = async (root, args, context) => {
        const {input} = args
        const {user} = context

        const sale = await saleService.createSale(input, user)

        return true
    }

    return {
        createSale,
    }

}

module.exports = SaleMutations

