require("dotenv").config()
const App = require("./app/App")
const app = new App()

app
    .start()
    .then(() => {
        console.log("CENTRAL EO GraphQL API started")
    })
    .catch(e => {
        console.log("Failed to start CENTRAL EO GraphQL API." + e)
        console.log(e.stack)
    })