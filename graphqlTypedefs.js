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
    
     enum PayType {
        CASH
        CARD
        ONLINE
        BONUS
    }    
     enum Type {
        IN
        OUT
        INAPP
        OUTAPP
        DELIVERY
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
        payType: PayType!
        source: String!
        type: String!
        pin: String
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
        id: Int
        restoran: Int!
        items: [ItemInput!]!
        price: Float!
        status: SaleStatus!        
        source: String!
        pin: String
        type: Type!
        payType: PayType!
    }
    
    input ItemInput {
        code: Int!
        count: Int!
        name: String!
        station: Int!
        price: Float!
    }

    type Mutation {
        requestToken(input: RequestTokenInput!): String
        createSale(input: SaleInput!): Sale!
    }
`

module.exports = typeDefs
