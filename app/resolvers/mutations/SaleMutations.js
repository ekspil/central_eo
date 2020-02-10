const SaleDTO = require("../../models/dto/SaleDTO")

function SaleMutations({userService, saleService, itemService}) {

    const createSale = async (root, args, context) => {
        const {input} = args
        const {user} = context

        const sale = await saleService.createSale(input, user)

        return new SaleDTO(sale)
    }

    const changeSaleStatus = async (root, args, context) => {
        const {input} = args
        const {user} = context

        const sale = await saleService.changeSaleStatus(input, user)

        return new SaleDTO(sale)
    }

    return {
        createSale,
        changeSaleStatus
    }

}

module.exports = SaleMutations

