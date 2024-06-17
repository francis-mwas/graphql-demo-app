import { mergeTypeDefs } from '@graphql-tools/merge';

import userTypeDef from './user.typeDefs.js';
import transactionTypedef from './transaction.typedef.js';

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypedef]);

export default mergedTypeDefs;
