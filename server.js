import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(express.json());
// app.use(cors({
//     origin : 'http://localhost:4200',
//     credentials: true
// }))


/*Server and backend Connection*/
const connectMySQL = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password : 'root',
    database : 'demotest'
});

const PORT = 3000;
app.listen(PORT, () =>{
    console.log("Connected with Backend");
    connectMySQL.connect((err) =>{
        if(err) throw err;
        console.log("Connected with mysql DB");
    })
})

/* All Endpoints */

/**************************************Get list of employess from SQL Table**************************************/

app.get("/getAllUsers", (req, res) =>{
    const sql_query = `select * from users`;
    debugger;
    connectMySQL.query(sql_query, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})
/******************************************************************************************************************/

/**************************************Add User to SQL Table**************************************/

app.post("/addUser", (req, res) =>{
    const { Name, Email } = req.body;
    const sql_query = `insert into users(Name, Email) values(?, ?)`;
    connectMySQL.query(sql_query,[Name, Email], (err, result) =>{
        if(err) throw err;
        res.status(200).send("User Added", result.affectedRows, result.insertId);
    })
})
/******************************************************************************************************************/