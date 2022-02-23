const express = require('express')
const http = require('http')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
let NAMES = ['Full Cycle']
const mysql = require('mysql')
const connection = mysql.createConnection(config)

http.get('http://names.drycodes.com/10?nameOptions=girl_names', res => {
    let data = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => { data += chunk })

    res.on('end', () => {
        const names = JSON.parse(data)
        names.forEach(name => connection.query(`INSERT INTO people(name) values('${name}')`))
        configure()
    });
});

function configure() {
    app.get('/', (_, response) => {
        connection.query('select * from people', (_, result) => {
            NAMES = result.map(({ name }) => name)

            let html = '<h1>Full Cycle Rocks!</h1>'
            html += nameList(NAMES)
            response.send(html)
        })
    })

    app.listen(port, () => {
        console.log('Rodando na porta ' + port)
    })
}

function nameList(names) {
    let html = '<ul>'
    if (!names?.length) {
        html += `<li>Full Cycle</li>`
    } else {
        names?.forEach(name => {
            html += `<li>${name}</li>`
        });
    }
    return html += '</ul>'
}