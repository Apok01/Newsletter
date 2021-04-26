const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.post('/', function(req, res){
   const firstName = req.body.fName;
   const secondName = req.body.lName;
   const eMail = req.body.eMail;

   const data = {
       members: [
           
                {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                        FNAME: firstName,
                        LNAME: secondName
                    }
                }
            ]
   };
   const jsonData = JSON.stringify(data);


    const listId = "670fb1b6b6";
    const url = "https://us1.api.mailchimp.com/3.0/lists/670fb1b6b6";
    const options = {
        method: "POST",
        auth: "MAL:b10dd27f4032b4f1c1b8c469d8378ddf-us1"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(response.statusCode);

            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");

               } else{
                res.sendFile(__dirname + "/failure.html");
               }
        });
   });

console.log(firstName, secondName, eMail);
//request.write(jsonData);
request.end();



});















app.post("/failure", function(req, res){
    res.redirect("/");
});


// List ID 
// 670fb1b6b6
//API KEY 
//b10dd27f4032b4f1c1b8c469d8378ddf-us1
app.listen(process.env.PORT || 3000, function(){
    console.log("Server up and running on port: "+ (process.env.PORT)|| 3000);
});
