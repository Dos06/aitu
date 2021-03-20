import React, {useEffect, useState} from "react";
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
import {Button, message} from "antd";
import ScrollToBottom from "react-scroll-to-bottom";
import {
    getUsers,
    countNewMessages,
    findChatMessages,
    findChatMessage,
} from "./ApiUtil";
import {useRecoilValue, useRecoilState} from "recoil";
import {
    loggedInUser,
    chatActiveContact,
    chatMessages,
} from "./globalState";

let stompClient = null;
const ChatDetails = (props) => {
    // const currentUser = useRecoilValue(loggedInUser);
    const [text, setText] = useState("");
    const [contacts, setContacts] = useState([]);
    const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
    const [messages, setMessages] = useRecoilState(chatMessages);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push("/login");
        }
        connect();
        loadContacts();
    }, []);

    useEffect(() => {
        if (activeContact === undefined) return;
        // findChatMessages(activeContact.id, currentUser.id).then((msgs) =>
        //     setMessages(msgs)
        // );
        loadContacts();
    }, [activeContact]);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        // console.log(currentUser);
        // stompClient.subscribe(
        //     "/user/" + currentUser.id + "/queue/messages",
        //     onMessageReceived
        // );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
            .chatActiveContact;

        if (active.id === notification.senderId) {
            findChatMessage(notification.id).then((message) => {
                const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
                    .chatMessages;
                newMessages.push(message);
                setMessages(newMessages);
            });
        } else {
            message.info("Received a new message from " + notification.senderName);
        }
        loadContacts();
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                // senderId: currentUser.id,
                recipientId: activeContact.id,
                // senderName: currentUser.name,
                recipientName: activeContact.name,
                content: msg,
                timestamp: new Date(),
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));

            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

    const loadContacts = () => {
        const promise = getUsers().then((users) => {
            // users.map((contact) =>
            //     countNewMessages(contact.id, currentUser.id).then((count) => {
            //         contact.newMessages = count;
            //         return contact;
            //     })
            // )
        });

        promise.then((promises) =>
            Promise.all(promises).then((users) => {
                setContacts(users);
                if (activeContact === undefined && users.length > 0) {
                    setActiveContact(users[0]);
                }
            })
        );
    };


    const history = useHistory()
    // const [currentUser, setCurrentUser] = useState(DbService.getCurrentUser())
    // const [chatData, setChatData] = useState(DbService.getChatById())
    const [message, setMessage] = useState('');
    const onChangeMessage = m => {
        setMessage(m.target.value)
        setText(m.target.value)
    }

    // const sendMessage = () => {
    //     if (message.trim() !== "") {
    //         DbService.sendMessage({
    //             message: message,
    //             senderId: chatData.senderId,
    //             recipientId: chatData.recipientId,
    //         })
    //     }
    // }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton onClick={() => history.push('/chats')} defaultHref="/chats"/>
                    </IonButtons>
                    <IonTitle>Dos</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <ScrollToBottom>
                    <IonList>

                    </IonList>
                </ScrollToBottom>
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <IonItem>
                        <IonTextarea placeholder={'Enter a message'} clearOnEdit={false} value={message}
                                     onIonChange={onChangeMessage}/>
                        <IonButton
                            className={s.btnSend}
                            onClick={() => {
                                sendMessage(text)
                                setText('')
                                setMessage('')
                            }}>
                            Send
                        </IonButton>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </>
    )
}

export default ChatDetails
