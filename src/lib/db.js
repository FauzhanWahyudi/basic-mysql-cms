import mysql from "mysql2/promise";
class db {
  static connection;

  static async connect() {
    try {
      db.connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "phiraka_test",
      });
      if (db.connection) {
        console.log("MySQL Connected");
      } else {
        console.log("Database connection error");
      }
      return db.connection;
    } catch (error) {
      console.log("🚀 ~ db ~ connect ~ error:", error);
    }
  }
  static async initTable() {
    try {
      await db.connect();
      const sql = `create table if not exists tbl_user (
            Id int auto_increment ,
            Username varchar(128),
            Password varchar(54),
            CreateTime datetime,
            primary key (Id)
        );`;

      const [result] = db.connection.query(sql);
      console.log("Table tbl_user created");
    } catch (error) {
      console.log("🚀 ~ db ~ connect ~ error:", error);
    }
  }

  static async dropTable() {
    try {
      await db.connect();
      const sql = `drop table if exists tbl_user`;
      const [result] = db.connection.query(sql);
      console.log("Drop tbl_user");
    } catch (error) {
      console.log("🚀 ~ db ~ dropTable ~ error:", error);
    }
  }

  static async insert(values) {
    try {
      await db.connect();
      const sql = `insert into tbl_user (Username, Password, CreateTime) 
	                    values (?, ?, ?)`;
      const result = db.connection.query(sql, values);
      return result;
    } catch (error) {
      console.log("🚀 ~ db ~ connect ~ error:", error);
    }
  }

  static async select(column, where = "") {
    try {
      await db.connect();
      const sql = `select ${column} from tbl_user`;
      if (where) sql += `where ${where}`;
      const result = db.connection.query(sql);
      return result;
    } catch (error) {
      console.log("🚀 ~ db ~ connect ~ error:", error);
    }
  }
  static async update(id, column, value) {
    try {
      await db.connect();
      const sql = `UPDATE tbl_user t
                    SET ${column} = ${value}
                    WHERE t.Id = ${id}`;
      const result = (await db.connection).query(sql);
      return result;
    } catch (error) {
      console.log("🚀 ~ db ~ connect ~ error:", error);
    }
  }
  static async delete(id) {
    try {
      await db.connect();
      const sql = `DELETE FROM tbl_user t
                    WHERE t.Id = ${id}`;
      const result = db.connection.query(sql);
      return result;
    } catch (error) {
      console.log("🚀 ~ db ~ connect ~ error:", error);
    }
  }
}

export default db;

(async () => {
  //   await db.insert(["Fauzhan", "1234", new Date()]);
  //   const result = await db.select("*");
  //   const result = await db.delete("1");

  console.log(result);
  return;
})();
