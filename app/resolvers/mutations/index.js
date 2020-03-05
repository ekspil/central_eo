const SaleMutations = require("./SaleMutations")
const UserMutations = require("./UserMutations")

function Mutations({userService, saleService, itemService, itemInfoService}) {

    const saleMutations = new SaleMutations({userService, saleService, itemService, itemInfoService})
    const userMutations = new UserMutations({userService, saleService, itemService})


    return {
        ...saleMutations,
        ...userMutations
    }
}

module.exports = Mutations

