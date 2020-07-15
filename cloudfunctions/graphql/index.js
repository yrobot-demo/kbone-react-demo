// 云函数入口文件
const cloud = require('wx-server-sdk')
// const { graphqlWXServer } = require('wx-server-graphql')
const { mergeSchema } = require('./utils/graphql')
const { graphql } = require('graphql')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await graphql({
    schema: mergeSchema,
    source: event.query,
    variableValues: event.variables,
    operationName: event.operationName,
    contextValue: wxContext
  })
  // return await graphqlWXServer({
  //   wxParams: event,
  //   context: wxContext,
  //   schema: mergeSchema
  // })
}
