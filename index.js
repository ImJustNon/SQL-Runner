// ============================================================================== Configs =============================================================================
const configs = require("./configs/config.js");

// ============================================================================= import =============================================================================
const { Client } = require('pg');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// ============================================================================= question config =============================================================================
const q_get_database_type = [
    {
        type: 'list',
        name: 'get_database_type',
        message: "What is your database Client? :",
        choices: [
            "postgreSQL",
            "mySQL",
        ],
    },
];
const q_get_user = [
    {
        type: 'input',
        name: 'get_user',
        message: "Enter user :",
    },
];
const q_get_host = [
    {
        type: 'input',
        name: 'get_host',
        message: "Enter host :",
    },
];
const q_get_database = [
    {
        type: 'input',
        name: 'get_database',
        message: "Enter database :",
    },
];
const q_get_password = [
    {
        type: 'input',
        name: 'get_password',
        message: "Enter password :",
    },
];
const q_get_port = [
    {
        type: 'input',
        name: 'get_port',
        message: "Enter port :",
    },
];

const q_get_sql_cmd = [
    {
        type: 'input',
        name: 'sql_cmd',
        message: "SQL :",
    },
];

// ============================================================================= Code =============================================================================
let connection;

(async() =>{
    let get_database_type = "";

    let get_user = "";
    let get_host = "";
    let get_database = "";
    let get_password = "";
    let get_port = "";
    let get_sql_cmd = "";

    if(configs.database.choose_Database.length === 0){
        get_database_type = (await question({
            questions: q_get_database_type,
        })).result.get_database_type;
    }
    else {
        get_database_type = configs.database.choose_Database;
    }

    if(get_database_type === "postgreSQL"){
        if(configs.database.postgreSQL.user.length === 0){
            get_user = (await question({
                questions: q_get_user,
            })).result.get_user;
        }
        else {
            get_user = configs.database.postgreSQL.user;
        }

        if(configs.database.postgreSQL.host.length === 0){
            get_host = (await question({
                questions: q_get_host,
            })).result.get_host;
        }
        else {
            get_host = configs.database.postgreSQL.host;
        }

        if(configs.database.postgreSQL.database.length === 0){
            get_database = (await question({
                questions: q_get_database,
            })).result.get_database;
        }
        else {
            get_database = configs.database.postgreSQL.database;
        }

        if(configs.database.postgreSQL.password.length === 0){
            get_password = (await question({
                questions: q_get_password,
            })).result.get_password;
        }
        else {
            get_password = configs.database.postgreSQL.password;
        }

        if(configs.database.postgreSQL.port.length === 0){
            get_port = (await question({
                questions: q_get_port,
            })).result.get_port;
        }
        else {
            get_port = configs.database.postgreSQL.port;
        }

        if(get_user.length !== 0 && get_host.length !== 0 && get_database.length !== 0 && get_port.length !== 0 && !isNaN(get_port)){
            await connect_postgreSQL({
                user: get_user,
                host: get_host,
                database: get_database,
                password: get_password,
                port: parseInt(get_port),
            });
        }
        else {
            console.log("[Alert] Cannot connect to database client");
        }

        let loop;
        for(let i = 0; i < Infinity; i++){
            loop = false;
            console.log("--------------------------------------------------------------");
            get_sql_cmd = (await question({
                questions: q_get_sql_cmd,
            })).result.sql_cmd;
            if(get_sql_cmd.length !== 0){
                connection.query(get_sql_cmd, async(error, result) =>{
                    let output = "Success";
                    if(error){
                        output = error;
                    }
                    else {
                        if(result.rows.length > 0){
                            output = result.rows;
                        }
                    }
                    
                    console.log(output);
                    loop = true;
                });
            }
            else {
                continue;
            }
            await waitUntil(() => loop === true);
        }
    }   
    else if(get_database_type === "mySQL"){
        if(configs.database.mySQL.user.length === 0){
            get_user = (await question({
                questions: q_get_user,
            })).result.get_user;
        }
        else {
            get_user = configs.database.mySQL.user;
        }

        if(configs.database.mySQL.host.length === 0){
            get_host = (await question({
                questions: q_get_host,
            })).result.get_host;
        }
        else {
            get_host = configs.database.mySQL.host;
        }

        if(configs.database.mySQL.database.length === 0){
            get_database = (await question({
                questions: q_get_database,
            })).result.get_database;
        }
        else {
            get_database = configs.database.mySQL.database;
        }

        if(configs.database.mySQL.password.length === 0){
            get_password = (await question({
                questions: q_get_password,
            })).result.get_password;
        }
        else {
            get_password = configs.database.mySQL.password;
        }

        if(configs.database.mySQL.port.length === 0){
            get_port = (await question({
                questions: q_get_port,
            })).result.get_port;
        }
        else {
            get_port = configs.database.mySQL.port;
        }

        if(get_user.length !== 0 && get_host.length !== 0 && get_database.length !== 0 && get_port.length !== 0 && !isNaN(get_port)){
            await connect_mySQL({
                user: get_user,
                host: get_host,
                database: get_database,
                password: get_password,
                port: parseInt(get_port),
            });
        }
        else {
            console.log("[Alert] Cannot connect to database client");
        }

        let loop;
        for(let i = 0; i < Infinity; i++){
            loop = false;
            console.log("--------------------------------------------------------------");
            get_sql_cmd = (await question({
                questions: q_get_sql_cmd,
            })).result.sql_cmd;
            if(get_sql_cmd.length !== 0){
                connection.query(get_sql_cmd, async(error, result) =>{
                    let output = "Success";
                    if(error){
                        output = error;
                    }
                    else {
                        if(result.rows.length > 0){
                            output = result.rows;
                        }
                    }
                    
                    console.log(output);
                    loop = true;
                });
            }
            else {
                continue;
            }
            await waitUntil(() => loop === true);
        }
    }

    /*
    if(configs.database.choose_Database.length !== 0) {
        if(configs.database.choose_Database === "pg"){
            
        }
        else if(configs.database.choose_Database === "mysql"){

        }
    }*/
})();

// ============================================================================= Database Connection =============================================================================

async function connect_postgreSQL({ user, host, database, password, port }){
    connection = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    });
    connection.connect((err) => {
        if(err) {
            console.log(`[Database] PostgreSQL : Cannot connect to database ERROR : ${err}`);
        } 
        else {
            console.log("[Database] PostgreSQL : Connected");
        }
    });
}
async function connect_mySQL({ user, host, database, password, port }){
    connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port,
    });
    connection.connect((err) =>{
        if (err) {
            console.log(`[Database] mySQL : Cannot connect to database ERROR : ${err}`);
        } 
        else {
            console.log("[Database] mySQL : Connected");
        }
    });
}

// question
function question({ questions }){
    return new Promise(async(resolve, reject) =>{
        await inquirer.prompt(questions).then(answers => {
            resolve({
                result: answers,
            });
        });
    });
}

function waitUntil(condition){
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return;
            }
            clearInterval(interval);
            resolve();
        }, 100);
    });
}

function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}