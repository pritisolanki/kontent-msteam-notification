const express = require("express")
const axios = require('axios');
require('dotenv').config()
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/",async (req,res) =>{
    const adaptiveCard= `{"type":"message","attachments":[{"contentType":"application/vnd.microsoft.card.adaptive","contentUrl":null,"content":{"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","type":"AdaptiveCard","version":"1.0","body":[{"type":"TextBlock","text":"Content Operation: ${req.body.message.operation}","style":"heading"},{"type":"FactSet","facts":[{"title":"codename","value":"${req.body.data.items[0].codename}"},{"title":"language","value":"${req.body.data.items[0].language}"},{"title":"type","value":"${req.body.data.items[0].type}"},{"title":"collection","value":"${req.body.data.items[0].collection}"}]}]}}]}`;
    try{
        const response = await axios.post(process.env.MSTEAM_URL, adaptiveCard);
        res.sendStatus(200);
    }  catch(error){
        res.json(JSON.stringify(error));
    }
          
});

app.listen(port,() =>{
    console.log(`app listening at http://localhost:${port}`);
})