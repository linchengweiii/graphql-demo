import { GraphQLInputObjectType, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { UserService } from '../../service/user-service'
import { Username, User } from '../../interface/user-interface'

const userService = new UserService()

/**
 * type User {
 *   username: String
 *   friends: [User]
 * }
 */
export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    username: { type: GraphQLString },
    friends: {
      type: new GraphQLList(userType),
      resolve: async (user: User) => {
        return user.friends.map((username) => userService.readUser(username))
      }
    },
  }),
})

export const userInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: GraphQLString },
    friends: { type: new GraphQLList(GraphQLString) },
  },
})

export const userFieldConfig = {
  type: userType,
  args: {
    username: { type: GraphQLString }
  },
  resolve: async (_: unknown, { username }: { username: Username }) => {
    try {
      return await userService.readUser(username)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}

export const createUserFieldConfig = {
  type: userType,
  args: {
    user: { type: userInputType }
  },
  resolve: async (_: unknown, { user }: { user: User }) => {
    try {
      await userService.createUser(user);
      return await userService.readUser(user.username)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}

export const updateUserFieldConfig = {
  type: userType,
  args: {
    user: { type: userInputType }
  },
  resolve: async (_: unknown, { user }: { user: User }) => {
    try {
      await userService.updateUser(user)
      return await userService.readUser(user.username)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}

export const deleteUserFieldConfig = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString }
  },
  resolve: async (_: unknown, { username }: { username: Username }) => {
    try {
      await userService.deleteUser(username)
      return "deleted"
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
