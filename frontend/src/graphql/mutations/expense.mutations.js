import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
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

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($input: UpdateExpenseInput!) {
    updateExpense(input: $input) {
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

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($expnseId: ID!) {
    deleteExpense(expenseId: $expnseId) {
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
