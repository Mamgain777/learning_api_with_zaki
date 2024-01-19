const express = require('express');
const app = express();
const port = 7777;

const students = [
    {
        'id': 1,
        'name': 'Zaki Zafar',
        'age': 24,
    },
    {
        'id': 2,
        'name': 'Himanshu Mamgain',
        'age': 21,
    },
    {
        'id': 3,
        'name': 'Sahzuher Shah',
        'age': 22,
    }
]

app.use(express.json());
// Custom middelwares
// app.use((req,res,next)=>{
//     console.log("Custom midedelware 2");  
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("Custom midedelware 1");  
//     next();
// })
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/test', (req, res) => {
    res.send('this is test route');
});
app.get('/getStudents', (req, res) => { 
    res.send({"data": students});
});
app.post('/getStudent', (req, res) => {
    let body = req.body;
    // console.log(body['id'])
    let index = students.findIndex(element => element['id'] === body['id']);
    // console.log(index)
    res.send({"data": students[index]});
});
app.put('/putStudent', (req, res) => {
    let body = req.body;
    // console.log(body);
    let index = students.findIndex(element => element['id'] === body['id']);
    if(index > 0){
        students.splice(index, 1);
    }
    students.push(body);
    res.send({"data": students});
});
app.patch('/patchStudent', (req,res)=>{
    let body = req.body;
    let index = students.findIndex(element => element['id'] === body['id']);
    // console.log(index);
    if (index > 0) {
        for (let key in students[index]) {
            if(body.hasOwnProperty(key)){
                students[index][key] = body[key];
            }
        }
        res.send({ 'data': students[index] });
    }
    else{
        res.send({'msg': "Item not available"});
    }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})