import React, {useState} from 'react';
import Header from './components/Header'

import './App.css'
import backgoundImage from './assets/background.jpg'

function App(){
    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);

    function handleAddProject(){
        setProjects([ ... projects, `Project ${Date.now()}`])
        console.log(projects)
    }
    return (
        <>            
            <Header title="Projects"/>
            <img width="300" src={backgoundImage} />
                <ul>
                    {projects.map(project => <li key={project}>{project}</li>)}
                </ul>
                <button type="button" onClick={handleAddProject}>Adcionar projeto</button>
        </>
    )
}

export default App;