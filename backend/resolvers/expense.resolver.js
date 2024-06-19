import Expense from '../models/expnse.model.js';

const expenseResolver = {
  Query: {
    expenses: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error('Unauthorized');
        const userId = await context.getUser()._id;

        const expenses = await Expense.find({ userId });
        return expenses;
      } catch (err) {
        console.error('Error getting expenses:', err);
        throw new Error('Error getting expenses');
      }
    },
    expense: async (_, { expenseId }) => {
      try {
        const expense = await Expense.findById(expenseId);
        console.log('Backend data: ', expense);
        return expense;
      } catch (err) {
        console.error('Error while retrieving expense:', err);
        throw new Error('Error retreiving expense');
      }
    },
  },
  Mutation: {
    createExpense: async (_, { input }, context) => {
      try {
        const newExpense = new Expense({
          ...input,
          userId: context.getUser()._id,
        });
        await newExpense.save();
        return newExpense;
      } catch (err) {
        console.error('Error while creating the expense:', err);
        throw new Error('Error while creating expense');
      }
    },
    updateExpense: async (_, { input }) => {
      try {
        const updatedExpense = await Expense.findByIdAndUpdate(
          input.transactionId,
          input,
          {
            new: true,
          }
        );
        console.log('The updated data: ', updatedExpense);
        return updatedExpense;
      } catch (err) {
        console.error('Error while updating an expense:', err);
        throw new Error('Error while updating an expense');
      }
    },
    deleteExpense: async (_, { expenseId }) => {
      try {
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        return deletedExpense;
      } catch (err) {
        console.error('Error while deleting an expense:', err);
        throw new Error('Error while deleting an expense');
      }
    },
  },
};

export default expenseResolver;
