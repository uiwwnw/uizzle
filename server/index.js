var express = require('express');
var app = express();
var path = require('path');
var mongodb = require('mongodb');
var db = require('mongodb').db;
var config = require('../config');

var MongoClient = require('mongodb').MongoClient;


MongoClient.connect(config.dburl, function(err, database) {
  var myAwesomeDB = database.db('parkprika');
  // var jordan = { name: 'Jordan', age: 16, gender: 'M' };
  // var amanda = { name: 'Amanda', age: 17, gender: 'F' };
  // var jessica = { name: 'Jessica', age: 15, gender: 'F' };
  // var james = { name: 'James', age: 19, gender: 'M' };
  // var catherine = { name: 'Catherine', age: 18, gender: 'F' }

  // myAwesomeDB.collection('users').insertMany([jordan,amanda,jessica,james,catherine]);
  var cursor = myAwesomeDB.collection('users').find();
  // 2. 읽어온 document 를 cursor 에 넣고 반복처리
  // cursor.each(function (err, doc) { // document 가 예약어이기 때문에 변수명을 doc로 변경
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         if (doc != null) {
  //             // 3. document 가 정상적으로 있으면 console 에 출력해준다.
  //             console.log(doc);
  //         }
  //     }
  // });
  database.close();
});

app.use(express.static('public'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});


// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
// })

app.listen(8800, function() {
  console.log('Example app listening on port 8800!');
});
