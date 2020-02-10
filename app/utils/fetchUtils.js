const fetch = require("node-fetch")
const EOError = require("../errors/EOError")

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
                throw new EOError()
        }
    }
    catch{
        throw new EOError()
    }


}



module.exports = {
    sendToRestoran
}
