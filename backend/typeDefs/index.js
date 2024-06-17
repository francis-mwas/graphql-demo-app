import { mergeTypeDefs } from '@graphql-tools/merge';

import userTypeDef from './user.typeDefs.js';
import expenseTypedef from './expense.typedef.js';

const mergedTypeDefs = mergeTypeDefs([userTypeDef, expenseTypedef]);

export default mergedTypeDefs;
