import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import styles from './home.module.css';
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo";

function GraphHome() {
    const [chars, setChars] = useState([]);
    let query = gql`
        {
            characters{
                results{
                    name
                    image
                }
            }
        }
    `

    let {data,loading,error} = useQuery(query)

    useEffect(() => {
        if (data && !loading && !error){
            setChars([...data.characters.results])
        } 
    }, [data]);

    function nextCharacter() {
        chars.shift();
        setChars([...chars]);
    }

    if (loading) return <h4>Cargando...</h4>
    
    return (  
        <div className={styles.container}>
            <Card 
                leftClick={nextCharacter} 
                //rightClick={addToFavorite} 
                {...chars[0]} 
            />
        </div>
    );
}

export default GraphHome;