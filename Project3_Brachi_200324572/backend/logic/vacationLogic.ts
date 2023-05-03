import dal from "../utils/dal_mysql";
import { OkPacket } from "mysql";
import Vacation from "../model/vacation";
import { response } from "express";

// ADMIN
// CREATE
async function addVacation(vacation: Vacation): Promise<Vacation> {
  const sql = `
  INSERT INTO project3.vacations  VALUES (DEFAULT,'${vacation.description}', '${vacation.destination}', '${vacation.image}', '${vacation.start_date}', '${vacation.end_date}', ${vacation.price});
  `;
  const result: OkPacket = await dal.execute(sql);
  vacation.id = result.insertId;
  return vacation;
}

// READ
async function getAllVacations(): Promise<Vacation[]> {
  const sql = "SELECT * FROM project3.vacations;";
  const vacations = await dal.execute(sql);
  return vacations;
}
// async function getAllUsers_2_Vacations(): Promise<Vacation[]> {
//   const sql = "SELECT * FROM project3.users_2_vacations;";
//   const vacations = await dal.execute(sql);
//   return vacations;
// }

async function getOneVacation(vacationId: number): Promise<Vacation> {
  const sql = `SELECT * FROM project3.vacations WHERE id=${vacationId};`;
  const vacation = await dal.execute(sql);
  return vacation;
}

async function getUserVacations(userId: number): Promise<Vacation[]> {
  const sql = `SELECT v.*
  FROM users u JOIN users_2_vacations u2v
  ON u.id = u2v.user_id
  JOIN vacations v
  ON u2v.vacation_id = v.id
  WHERE u.id = ${userId}
  `;
  const vacations = await dal.execute(sql);
  return vacations;
}

async function getFollowers(vacationId: number): Promise<Vacation[]> {
  const sql = `SELECT * FROM project3.users_2_vacations where vacation_id = ${vacationId}`;
  const vacations = await dal.execute(sql);
  return vacations;
}

// (SELECT * FROM project3.vacations ORDER BY start_date);
// UPDATE project3.vacations  SET followers = (SELECT count(*) FROM project3.users_2_vacations where vacation_id = 26) WHERE (`id` = '26');
// (SELECT * FROM project3.vacations WHERE id > (SELECT MAX(id) FROM (SELECT id FROM project3.vacations LIMIT 2) limited_table) ORDER BY start_date limit 2);
// (SELECT * FROM project3.vacations ORDER BY start_date) limit 10;

// get pagination
async function getAllVacationsPagination(
  pageNumber: number
): Promise<Vacation[]> {
  pageNumber = (pageNumber - 1) * 10;
  let sql = `SELECT v.id, v.destination, v.description, v.image, DATE_FORMAT(v.start_date, "%d-%m-%Y") start_date, DATE_FORMAT(v.end_date, "%d-%m-%Y") end_date, v.price, COUNT(user_id) followers
  FROM vacations v LEFT OUTER JOIN users_2_vacations u2v
  ON v.id=u2v.vacation_id
  GROUP BY v.id, v.destination, v.description, v.image, v.start_date, v.end_date, v.price
  ORDER BY v.start_date
  LIMIT ${pageNumber},10
  `;
  const vacations = await dal.execute(sql);
  return vacations;
}

// DELETE
// delete vacation
async function deleteVacation(vacationId: number): Promise<void> {
  const sql = `DELETE FROM project3.vacations WHERE (id = ${vacationId});
  `;
  const result: OkPacket = await dal.execute(sql);
}

// unFollow
async function unFollow(userId: number, vacationId: number): Promise<void> {
  let sql = `DELETE FROM project3.users_2_vacations WHERE (user_id = ${userId}) and (vacation_id = ${vacationId});
    ;`;

  const result: OkPacket = await dal.execute(sql);
}

// UPDATE
// update vacation
async function updateVacation(
  vacation: Vacation,
  vacationId: number
): Promise<void> {
  const sql = `UPDATE project3.vacations 
  SET 
  description = '${vacation.description}',
  destination = '${vacation.destination}', 
  image = '${vacation.image}', 
  start_date = '${vacation.start_date}', 
  end_date = '${vacation.end_date}', 
  price = ${vacation.price ? vacation.price : 0}
  WHERE (id = ${vacationId});
  `;
  const result: OkPacket = await dal.execute(sql);
}

// follow
async function follow(userId: number, vacationId: number): Promise<void> {
  let sql = `INSERT INTO project3.users_2_vacations (user_id, vacation_id) VALUES (${userId}, ${vacationId});
    ;`;
  const result: OkPacket  = await dal.execute(sql);
  const followers = "SELECT * FROM project3.users_2_vacations;";
  const res = await dal.execute(followers);
  return res;
}

export default {
  addVacation,
  getAllVacations,
  getOneVacation,
  deleteVacation,
  updateVacation,
  follow,
  unFollow,
  getUserVacations,
  getFollowers,
  getAllVacationsPagination,
};