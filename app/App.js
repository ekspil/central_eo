const Redis = require("ioredis")
const Sequelize = require("sequelize")
const {ApolloServer} = require("apollo-server")
const typeDefs = require("../graphqlTypedefs")


const NotSendSaleCheck = require("./schedule/NotSendSaleCheck")

const Resolvers = require("./resolvers")
const ContextResolver = require("./resolvers/ContextResolver")

const SaleService = require("./services/SaleService")
const ItemService = require("./services/ItemService")
const UserService = require("./services/UserService")
const RestoranService = require("./services/RestoranService")

const Sale = require("./models/sequelize/Sale")
const Item = require("./models/sequelize/Item")
const User = require("./models/sequelize/User")
const Restoran = require("./models/sequelize/Restoran")

const redis = new Redis({
    port: 6379,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
})

class App {

    async start() {
        const sequelizeOptions = {
            host: process.env.POSTGRES_HOST,
            dialect: "postgres",
            port: process.env.POSTGRES_PORT,
            logging: process.env.NODE_ENV !== "production",
            ssl: false,
            dialectOptions: {
                ssl: false
            },
            pool: {
                max: Number(process.env.POSTGRES_POOL_MAX_CONNECTIONS),
                min: Number(process.env.POSTGRES_POOL_MIN_CONNECTIONS),
                acquire: 50000,
                idle: 10000
            },
        }

        const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, sequelizeOptions)

        const SaleModel = sequelize.define("sales", Sale)
        const ItemModel = sequelize.define("items", Item)
        const UserModel = sequelize.define("users", User)
        const RestoranModel = sequelize.define("restorans", Restoran)

        SaleModel.hasMany(ItemModel, {foreignKey: "sale_id"})

        await sequelize.authenticate()

        const services = {
            userService: undefined,
            itemService: undefined,
            restoranService: undefined,
            controllerService: undefined
        }

        services.itemService = new ItemService({ItemModel})
        services.restoranService = new RestoranService({RestoranModel})
        services.saleService = new SaleService({
            SaleModel,
            ItemModel,
            itemService: services.itemService,
            restoranService: services.restoranService,
        })
        services.userService = new UserService({
            UserModel,
            redis,
            machineService: services.machineService
        })



        const schedule = {

            notSendSaleCheck: undefined
        }
        schedule.notSendSaleCheck = new NotSendSaleCheck({
            SaleModel,
            ItemModel,
            itemService: services.itemService,
            restoranService: services.restoranService,
        })


        const populateWithBaseUsers = async () => {

            const adminUser = await services.userService.registerUser({
                email: "ekspil@yandex.ru",
                phone: "9147073304",
                password: "1!{hty@2"
            }, "ADMIN")

            adminUser.checkPermission = () => true

            const aggregatorUser = await services.userService.registerUser({
                email: "aggregator",
                phone: "9999999991",
                password: "aggregator"
            }, "AGGREGATE")

            aggregatorUser.checkPermission = () => true

            // Create test user
            const user = await services.userService.registerUser({
                email: "test",
                phone: "9999999999",
                password: "test"
            }, "USER")
            user.checkPermission = () => true
            // Create test restoran
            await services.restoranService.createRestoran({
                name: "test",
                uid: 99,
                url: "http://192.168.15.166:4000"
            }, adminUser)
            await services.restoranService.createRestoran({
                name: "БургерКинг (Светланская 56)",
                uid: 9005,
                url: "http://10.5.0.2:4000"
            }, adminUser)
            await services.restoranService.createRestoran({
                name: "БургерКинг (Некрасова 82б)",
                uid: 9017,
                url: "http://10.17.0.2:4000"
            }, adminUser)
            await services.restoranService.createRestoran({
                name: "БургерКинг (Семеновская 12)",
                uid: 9020,
                url: "http://10.20.0.2:4000"
            }, adminUser)

        }


        if (Number(process.env.FORCE_SYNC) === 1) {
            await sequelize.sync({force: true})
            await populateWithBaseUsers()
        }

        const resolvers = new Resolvers({
            ...services
        })

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            tracing: Boolean(Number(process.env.APOLLO_TRACING_ENABLED)),
            context: new ContextResolver({
                UserModel,
                redis
            }),
            /*formatError: (error) => {
                logger.error(error)

                return new Error("Internal server error")
            },*/
            introspection: process.env.NODE_ENV === "development",
            playground: process.env.NODE_ENV === "development"
        })

        const serverInfo = await server.listen(4001)

        console.log(`GraphQL Server ready at ${serverInfo.url}`)


    }
}


module.exports = App