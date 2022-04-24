const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

https.globalAgent.maxSockets = 10;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({entended:true}));

let randomNums = [];
let randomWord = [];
let kanyeQuote = "";
let name = "";



app.get("/", function(req, res) {
  res.render("index", {
    randomNums: randomNums,
    randomWord: randomWord,
    kanyeQuote: kanyeQuote,
    name: name
  });
});

app.post("/", function(req, res) {
  if(req.body.buttom === "clear"){
    randomNums = [];
    randomWord = [];
    res.redirect("/");
  }else{
  name = req.body.nameInput;
  randomNums = [];
  randomWord = [];
  const num1 = Math.floor(Math.random() * 800);
  const num2 = Math.floor(Math.random() * 190);
  const num3 = 1000 - num1 - num2;
  randomNums.push(num1/10);
  randomNums.push(num2/10);
  randomNums.push(num3/10);
  randomNums.sort(function(a, b) {
    return b - a
  });

  // for(let i = 0; i < 3; i++){
  // let i = 0;
  // while(i < 3){
  //   https.get("https://random-word-form.herokuapp.com/random/noun", function(response){
  //     response.on("data", function(data){
  //       randomWord.push(JSON.parse(data)[0]);
  //       i++;
  //       console.log(i);
  //     });
  //   });
  // }
  //
  // https.get("https://api.kanye.rest", function(response4){
  //   response4.on("data", function(data){
  //     // console.log(JSON.parse(data));
  //     kanyeQuote = JSON.parse(data).quote;
  //     console.log(randomNums);
  //     console.log(randomWord);
  //     console.log(kanyeQuote);
  //   });
  //   res.redirect("/");
  // });




  https.get("https://random-word-form.herokuapp.com/random/noun", function(response1){
    response1.on("data", function(data){
      randomWord.push(JSON.parse(data)[0]);
      https.get("https://random-word-form.herokuapp.com/random/noun", function(response2){
        response2.on("data", function(data){
          randomWord.push(JSON.parse(data)[0]);
        })
        https.get("https://random-word-form.herokuapp.com/random/noun", function(response3){
          response3.on("data", function(data){
            randomWord.push(JSON.parse(data)[0]);
          })
          https.get("https://api.kanye.rest", function(response4){
            response4.on("data", function(data){
              // console.log(JSON.parse(data));
              kanyeQuote = JSON.parse(data).quote;
              // console.log(randomNums);
              // console.log(kanyeQuote);
            });
            res.redirect("/");
          });
        })
      })

    })


  })

}

  // res.redirect("/");
});

app.listen(3000, function() {
  console.log("server starts on port 3000");
});
