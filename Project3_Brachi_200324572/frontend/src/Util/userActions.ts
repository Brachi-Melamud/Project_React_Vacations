import axios from "axios";
import User from "../model/user";

class UserActions {
  public async addUser(user: User): Promise<void> {
    const response = await axios.post<User>(
      "http://localhost:3001/api/addUser",
      user
    );
  }

  public async getAllUsers(): Promise<User[]> {
    const response = await axios.get<User[]>("http://localhost:3001/api/users");
    return response.data;
  }

  public async getOneUser(userId: number): Promise<User> {
    const response = await axios.get<User[]>(
      "http://localhost:3001/api/user/" + userId
    );
    return response.data[0];
  }
}

const userActions = new UserActions();
export default userActions;