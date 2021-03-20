import {
    IonContent,
    IonTitle,
    IonToolbar,
    IonList,
    IonItemDivider,
    IonItem,
    IonInput,
    IonButton,
} from "@ionic/react";
import React, {useState} from "react";
import DbService from "../../_services/DbService";
import {useHistory} from "react-router";

const Auth = (props) => {
    const history = useHistory()

    const [reg, setReg] = useState(props.register)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authorize = () => {
        reg ?
            DbService.register(username, password)
                .then(() => history.push('/chats'))
                .catch(e => console.log(e))
            :
            DbService.login(username, password)
                .then(() => history.push('/chats'))
                .catch(e => console.log(e))
    }

    return (
        <>
            <IonToolbar>
                <IonTitle>{reg ? 'Registration' : 'Authorization'}</IonTitle>
            </IonToolbar>

            <IonContent>
                <IonList>
                    <IonItemDivider>Username</IonItemDivider>
                    <IonItem>
                        <IonInput value={username} placeholder="Enter Username"
                                  onIonChange={e => setUsername(e.target.value)}/>
                    </IonItem>
                    <IonItemDivider>Password</IonItemDivider>
                    <IonItem>
                        <IonInput type={'password'} value={password} placeholder="Enter Password"
                                  onIonChange={e => setPassword(e.target.value)}/>
                    </IonItem>
                    <IonButton expand={'full'} onClick={authorize}>SUBMIT</IonButton>
                </IonList>
            </IonContent>
        </>
    )
}

export default Auth
