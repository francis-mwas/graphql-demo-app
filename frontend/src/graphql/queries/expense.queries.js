import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_EXPENSE = gql`
  query GetExpense($id: ID!) {
    expense(expenseId: $id) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_EXPENSE_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;
