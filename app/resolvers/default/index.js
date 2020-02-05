
const SaleResolver = require("./SaleResolver")

function DefaultResolvers({saleService, itemService, userService}) {
    const saleResolver = new SaleResolver({saleService, itemService, userService})

    return {
        Sale: saleResolver
    }
}

module.exports = DefaultResolvers
