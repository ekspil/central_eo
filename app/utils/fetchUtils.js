const fetch = require("node-fetch")
const prepPrintBody = require("../utils/prepPrintBody")

async function sendToRestoran(sale, url) {
    const body = JSON.stringify(sale)
    try{
        const response = await fetch(`${url}/fullCheck`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })

        switch (response.status) {
            case 200:
                return true
            default:
                return false
        }
    }
    catch{
        return false
    }


}
async function deleteInRestoran(sale, url) {
    const body = JSON.stringify(sale)
    try{
        const response = await fetch(`${url}/deleteFullCheck`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })

        switch (response.status) {
            case 200:
                return true
            default:
                return false
        }
    }
    catch{
        return false
    }


}


async function sendToPrinter(input) {

    const data = prepPrintBody.prepare(input)
    const UrlServer = "http://10.5.0.2:5893//Execute"; // HTTP адрес сервера торгового оборудования, если пусто то локальный вызов TODO сделать забор адреса из информации
    const User = "Admin"; // Пользователь доступа к серверу торгового оборудования
    const Password = ""; // Пароль доступа к серверу торгового оборудования
    const body = JSON.stringify(data)
    try{
        const response = await fetch(UrlServer, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Buffer.from(User + ":" + Password).toString('base64')
            },
            body
        })

        switch (response.status) {
            case 200:
                return true
            default:
                return false
        }
    }
    catch{
        return false
    }


}


async function sendStatusToVL(input) {
    const body = JSON.stringify(input)
    try{
        const response = await fetch(`http://proxy-stage.vl.ru/external/burger-king/order/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })

        switch (response.status) {
            case 200:
                return true
            default:
                return false
        }
    }
    catch{
        return false
    }


}



module.exports = {
    sendToRestoran,
    sendToPrinter,
    sendStatusToVL,
    deleteInRestoran
}
