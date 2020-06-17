import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import api from './services/api'

import './App.css'
import backgoundImage from './assets/background.jpg'

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response=>{
            setProjects(response.data);
            console.log(response);
        })
    },[])

    async function handleAddProject(){
        //setProjects([ ... projects, `Project ${Date.now()}`])
        const response = await api.post('projects',{
                "title": `Project ${Date.now()}`,
                "owner": "Roger"
            });    
            
        const project = response.data;
        setProjects([... projects, project]);
    }
    return (
        <>            
            <Header title="Projects"/>
            
                <ul>
                    {projects.map(project => <li key={project.id}>{project.title}</li>)}
                </ul>
                <button type="button" onClick={handleAddProject}>Adcionar projeto</button>
        </>
    )
}

export default App;