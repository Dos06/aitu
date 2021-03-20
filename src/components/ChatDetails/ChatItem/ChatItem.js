import React from "react";
import {IonAvatar, IonItem, IonLabel, IonIcon} from "@ionic/react";
import s from './ChatItem.module.css';
import {useHistory} from "react-router";

const ChatItem = (props) => {
    const history = useHistory()

    return (
        <IonItem onClick={() => history.push(`/chats/${props.item.id}`)}>
            <IonAvatar slot={'start'}>
                <img src="https://image.flaticon.com/icons/png/512/168/168726.png" alt="avatar"/>
            </IonAvatar>
            <IonLabel>
                <h2>{props.item.name}</h2>
                <p>
                    <IonIcon name={'checkmarkDone'} className={s.messageStatus + ' ' + s.read}/>
                    {props.item.lastMessage}
                </p>
            </IonLabel>
            <IonLabel slot={'end'} className={'ion-text-right'}>
                <p>{props.item.lastMessageDate}</p>
                <p>&nbsp;</p>
            </IonLabel>
        </IonItem>
    )
}

export default ChatItem
