const express= require('express');
const app=express();
const hbs=require('hbs');
const http=require('http').Server(app);
const port=process.env.PORT || 5000;
let server=app.listen(port,()=>{
    console.log('listening on port 5000');
})

// express middleware setup
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use('/bower_components',express.static(__dirname+'/bower_components'));

// partial setup
hbs.registerPartials(__dirname + '/views/partials');

// App routes
app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/final',(req,res)=>{
    res.render('final1');
});


app.get('/coc',(req,res)=>{
    res.render('coc');
});


app.get('/registration',(req,res)=>{
    res.render('form');
});













