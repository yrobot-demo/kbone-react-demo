// 云函数入口文件
const cloud = require('wx-server-sdk')
const { graphqlWXServer } = require('wx-server-graphql')
const { mergeSchema } = require('./utils/graphql')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await graphqlWXServer({
    wxParams: event,
    context: wxContext,
    schema: mergeSchema
  })
}
