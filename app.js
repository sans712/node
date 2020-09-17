const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    
    
    const query=req.body.cityname;
    const apikey="17ce8550aa9e54fe5aeeccd4b8a50f76";
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const wdata=JSON.parse(data);
            //console.log(wdata);
            const temperature=wdata.main.temp;
            const b=wdata.weather[0].description;
            const icon=wdata.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>The weather Description is "+b+"</p>");
            res.write("<h1>The temperature in "+query+" is: "+temperature+ " degree celcius</h1>");
            res.write("<img src="+imgurl +">");
            res.send();
            // console.log(b);
            // console.log(temp);
        })
        // const object={
        //     name:"sanskriti",
        //     age:21
        // }
        // console.log(JSON.stringify(object));
    })
    //res.send("server is up and running");              //only 1 res.send is possibl

})
app.listen(3000,function(){
    console.log("server started on 3000");
})