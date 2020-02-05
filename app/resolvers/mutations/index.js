const SaleMutations = require("./SaleMutations")
const UserMutations = require("./UserMutations")

function Mutations({userService, saleService, itemService}) {

    const saleMutations = new SaleMutations({userService, saleService, itemService})
    const userMutations = new UserMutations({userService, saleService, itemService})


    return {
        ...saleMutations,
        ...userMutations
    }
}

module.exports = Mutations

