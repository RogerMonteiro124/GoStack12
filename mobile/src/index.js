import React, {useEffect, useState} from 'react';
import api from  './services/api'
import {View, Text, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';

export default function App(){
    const [projects, setprojects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response=>{
            console.log(response.data);
            setprojects(response.data);
        });
    },[])

    async function handleAddProject(){
        const response = await api.post('projects',{
            'title':`project: ${Date.now()}`,
            'owner': 'Roger'
        });
        const project = response.data
        console.log(response.data)
        setprojects([...projects, project])
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project=>project.id}
                    renderItem={({item: project})=>(
                        <>
                            <Text style={styles.project} key={project.id}>
                                    Title: {project.title}
                            </Text>
                            <Text style={styles.owner} key={project.id}>
                                    Owner: {project.owner}
                            </Text>
                        </>
                    )}
                />


                <TouchableOpacity style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>
                        Adicionar Projeto
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#7159c1'
    },
    title:{
        color: '#fff',
        fontSize:40,
        fontWeight:'bold'        
    },
    project:{
        color: '#fff',
        fontSize:20,       
    },
    owner:{
        color: '#32c423',
        fontSize:15,       
    },
    button:{
        alignSelf:'stretch',
        backgroundColor:'#fff',
        margin:20,
        height:50,
        borderRadius:4 ,
        justifyContent:'center',
        alignItems:'center'     
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:20,       
    }

});