import type { Username, User } from "../interface/user-interface"

export class UserService {
  private users: Map<Username, User>

  constructor() {
    this.users = new Map<Username, User>([
      ["guest1", { username: "guest1", friends: ["guest2", "guest3"] }],
      ["guest2", { username: "guest2", friends: ["guest1", "guest4"] }],
      ["guest3", { username: "guest3", friends: ["guest1"] }],
      ["guest4", { username: "guest4", friends: ["guest2"] }],
    ]);
  }

  public async createUser(user: User) {
    if (this.users.has(user.username)) {
      return Promise.reject("The username has existed.")
    }
    return this.users.set(user.username, user)
  }

  public async readUser(username: Username) {
    if (!this.users.has(username)) {
      return Promise.reject("The username is not found.")
    }
    return this.users.get(username)
  }

  public async updateUser(user: User) {
    if (!this.users.has(user.username)) {
      return Promise.reject("The username is not found.")
    }
    return this.users.set(user.username, user)
  }

  public async deleteUser(username: Username) {
    if (!this.users.has(username)) {
      return Promise.reject("The username is not found.")
    }
    return this.users.delete(username)
  }
}
