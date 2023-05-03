import axios from "axios";
import Vacation from "../model/vacations";

class VacationActions {
  // CREATE
  public async addVacation(vacation: Vacation): Promise<void> {
    const response = await axios.post<Vacation>(
      "http://localhost:3001/api/addVacation",
      vacation
    );
  }

  // READ
  public async getAllVacations(): Promise<Vacation[]> {
    const response = await axios.get<Vacation[]>(
      `http://localhost:3001/api/vacations`
    );
    return response.data;
  }
  public async getAllVacationsPagination(
    pageNumber: number,
    currentUserId: number
  ): Promise<Vacation[]> {
    const response = await axios.get<Vacation[]>(
      `http://localhost:3001/api/vacations/` + pageNumber
    );
    // for (let i = 0; i < response.data.length; i++) {
    //   const vacation = response.data[i];
    //   console.log("vacation: ", vacation);
    //   console.log("currentUserId:",currentUserId);
      
    // }
    return response.data;
  }

  public async getOneVacation(vacationId: number): Promise<Vacation> {
    const response = await axios.get<Vacation[]>(
      "http://localhost:3001/api/vacation/" + vacationId
    );
    return response.data[0];
  }

  public async getUserVacations(userId: number): Promise<Vacation[]> {
    const response = await axios.get<Vacation[]>(
      "http://localhost:3001/api/myVacations/" + userId
    );
    return response.data;
  }

  public async getFollowers(vacationId: number): Promise<Vacation[]> {
    const response = await axios.get<Vacation[]>(
      "http://localhost:3001/api/vacationFollowers/" + vacationId
    );
    return response.data;
  }

  // DELETE
  public async deleteVacation(vacationId: number): Promise<void> {
    const response = await axios.delete<Vacation>(
      "http://localhost:3001/api/delete/" + vacationId
    );
  }

  // UPDATE
  public async updateVacation(
    vacation: Vacation,
    vacationId: number
  ): Promise<void> {
    const response = await axios.post(
      "http://localhost:3001/api/update/" + vacationId,
      vacation
    );
    return response.data;
  }

  public async follow(userId: number, vacationId: number): Promise<Vacation[]> {
    const follow = await axios.post(
      "http://localhost:3001/api/follow/" + userId + "/" + vacationId
    );
    const response = await axios.get<Vacation[]>(
      "http://localhost:3001/api/myVacations/" + userId
    );
    return response.data;
  }

  public async unFollow(
    userId: number,
    vacationId: number
  ): Promise<Vacation[]> {
    const unFollow = await axios.delete(
      "http://localhost:3001/api/unFollow/" + userId + "/" + vacationId
    );
    const response = await axios.get<Vacation[]>(
      "http://localhost:3001/api/myVacations/" + userId
    );
    return response.data;
  }
}

const vacationActions = new VacationActions();

export default vacationActions;