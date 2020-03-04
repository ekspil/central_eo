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


async function sendToPrinter(input, url) {
    const data = prepPrintBody.prepare(input)
    const User = "Admin"; // Пользователь доступа к серверу торгового оборудования
    const Password = ""; // Пароль доступа к серверу торгового оборудования
    const body = JSON.stringify(data)
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
        const response = await fetch(`http://proxy-stage.vl.ru/external/burger-king/order/status?auth_token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXUyJ9.eyJ1c2VybmFtZSI6ImJ1cmdlcl9raW5nIiwiaWF0IjoxNTgzMzA1Njc0fQ.yWlX_aXomm9v_ePWs1m4VYuj5S2Wwl3mRLK_6Ls2nlhGF2CRLAgvN0yjITh3S6do0ujoZBH__xyj8Iu9YafWBg`, {
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
