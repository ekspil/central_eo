const SaleDTO = require("../../models/dto/SaleDTO")

function SaleMutations({userService, saleService, itemService, itemInfoService}) {

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

    const setItemInfo = async (root, args, context) => {
        const {input} = args
        const {user} = context

        return await itemInfoService.setItemInfo(input, user)
    }

    return {
        createSale,
        changeSaleStatus,
        setItemInfo
    }

}

module.exports = SaleMutations

