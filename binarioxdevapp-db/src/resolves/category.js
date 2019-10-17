
 const queries = {
    categories(parent, args, context) {
        return []
    },
    categoryById(parent, { _id }, context) {
        return {}
    },
}

const mutations = {
    saveCategory(parent, { input }, context){
        return {}
    },
    editCategory(parent, { _id, input }, context){
        return {}
    },
    deleteCategory(parent, { _id }, context){
        return false
    }
}

module.exports = {
    queries: queries,
    mutations: mutations
}