import {
    IonContent,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React from "react";
import ChatItem from "../ChatDetails/ChatItem/ChatItem";

const Chats = () => {
    return (
        <>
            <IonToolbar>
                <IonTitle>Kiss App</IonTitle>
            </IonToolbar>

            <IonContent>
                <ChatItem item={{id: 1, name: 'Dos', lastMessage: 'Lorem ipsum dolor sit amet.', lastMessageDate: '20.03.2021'}}/>
                <ChatItem item={{id: 2, name: 'Karim', lastMessage: 'Lorem ipsum dolor sit amet.', lastMessageDate: '20.03.2021'}}/>
                <ChatItem item={{id: 3, name: 'Anton', lastMessage: 'Lorem ipsum dolor sit amet.', lastMessageDate: '20.03.2021'}}/>
            </IonContent>
        </>
    )
}

export default Chats
