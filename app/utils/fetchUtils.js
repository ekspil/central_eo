const fetch = require("node-fetch")

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
    sendStatusToVL
}
