const Permission = require("../enum/Permission")
const Restoran = require("../models/Restoran")
const NotAuthorized = require("../errors/NotAuthorized")

class RestoranService {

    constructor({RestoranModel}) {
        this.Restoran = RestoranModel

        this.createRestoran = this.createRestoran.bind(this)
    }

    async createRestoran(input, user) {
        if (!user || !user.checkPermission(Permission.ALL_PERMISSIONS)) {
            throw new NotAuthorized()
        }
        const restoran = new Restoran(input)

        return await this.Restoran.create(restoran)
    }
    async getRestoranByUid(input, user) {
        if (!user || !user.checkPermission(Permission.CREATE_SALE)) {
            throw new NotAuthorized()
        }
        const {uid} = input
        const where = {
            uid
        }

        return await this.Restoran.findOne({where})
    }

}

module.exports = RestoranService