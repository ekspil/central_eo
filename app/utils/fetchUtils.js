const fetch = require("node-fetch")

async function sendToRestoran(sale, url) {
    const body = JSON.stringify(sale)
    console.log(body)
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
            throw new DepositRequestFailed()
    }

}



module.exports = {
    sendToRestoran
}
