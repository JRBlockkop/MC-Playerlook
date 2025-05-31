const fs = require('fs');

class DB{
    constructor(colums){
        this.colums = colums;
        this.table = []
    }
    insert(arr){
        this.table.push(arr)
        fs.appendFileSync('db.csv',arr.join(';')+'\n')
    }
}
exports.DB = DB;