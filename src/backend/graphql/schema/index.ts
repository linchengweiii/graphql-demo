import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import {
  userFieldConfig,
  createUserFieldConfig,
  updateUserFieldConfig,
  deleteUserFieldConfig,
  userType
} from './user';

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: userFieldConfig,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: createUserFieldConfig,
      updateUser: updateUserFieldConfig,
      deleteUser: deleteUserFieldConfig,
    }
  }),
  types: [userType]
});
