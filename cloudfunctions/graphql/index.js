// 云函数入口文件
const cloud = require('wx-server-sdk')
const { graphqlWXServer } = require('wx-server-graphql')
var { buildSchema } = require('graphql')

cloud.init()

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
    getName(firstName: String, lastName: String): String
  }
`)

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  getName: (args, context) => {
    const { firstName, lastName } = args
    return `${firstName} ${lastName}`
  },
  rollDice: (args, context) => {
    const { numDice, numSides } = args
    return [numDice, numSides]
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await graphqlWXServer({
    wxParams: event,
    context: wxContext,
    schema: schema,
    rootValue: root
  })
}
