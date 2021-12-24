const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { log } = require("console");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname+ "/SignUp.html");
});
app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailId;
    
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    const url ="https://us20.api.mailchimp.com/3.0/lists/e976e07a3d";
    const options ={
        method: "POST",
        auth : "pratik:10997a26110207fbaa5859db74f50acd-us20"
    };
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
    });
    request.write(jsonData);
    request.end();
    
});
app.post("/failure", function(req, res)
{
    res.redirect("/");
});





app.listen(process.env.port || 3000, function()
{
    console.log("Server is running on Port: 3000");
});

// API Key
// 10997a26110207fbaa5859db74f50acd-us20

// Unique ID
// e976e07a3d

