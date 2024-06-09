const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const axios = require('axios');

function axiosPost(){
  let data = JSON.stringify({});
    let config = { 
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/engine-rest/process-definition/key/zuHodocasce/start',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
     .then((response) => {
      console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
      console.log(error);
});
}

async function getUserTask(){
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/engine-rest/task?assignee=korisnik',
    headers: { }
  };

  return await axios.request(config)
  .then((response) => {
   
     let a=JSON.stringify(response.data[0]["id"]);
    
     return a;
    
  })
  .catch((error) => {
    console.log(error);
  });
  
}
async function getAdminTasks(){
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/engine-rest/task?assignee=admin',
    headers: { }
  };

  return await axios.request(config)
  .then((response) => {
     
     let a=JSON.stringify(response.data);
   
     return a;
    
  })
  .catch((error) => {
    console.log(error);
  });
  
}

function sendMess(){
  let data = JSON.stringify({
    "messageName": "prijavaStize"
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/engine-rest/message',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

async function sendForm(id,data){
  const url="http://localhost:8080/engine-rest/task/"+JSON.parse(id)+"/complete";
  console.log(url);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: { 
      'Content-Type': 'application/json'
    },
    data :JSON.stringify( data)
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}


async function sendOdobreno(id,data){
  const url="http://localhost:8080/engine-rest/task/"+id+"/complete";
  console.log(url);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: { 
      'Content-Type': 'application/json'
    },
    data :JSON.stringify( data)
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}


app.get("/start",(req,res)=>{
  axiosPost();
})

app.get("/getTask",async (req,res)=>{
  let id= await getUserTask();
  res.json({"id":id});
  console.log(id);
})

app.post("/sendForm",(req,res)=>{
  console.log(req.body);
  sendForm(req.body["id"],req.body["data"]);
  console.log("poslano");
})

app.get("/sendMess",(req,res)=>{
 sendMess();
})

app.get("/adminTasks",async (req,res)=>{
  let id= await getAdminTasks();
  res.json({"data":id});
  
 })
 app.post("/sendOdobreno",(req,res)=>{
  console.log(req.body);
  sendOdobreno(req.body["id"],req.body["data"]);
  console.log("poslano");
})

app.listen(5000,()=>{console.log("Server started on port 5000")})