import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// -- CREATE functions --
export async function createFaculty(
  name,
  phone,
  extension,
  email,
  location,
  department
) {
  const faculty = await pool.query(
    `
  INSERT INTO faculty(name, phone, extension, email, location, dept)
  VALUES(?, ?, ?, ?, ?, ?)`,
    [name, phone, extension, email, location, department]
  );
  return faculty[0];
}
export async function createStaff(
  name,
  phone,
  extension,
  email,
  location,
  department
) {
  const staff = await pool.query(
    `
  INSERT INTO staff(name, phone, extension, email, location, dept)
  VALUES(?, ?, ?, ?, ?, ?)`,
    [name, phone, extension, email, location, department]
  );
  return staff[0];
}
export async function createDept(name, phone, extension, email, location) {
  const department = await pool.query(
    `
  INSERT INTO departments(name, phone, extension, email, location)
  VALUES(?, ?, ?, ?, ?)`,
    [name, phone, extension, email, location]
  );
  return department[0];
}

// -- READ functions --
// GET ALL Functions
export async function getAllFaculty() {
  const ans = await pool.query("SELECT * FROM faculty;");
  let faculty = ans.slice(0, -1);
  faculty = faculty[0];
  return faculty;
}
export async function getAllStaff() {
  const ans = await pool.query("SELECT * FROM staff;");
  let staff = ans.slice(0, -1);
  staff = staff[0];
  return staff;
}
export async function getAllDepts() {
  const ans = await pool.query("SELECT * FROM departments;");
  let depts = ans.slice(0, -1);
  depts = depts[0];
  return depts;
}

export async function getFaculty(name) {
  /*
    The name could be entered as just a first name || last name || Full name

    First names have additional letters after them -> ${name}%`
    If results.length == 0 then it's a last name or full name then -> `%${name}%`
  */
  let nameHolder = `${name}%`;
  let faculty = await pool.query("SELECT * FROM faculty WHERE name LIKE ?", [
    nameHolder,
  ]);
  faculty = faculty[0];

  if (faculty.length === 0) {
    nameHolder = `%${name}%`;
    faculty = await pool.query("SELECT * FROM faculty WHERE name LIKE ?", [
      nameHolder,
    ]);
    faculty = faculty[0];
  }
  return faculty[0];
}
export async function getStaff(name) {
  /*
    The name could be entered as just a first name || last name || Full name

    First names have additional letters after them -> ${name}%`
    If results.length == 0 then it's a last name or full name then -> `%${name}%`
  */
  let nameHolder = `${name}%`;
  let staff = await pool.query("SELECT * FROM staff WHERE name LIKE ?", [
    nameHolder,
  ]);
  staff = staff[0];

  if (staff.length === 0) {
    nameHolder = `%${name}%`;
    staff = await pool.query("SELECT * FROM staff WHERE name LIKE ?", [
      nameHolder,
    ]);
    staff = staff[0];
  }
  return staff[0];
}
export async function getDept(name) {
  let nameHolder = `%${name}%`;
  let dept = await pool.query("SELECT * FROM departments WHERE name LIKE ?", [
    nameHolder,
  ]);
  dept = dept[0];
  dept = dept[0];
  return dept;
}

// -- UPDATE functions --
export async function updateFaculty(
  id,
  name,
  phone,
  extension,
  email,
  location,
  department
) {
  let faculty = pool.query(
    `UPDATE faculty
    SET name= ?, phone= ?, extension= ?, email= ?, location= ?, dept= ?
    WHERE id= ?`,
    [name, phone, extension, email, location, department, id]
  );
  return faculty;
}
export async function updateStaff(
  id,
  name,
  phone,
  extension,
  email,
  location,
  department
) {
  let staff = pool.query(
    `UPDATE staff
    SET name= ?, phone= ?, extension= ?, email= ?, location= ?, dept= ?
    WHERE id= ?`,
    [name, phone, extension, email, location, department, id]
  );
  return staff;
}
export async function updateDept(id, name, phone, extension, email, location) {
  let dept = pool.query(
    `UPDATE departments
    SET name= ?, phone= ?, extension= ?, email= ?, location= ?
    WHERE id= ?`,
    [name, phone, extension, email, location, id]
  );
  return dept;
}
// -- DELETE functions --
export async function deleteFaculty(id) {
  let faculty = pool.query(
    `DELETE FROM faculty
    WHERE id= ?`,
    [id]
  );
  return faculty;
}
export async function deleteStaff(id) {
  let staff = pool.query(
    `DELETE FROM staff
    WHERE id= ?`,
    [id]
  );
  return staff;
}
export async function deleteDept(id) {
  let dept = pool.query(
    `DELETE FROM departments
    WHERE id= ?`,
    [id]
  );
  return dept;
}
// Test CREATE functions
// let facultyInserted = await createFaculty(
//   "Uzomaka Meretohe",
//   "2767404961",
//   "0059",
//   "uzo@gmail.com",
//   "CA-",
//   "Biology"
// );
// let staffInserted = await createStaff(
//   "Morino Gazono",
//   "2767404961",
//   "0059",
//   "mogazo@gmail.com",
//   "SC-22",
//   "Chemistry"
// );
// let departmentInserted = await createDept(
//   "Nursing",
//   "1737492162",
//   "0033",
//   "nursing@gmail.com",
//   "Building N"
// );

// -- Test READ functions --
let allFaculty = await getAllFaculty();
let allStaff = await getAllStaff();
let allDepartments = await getAllDepts();
// Test Specific READ functions
let department = await getDept("computer");
let faculty = await getFaculty("Johnson");
let staff = await getStaff("Turner");
// Test UPDATE functions

// let updatedFaculty = await updateFaculty(
//   6,
//   "Salif Tankoano",
//   "8067904560",
//   "9523",
//   "salif@gmail.com",
//   "CS-05",
//   "Computer Science"
// );
// let updatedStaff = await updateStaff(
//   6,
//   "Salif Tankoano",
//   "8067904560",
//   "9523",
//   "salif@gmail.com",
//   "CS-05",
//   "Computer Science"
// );
// let updatedDept = await updateDept(
//   5,
//   "Chemistry",
//   "9998887777",
//   "0202",
//   "chemistry@example.com",
//   "Building E"
// );

//Test DELETE functions
// let deletedFaculty = await deleteFaculty(10);
// let deletedStaff = await deleteStaff(7);
// let deletedDept = await deleteDept(6);