const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/ce30ab9b58";

    const options = {
        method: "POST",
        auth: "Anjali1:d18c52a502d7056b4fdacf84705dfadd-us17"
    }

    const request = https.request(url, options, function(response){

            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
            

            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("The Server is running at port 3000.");
})

// api key = d18c52a502d7056b4fdacf84705dfadd-us17
// list id = ce30ab9b58