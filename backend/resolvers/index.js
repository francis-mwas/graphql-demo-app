import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import expenseResolver from './expense.resolver.js';


const mergedResolvers = mergeResolvers([userResolver, expenseResolver]);

export default mergedResolvers;