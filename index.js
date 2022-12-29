const express = require('express');
const { sortBy } = require('lodash');
const path=require('path');
const port = 8000;

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middle ware
app.use(express.urlencoded({extended: true}));

//adding static file
app.use(express.static('assets'));

//ram stored database
var taskList=[
    {
        discription:"Make a TODO App",
        date:"12-10-2022",
        category:"INSTITUTE",
        priority: "MEDIUM",
        status: "1",
        idx: 0
    },
    {
        discription:"Do Bank worK",
        date:"12-12-2022",
        category:"BANK",
        priority: "LOW",
        status: "0",
        idx: 1
    },
    {
        discription:"Created By SURAJ-SUMAN :)",
        date:"12-14-2022",
        category:"OTHER",
        priority: "HIGH",
        status: "0",
        idx: 2
    }
];

app.get('/',function(req,res){
    return res.render('home',{
        title: "Task List",
        task_list: taskList
    });
});
let sno=3;
app.post('/add-task',function(req,res){
    taskList.push({
        discription: req.body.discription,
        date:req.body.date,
        category:req.body.category,
        priority:req.body.priority,
        status:"0",
        idx: taskList.length
    });
    // taskList.push(req.body);
    return res.redirect('back');
});
app.get('/delete-task',function(req,res){
    //console.log(req.query);
    var arr=Object.keys(req.query);
    arr.sort();
    //console.log(arr);
    let j=0;
    for(let i of arr){
        taskList.splice(i-j,1);
        j++;
    };
    var count=0;
    for(let i of taskList){
        i.idx=count++;
    };
    return res.redirect('/');
});

app.listen(port,function(err){
    if(err){
        console.log(`ERROR IN ${port} : ${err}`);
    }else{
        console.log(`SERVER IS LIVE ON PORT : ${port}`);
    }
});