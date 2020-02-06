const {gql} = require("apollo-server")

const typeDefs = gql`
    scalar Timestamp
    enum SaleStatus {
        PAYED
        READY
        COOKING
        DELIVERING
        CLOSED
        CANCELED
    }
    
    type Item {
        id: Int!
        code: Int!
        count: Int!
        name: String!
        station: Int!
        price: Float!
        
    }
    
    type Sale {
        id: Int!
        price: Float!
        items: [Item!]!
        restoran: Int!
        status: SaleStatus!
        createdAt: Timestamp!
    }

    type Query {
        getSaleStatus(id: Int!): Sale
    }

    input RequestTokenInput {
        phone: String!
        password: String!
    }

    input SaleInput {
        restoran: Int!
        items: String!
        price: Float!
        status: SaleStatus!
    }

    type Mutation {
        requestToken(input: RequestTokenInput!): String
        createSale(input: SaleInput!): Sale!
    }
`

module.exports = typeDefs
