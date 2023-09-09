// 필요한 모듈 가져오기
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

// Express 서버 생성
const app = express();

// JSON 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
db.pool.query(
  `CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("results", results);
    }
  }
);

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get("/api/values", (req, res, next) => {
  // DB 에서 모든 정보 가져오기
  db.pool.query("SELECT * FROM lists;", (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(results);
  });
});

// 클라이언트에서 입력한 값을 DB lists 테이블에 넣어주기
app.post("/api/values", (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}");`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ success: true, value: req.body.value });
    }
  );
});

// Express 서버 포트 8080에서 시작
app.listen(8080, () => {
  console.log("Application is running on Port 8080");
});
