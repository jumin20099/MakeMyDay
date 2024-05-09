import mysql from 'mysql2';

const db_info = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "admin",
    database: "makemyday",
};

export const init = () => mysql.createConnection(db_info);

export const connect = (conn) => {
    conn.connect(function (err) {
        if (err) console.error('mysql connection error: ' + err);
        else console.log('mysql connection successful');
    });
};