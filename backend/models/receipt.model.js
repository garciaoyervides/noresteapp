const query = require('../db/db-connection');

class Receipt {
  tableName = "receipts";
    find = async (val) => {
        let sql = `SELECT * FROM ${this.tableName} `;
        sql += ` WHERE names COLLATE UTF8_GENERAL_CI LIKE "%${val}%" or last_names COLLATE UTF8_GENERAL_CI LIKE "%${val}%"`;
        return await query(sql);
    }

    findOne = async (val) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE receipt_number = '${val}'`;
        return await query(sql);
    }

    create = async ({date, amount, customer_name, description, description_code, issuer, customer_registration_number}) => {
        const sql = `INSERT INTO ${this.tableName}
        (date, amount, customer_name, description, description_code, issuer, customer_registration_number) VALUES (?,?,?,?,?,?,?)`;
        const result = await query(sql, [date, amount, customer_name, description, description_code, issuer, customer_registration_number]);
        //console.log(result.insertId);
        return result.insertId;
    }

    update = async ({receipt_number, date, amount, customer_name, description, description_code, issuer, customer_registration_number}) => {
        const sql = `UPDATE ${this.tableName} SET
        date='${date}', amount='${amount}', customer_name='${customer_name}', description='${description}',
        description_code='${description_code}', issuer='${issuer}', customer_registration_number='${customer_registration_number}'
        WHERE receipt_number = ${receipt_number}`;
        const result = await query(sql);
        return result;
    }

    delete = async ({receipt_number}) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE receipt_number = ${receipt_number}`;
        const result = await query(sql);
        return result;
    }
}
module.exports = new Receipt;