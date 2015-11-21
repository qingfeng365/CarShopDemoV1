'use strict';

var sqlserver = require('mssql');

var sqlConfig = {
  user: 'sa',
  password: '38259343',
  server: 'localhost',
  database: 'ESAutoCRM_810_HQ'
};

var connection = new sqlserver.Connection(
  sqlConfig,
  function (err) {

    if (err) {
      console.log(err);
      return
    }

    var request = new sqlserver.Request(connection);
    request.stream = true; 
    // var sql = 'select 1 as num, getdate() as date';
    var sql = 'select top 1 * from Pub_CarType';
    request.query(sql, function (err, queryData) {
      if (err) {
        console.log(err);
      }
      //console.dir(queryData.columns)
      // console.dir(queryData);
    });

    request.on('recordset', function (columns) {
      console.log('on recordset: ')
      console.log(columns)
    });

    request.on('row', function (row) {
      console.log('on row: ')
      console.log(row)
    });


    connection.close();
  });

connection.on('error', function (err) {
  console.log(err);
});

connection.on('recordset', function (columns) {
  console.log('on recordset: ')
  console.log(columns)
});

connection.on('row', function (row) {
  console.log('on row: ')
  console.log(row)
});
