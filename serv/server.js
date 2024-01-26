const PORT = 8000
const express = require('express')
const cors = require('cors')
require ('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mysearch-3sei.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

const OPENAI_AI_KEY = process.env.OPENAI_AI_KEY

app.post('/completions', async(req, res) => {
    
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_AI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
try{
   const response = await fetch('https://api.openai.com/v1/chat/completions', options)
   const data = await response.json()
   res.send(data)
}catch(error){
    console.error(error)

}
})

app.listen(PORT, () => console.log('Your server is running on PORT' + PORT))
