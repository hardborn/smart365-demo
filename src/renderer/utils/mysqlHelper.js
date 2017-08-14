import mysql from 'mysql'

let pool = mysql.createPool({
  host: '121.42.8.188',
  user: 'sito',
  password: 'tianhuzuji@91.112',
  database: '365electricguard',
  port: 3306
})

export function query (sql, options, callback) {
  pool.getConnection(function (error, connect) {
    if (error) {
      callback(error, null, null)
    } else {
      connect.query(sql, options, function (error, results, fields) {
        connect.release()
        callback(error, results, fields)
      })
    }
  })
}
