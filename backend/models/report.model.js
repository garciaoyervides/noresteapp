const query = require('../db/db-connection');
const receiptsTableName = "receipts";

class Report {
    findAllExact = async (vals) => {
        let sql = `SELECT * FROM ${vals.searchTable} WHERE `;
        for (let i = 0; i < vals.searchItem.length; i++) {
            sql += `${vals.searchItem[i].key} COLLATE UTF8_GENERAL_CI = "${vals.searchItem[i].value}"`;
            if (i < vals.searchItem.length - 1){
                sql += ` OR `
            }
        }
        return await query(sql);
    }
    findAllApproximate = async (vals) => {
        let sql = `SELECT * FROM ${vals.searchTable} WHERE `;
        for (let i = 0; i < vals.searchItem.length; i++) {
            sql += `${vals.searchItem[i].key} COLLATE UTF8_GENERAL_CI LIKE "%${vals.searchItem[i].value}%"`
            if (i < vals.searchItem.length - 1){
                sql += ` OR `
            }
        }
        return await query(sql);
    }
    findReceiptsByDate = async (vals) => {
        let sql = `SELECT * FROM ${receiptsTableName} WHERE `;
        sql += `date BETWEEN "${vals.from}" AND "${vals.to}"`
        return await query(sql);
    }
}
module.exports = new Report;