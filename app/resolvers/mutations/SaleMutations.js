const SaleDTO = require("../../models/dto/SaleDTO")

function SaleMutations({userService, saleService, itemService}) {

    const createSale = async (root, args, context) => {
        const {input} = args
        const {user} = context

        const sale = await saleService.createSale(input, user)

        return new SaleDTO(sale)
    }

    return {
        createSale,
    }

}

module.exports = SaleMutations

