const SaleDTO = require("../../models/dto/SaleDTO")

function SaleQueries({userService, saleService, itemService}) {

    const getSaleStatus = async (root, args, context) => {
        const {user} = context
        const {saleId} = args

        const sales = await saleService.getSaleStatus({saleId, user})

        return sales.map(sale => (new SaleDTO(sale)))
    }

    const getActiveSales = async (root, args, context) => {
        const {user} = context
        const {restoran} = args

        const sales = await saleService.getActiveSales(restoran, user)

        return sales.map(sale => (new SaleDTO(sale)))
    }

    const getAllSales = async (root, args, context) => {
        const {user} = context
        const {input} = args

        const sales = await saleService.getAllSales(input, user)

        return sales.map(sale => (new SaleDTO(sale)))
    }

    return {
        getSaleStatus,
        getActiveSales,
        getAllSales
    }

}

module.exports = SaleQueries

