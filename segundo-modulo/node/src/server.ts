import express from 'express';

const app = express();

app.use(express.json());

app.post('/users',(request, response)=>{

    const {name, email} = request.body;

    const user = {
        name,
        email,
    };

    return response.json({message:'hello brasil'});
})

app.listen(3333,() => {
    console.log('Backend Started on port: 3333');
});