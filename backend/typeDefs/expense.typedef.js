const expenseTypedef = `#graphql
  type Expense {
    _id: ID!
    userId: ID
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String!
    date: String!
  }
  
  type Query {
    expenses: [Expense!]
    expense(expenseId:ID!): Expense
  }
  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    updateExpense(input: UpdateExpenseInput!): Expense!
    deleteExpense(expenseId: ID!): Expense!
  }
  
  input CreateExpenseInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }
  input UpdateExpenseInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    date: String
    location: String
  }
`;
export default expenseTypedef;
