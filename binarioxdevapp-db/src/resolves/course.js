'use strict'

const connectDb = require('../resource/db')
const { ObjectID } = require('mongodb')

const queries = {
    courses: async (parent, args, context) => {
        let courses = []

        try {
          const db = await connectDb()
          courses = await db.collection('courses').find().toArray()
        } catch (error) {
          console.error(error)
        }
    
        return courses
    },
    courseById: async (parent, { _id }, context) => {
        let course

        try {
            const db = await connectDb()
            course = await db.collection('courses').findOne({
                _id: ObjectID(_id)
            })
        } catch (error) {
            console.error(error)
        }

        return course
    },
}

const mutations = {
    saveCourse: async (parent, { input }, context) => {
        const defaults = {
            teacher: '',
            description: ''
        }
    
        const newCourse = Object.assign(defaults, input)
        let course
    
        try {
            const db = await connectDb()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error)
        }
    
        return newCourse
    },
    editCourse: async (parent, { _id, input }, context) => {

        let course

        try {
            const db = await connectDb()
            await db.collection('courses').updateOne(
                { _id: ObjectID(_id) },
                { $set: input }
            )
            course = await db.collection('courses').findOne(
                { _id: ObjectID(_id) }
            )
        } catch (error) {
            console.error(error)
        }

        return course
    },
    deleteCourse: async (parent, { _id }, context) => {
        let info

        try {
            const db = await connectDb()

            info = await db.collection('courses').deleteOne(
                { _id: ObjectID(_id) }
            )
        } catch (error) {
            console.error(error)
        }

        return info && info.deleteCount ? true : false
    }
}

module.exports = {
    queries: queries,
    mutations: mutations
}