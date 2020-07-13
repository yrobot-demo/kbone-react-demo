// 云函数入口文件
const cloud = require('wx-server-sdk')
const graphqlWXServer = require('wx-server-graphql')
var { buildSchema } = require('graphql')

cloud.init()

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  type getName(firstName:String, lastName:String) {
    name: String
  }
`)

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  getName: param => {
    console.log(param)
    return 'Hello world!'
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext()

  return await graphqlWXServer({
    wxParams: event,
    wxContext,
    schema: schema,
    rootValue: root
  })
}
