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
    IonList,
} from "@ionic/react";
import {useHistory} from "react-router";
import DbService from "../../_services/DbService";

const ChatDetails = (props) => {
    const history = useHistory()
    // const [currentUser, setCurrentUser] = useState(DbService.getCurrentUser())
    // const [chatData, setChatData] = useState(DbService.getChatData())
    const [message, setMessage] = useState('');
    const onChangeMessage = m => {
        setMessage(m.target.value)
    }

    const sendMessage = () => {
        if (message.trim() !== "") {
            // const msg = {
            //     chatId: chatData.id,
            //     senderId: currentUser.id,
            //     recipientId: chatData.recipientId,
            //     senderName: currentUser.name,
            //     recipientName: chatData.recipientName,
            //     content: message,
            //     timestamp: new Date(),
            // };
            // DbService.sendMessage(msg)
        }
    }

    let conn = new WebSocket('ws://localhost:8080/socket');
    function send(message) {
        conn.send(JSON.stringify(message));
    }
    let configuration = null;
    let peerConnection = new RTCPeerConnection(configuration);
    let dataChannel = peerConnection.createDataChannel("dataChannel", { reliable: true });
    dataChannel.onerror = function(error) {
        console.log("Error:", error);
    };
    dataChannel.onclose = function() {
        console.log("Data channel is closed");
    };
    peerConnection.createOffer(function(offer) {
        send({
            event : "offer",
            data : offer
        });
        peerConnection.setLocalDescription(offer);
    }, (error) => {
        console.log(error)
    });
    peerConnection.onicecandidate = function(event) {
        if (event.candidate) {
            send({
                event : "candidate",
                data : event.candidate
            });
        }
    };
    // peerConnection.addIceCandidate(new RTCIceCandidate(candidate));

    let constraints = {
        video : {
            frameRate : {
                ideal : 10,
                max : 15
            },
            width : 1280,
            height : 720,
            facingMode : "user"
        }
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {})
        .catch((err) => {});

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
                <IonList>

                </IonList>
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
