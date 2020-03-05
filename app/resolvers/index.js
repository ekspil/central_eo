const Mutations = require("./mutations")
const Queries = require("./queries")
const InvalidTimestampFormat = require("../errors/InvalidTimestampFormat")
const {GraphQLScalarType, Kind} = require("graphql")
const DefaultResolvers = require("./default")

const Resolvers = function (injects) {

    const {userService, saleService, itemService, itemInfoService} = injects

    const mutations = new Mutations({
        userService,
        saleService,
        itemService,
        itemInfoService
    })

    const defaultResolvers = new DefaultResolvers({
        saleService,
        itemService,
        userService
    })

    const queries = new Queries({
        saleService,
        itemService,
        userService,
        itemInfoService
    })

    return {
        Query: queries,
        Mutation: mutations,
        ...defaultResolvers,
        Timestamp: new GraphQLScalarType({
            name: "Timestamp",
            description: "Timestamp in milliseconds since 1970, in UTC timezone",
            parseValue(value) {
                return new Date(value)
            },
            serialize(value) {
                return value.getTime()
            },
            parseLiteral(ast) {
                if (ast.kind === Kind.INT) {
                    return new Date(Number(ast.value))
                } else {
                    throw new InvalidTimestampFormat()
                }
            },
        }),
    }
}


module.exports = Resolvers
