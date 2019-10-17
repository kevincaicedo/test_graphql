const { gql } = require('apollo-server-express')

const course = gql`
    type Course {
        _id: ID!
        title: String!
        teacher: String
        description: String
        category: Category
        media: CourseMedia
    }

    type CourseMedia {
        image: String,
        video: String,
        icon: String
    }

    input CourseMediaInput {
        image: String,
        video: String,
        icon: String
    }

    input CourseInput {
        title: String!
        teacher: String
        description: String!
        category: CategoryInput
        media: CourseMediaInput
    }

    extend type Query {
        "Get all courses"
        courses: [Course]!
        "Find a course by id"
        courseById(_id: ID!): Course!
    }

    extend type Mutation {
        "Create a new course"
        saveCourse(
            input: CourseInput!
        ): Course!
        "Edit existent course by id"
        editCourse(
            _id: ID!
            input: CourseInput!
        ): Course!
        "Delete a existent course by id"
        deleteCourse(
           _id: ID! 
        ): Boolean!
    }
`

module.exports = course