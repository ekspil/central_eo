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
        text: String
        extId: String
        createdAt: Timestamp!
    }
    
    input Period {
        from: Timestamp!
        to: Timestamp!
    }

        
    input getAllSalesInput {
        period: Period
        statuses: [SaleStatus!]
        restorans: [Int!]!
    }

    type Query {
        getSaleStatus(id: Int!): Sale
        getActiveSales(restoran: Int!): [Sale]
        getAllSales(input: getAllSalesInput!): [Sale]
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
        text: String
        extId: String
    }

    input ChangeSaleStatusInput {
        id: Int
        status: SaleStatus!        
    }
    
    input ItemInput {
        code: Int!
        count: Int!
        name: String!
        station: Int!
        price: Float!
        info: String
    }    
    input ItemInfoInput {
        uid: Int!
        source: String!
        info: String!
    }

    type Mutation {
        requestToken(input: RequestTokenInput!): String
        createSale(input: SaleInput!): Sale!
        changeSaleStatus(input: ChangeSaleStatusInput!): Sale!
        setItemInfo(input: ItemInfoInput!): Boolean
    }
`

module.exports = typeDefs
