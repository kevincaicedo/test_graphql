const { gql } = require('apollo-server-express')

const category = gql`
    type Category {
        _id: ID!
        name: String!
        description: String
    }

    input CategoryInput {
        name: String!
        description: String
    }

    extend type Query {
        "Get all categories"
        categories: [Category]!
        "Find a category by id"
        categoryById(_id: ID!): Category!
    }

    extend type Mutation {
        "Create a new category"
        saveCategory(
            input: CategoryInput!
        ): Category!
        "Edit existent category by id"
        editCategory(
            _id: ID!
            input: CategoryInput!
        ): Category!
        "Delete a existent category by id"
        deleteCategory(
           _id: ID! 
        ): Boolean!
    }
`

module.exports = category