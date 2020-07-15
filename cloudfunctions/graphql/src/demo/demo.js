module.exports = {
  Query: {
    rollDice: (root, args, context) => {
      const { numDice, numSides } = args
      return [numDice, numSides]
    }
  }
}
