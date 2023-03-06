const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const cep_format = /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/;
const app = express();  // Instanciando o modulo express aqui

const db = new sqlite3.Database('databases/CEP.db', (err) => {
    if (err) { console.error(err) }
})

app.get('/api/v1/:cep', async (req, res) => {
    db.serialize(() => {
        // db.each("SELECT * FROM sample", (err, row) => {

        let cep = req.params.cep;
        cep = cep.replace(cep_format, "$1$2.$3$4$5-$6$7$8");
        console.log(cep)

        db.all("SELECT * FROM sample WHERE enderecoCe =?", [cep], (err, rows) => {
            if (err) return console.error(err.message);  // Error handling

            res.send(rows);   // Success
        })
    })
})

process.on('SIGINT', () => {   // Closing the db correctly in case of spontaneous interrupting process.
        db.close();
    })

app.listen(3000, '127.0.0.1', () => {   // Use Nginx later
    console.log('Servidor iniciado');
});
