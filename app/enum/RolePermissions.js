const Permission = require("./Permission")

const USER = [
    Permission.GET_PROFILE,
    Permission.CONFIRM_USER_ACTION,
    Permission.EDIT_EMAIL,
    Permission.EDIT_PASSWORD,
    Permission.GET_SALES,
    Permission.CHANGE_STATUS_VL,
    Permission.CHANGE_STATUS,


]

const AGGREGATE = [
    Permission.CREATE_SALE,
    Permission.CHANGE_STATUS_VL,
]

const RolePermissions = {
    USER,
    AGGREGATE,
    //ADMIN ROLE does not need permissions at all, he has access to all methods
    ADMIN: []
}


module.exports = RolePermissions
