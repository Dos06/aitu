import React, {useState} from "react";
import s from './ChatDetails.module.css';
import {
    IonTitle,
    IonHeader,
    IonToolbar,
    IonFooter,
    IonContent,
    IonButtons,
    IonBackButton,
    IonItem,
    IonTextarea,
    IonButton,
} from "@ionic/react";
import {useHistory} from "react-router";

const ChatDetails = (props) => {
    const history = useHistory()
    const [message, setMessage] = useState('');
    const onChangeMessage = m => {
        setMessage(m.target.value)
    }

    const sendMessage = () => {
        console.log(message)
    }


    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton onClick={() => history.push('/chats')} defaultHref="/chats"/>
                    </IonButtons>
                    <IonTitle>{props.state.name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <IonItem>
                        <IonTextarea placeholder={'Enter a message'} clearOnEdit={false} value={message} onIonChange={onChangeMessage}/>
                        <IonButton className={s.btnSend} onClick={sendMessage}>Send</IonButton>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </>
    )
}

export default ChatDetails
