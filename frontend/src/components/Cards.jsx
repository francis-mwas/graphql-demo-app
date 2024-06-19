import { useQuery } from '@apollo/client';
import Card from './Card';
import { GET_EXPENSES } from '../graphql/queries/expense.queries';
// import { GET_EXPENSE } from '../graphql/queries/expense.queries';
// import { GET_AUTHENTICATED_USERS } from '../graphql/queries/user.queries';

const Cards = () => {
  const { data, loading } = useQuery(GET_EXPENSES);
  // const { data: authUser } = useQuery(GET_AUTHENTICATED_USERS);

  console.log('The data: ', data);
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.expenses.map((expense) => (
            <Card key={expense._id} expenseData={expense} />
          ))}
      </div>
      {!loading && data?.expenses.length === 0 && (
        <p className="text-2xl font-bold text-center w-ful">
          No expenses found
        </p>
      )}
    </div>
  );
};
export default Cards;
