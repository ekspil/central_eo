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


async function sendToPrinter(input, url, itemInfoService, source) {
    const data = await prepPrintBody.prepare(input, itemInfoService, source)
    const User = "Admin"; // Пользователь доступа к серверу торгового оборудования
    const Password = ""; // Пароль доступа к серверу торгового оборудования
    const body = JSON.stringify(data)
    console.log(body)
    try{
        const response = await fetch(url, {
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
        const response = await fetch(process.env.VL_STATUS_URL, {
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
