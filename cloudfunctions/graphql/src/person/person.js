module.exports = {
  Query: {
    getPerson: (root, args, context, info) => {
      console.log({ root, args, context, info })
      const { firstName, lastName } = args
      return { name: `${firstName} ${lastName}`, age: 24 }
    }
  },
  Person: {
    family: (parent, args, context, info) => {
      console.log({ parent, args, context, info })
      const { name, age } = parent
      return name + age
    }
  }
}
