module.exports = {
  Query: {
    getPerson: (root, args, context) => {
      const { firstName, lastName } = args
      return { name: `${firstName} ${lastName}`, age: 24 }
    }
  }
}
