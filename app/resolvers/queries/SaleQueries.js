const SaleDTO = require("../../models/dto/SaleDTO")

function SaleQueries({userService, saleService, itemService}) {

    const getSaleStatus = async (root, args, context) => {
        const {user} = context
        const {saleId} = args

        const sales = await saleService.getSaleStatus({saleId, user})

        return sales.map(sale => (new SaleDTO(sale)))
    }

    return {
        getSaleStatus
    }

}

module.exports = SaleQueries

