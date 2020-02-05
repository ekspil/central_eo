
function UserMutations({userService, saleService, itemService}) {

    const registerUser = async (root, args) => {
        const {input} = args

        const user = await userService.registerUser(input)

        return {
            email: user.email,
            phone: user.phone
        }

    }

    const requestToken = async (root, args) => {
        const {input} = args

        return await userService.requestToken(input)
    }



    return {
        requestToken
    }

}

module.exports = UserMutations

