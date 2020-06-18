import express from 'express';
import {helloWolrd} from './routes'
const app = express();

app.get('/',(req,res)=>{
    return res.json({message:'Hello brazil'});
});



app.listen(3000);