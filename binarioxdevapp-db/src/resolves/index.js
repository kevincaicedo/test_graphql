const course = require('./course')
const category = require('./category')

const queries = Object.assign(course.queries, category.queries)
const mutations = Object.assign(course.mutations, category.mutations)

module.exports = {
    Query: queries,
    Mutation: mutations
}