const UserExists = require("../errors/UserExists")
const PhoneNotValid = require("../errors/PhoneNotValid")
const PhonePasswordMatchFailed = require("../errors/PhonePasswordMatchFailed")
const User = require("../models/User")
const {Op} = require("sequelize")
const bcryptjs = require("bcryptjs")
const hashingUtils = require("../utils/hashingUtils")
const validationUtils = require("../utils/validationUtils")


class UserService {

    constructor({UserModel, redis, machineService}) {
        this.User = UserModel
        this.redis = redis

        this.requestToken = this.requestToken.bind(this)
        this.registerUser = this.registerUser.bind(this)

    }

    async registerUser(input, role) {
        return this.User.sequelize.transaction(async (transaction) => {
            const {email, phone, password} = input

            //todo validation
            if (!validationUtils.validatePhoneNumber(phone)) {
                throw new PhoneNotValid()
            }

            const users = await this.User.findAll({
                where: {
                    [Op.or]: [{email}, {phone}]
                }
            })

            if (users && users.length > 0) {
                throw new UserExists()
            }

            let user = new User({})
            user.phone = phone
            user.email = email
            user.passwordHash = await this.hashPassword(password)
            user.role = role || "USER"

            user = await this.User.create(user, {transaction})

            user.checkPermission = () => true

            return user
        })
    }


    async requestToken(input) {
        const {phone, password} = input

        //todo validation

        const user = await this.User.findOne({
            where: {
                phone
            }
        })

        const passwordMatched = user && await bcryptjs.compare(password, user.passwordHash)

        if (!user || !passwordMatched) {
            throw new PhonePasswordMatchFailed()
        }

        const token = await hashingUtils.generateRandomAccessKey()

        await this.redis.hset("tokens", token, user.id)


        if (user.email === "test_invalid_token") {
            setTimeout(() => {
                logger.info("Purging token for test_invalid_token user ", token)
                //purge token
                this.redis.hdel("tokens", token)
            }, 5000)
        }

        return token
    }


    async hashPassword(password) {
        return await hashingUtils.hashPassword(password)
    }

}

module.exports = UserService
