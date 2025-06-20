const query = require('../db/db-connection');

class Customer {
  tableName = "customers";
    find = async (val) => {
        let sql = `SELECT * FROM ${this.tableName} `;
        sql += ` WHERE names COLLATE UTF8_GENERAL_CI LIKE "%${val}%" or last_names COLLATE UTF8_GENERAL_CI LIKE "%${val}%"`;
        return await query(sql);
    }

    findOne = async (val) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE registration_number COLLATE UTF8_GENERAL_CI = "${val}"`;
        return await query(sql);
    }

    create = async ({names, last_names, registration_number, email, notes}) => {
        const sql = `INSERT INTO ${this.tableName}
        (names, last_names, registration_number, email, notes) VALUES (?,?,?,?,?)`;
        const result = await query(sql, [names, last_names, registration_number, email, notes]);
        return result;
    }

    update = async ({names, last_names, registration_number, email, notes}) => {
        const sql = `UPDATE ${this.tableName} SET
        names='${names}', last_names='${last_names}', email='${email}', notes='${notes}'
        WHERE registration_number = '${registration_number}'`;
        const result = await query(sql);
        return result;
    }

    delete = async ({registration_number}) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE registration_number = '${registration_number}'`;
        const result = await query(sql);
        return result;
    }
}
module.exports = new Customer;