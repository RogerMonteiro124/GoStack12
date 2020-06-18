const express = require('express')
const {uuid, isUuid} = require('uuidv4')
const cors = require('cors')

const app = express();

app.use(cors());

app.use(express.json());


const projects = [];
const repositories = [];

function logRequest (req, res, next){
    const {method, url} = req;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel)

    next();

    console.timeEnd(logLabel)
}

function validateProjectId(req, res, next){
    const {id} = req.params;

    if(!isUuid(id)){
        return res.status(400).json({erro:"Ivalid Project Id."})
    }

    return next();

}

app.use(logRequest);
app.use('/projects/id:',validateProjectId)

app.get('/projects', (req,res)=>{
    const {title} = req.query;
    console.log(title);

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.json(results)
})

app.post('/projects',(req, res)=>{
    const {title, owner} = req.body;
    
    const project = {id:uuid(), title, owner}

    projects.push(project)

    return res.json(project)
})

app.put('/projects/:id',(req, res)=>{
    const {id} = req.params;
    
    const {title, owner} = req.body;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return res.status(400).json({erro:"Project not found"})
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return res.json(project)
})

app.delete('/projects/:id',(req, res)=>{
    const {id} = req.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return res.status(400).json({erro:"Project not found"})
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send()
})


app.get('/repositories', (req,res)=>{    
    return res.json(repositories)
})

app.post('/repositories',(req, res)=>{
    const {title, techs, likes} = req.body;
    
    const project = {id:uuid(), title, techs, likes:likes}

    repositories.push(project)

    return res.json(project)
})

app.put('/repositories/:id',(req, res)=>{
    const {id} = req.params;
    
    const {title, owner} = req.body;
    
    const projectIndex = repositories.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return res.status(400).json({erro:"Project not found"})
    }

    const project = {
        id,
        title,
        owner
    };

    repositories[projectIndex] = project;

    return res.json(project)
})

app.delete('/repositories/:id',(req, res)=>{
    const {id} = req.params;
    
    const projectIndex = repositories.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return res.status(400).json({erro:"Project not found"})
    }

    repositories.splice(projectIndex, 1);

    return res.status(204).send()
})

app.post("/repositories/:id/like", (request, response) => {
    const {id} = request.params
    const repository = repositories.find(repository=>repository.id ==id);
  
    if(!repository){
      return response.status(400).send()
    }
    
    repository.likes +=1;
  
    return response.json(repository)
  
  });

app.listen(3000,()=>{
    console.log('Back-end Start! 🚀')
});
