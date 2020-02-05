
const SaleQueries = require("./SaleQueries")

function Queries({userService, saleService, itemService}) {

    const saleQueries = new SaleQueries({userService, saleService, itemService})

    return {
        ...saleQueries
    }
}

module.exports = Queries

