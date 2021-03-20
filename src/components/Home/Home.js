import {useHistory} from "react-router";
import {IonButton} from "@ionic/react";
import React from "react";
import styles from './Home.module.css';

const Home = () => {
    const history = useHistory()

    return (
        <>
            <IonButton onClick={() => history.push('/auth')}>Authorization</IonButton>
            <button onClick={() => history.push('/register')} className={styles.button}>Register</button>
            <IonButton onClick={() => history.push('/chats')}>Chats</IonButton>
        </>
    )
}

export default Home
