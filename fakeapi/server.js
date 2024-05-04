const express= require("express")
const app= express()
const PORT= 3001

app.use(express.json())
app.get('/fakeapi', (req, res, next)=>{
    res.send('bonjour de la fakemapi pour test')
})



app.listen(PORT, ()=> {

console.log('le server de l api fake est sur ce port ' + PORT)

})