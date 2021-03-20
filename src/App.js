import React, { useEffect, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {IonApp} from "@ionic/react";
import {Route, Switch, useParams} from 'react-router-dom';

import "./App.css";
import Chats from "./components/Chats/Chats";
import ChatDetails from "./components/ChatDetails/ChatDetails";
import Auth from "./components/Auth/Auth";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App = () => {
  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState("<username>");

  return (
    <IonApp>
        <Switch>
          <Route path={'/auth'} exact render={() => <Auth register={false}/>}/>
          <Route path={'/register'} exact render={() => <Auth register={true}/>}/>
          {/*<Route path={'/register'} exact render={() => <Register/>}/>*/}
          <Route path={'/chats'} exact render={() => <Chats/>}/>
          <Route path={'/chats/:id'} children={<Child/>}/>
        </Switch>
    </IonApp>
  );
};

function Child() {
  const {id} = useParams();
  const state = {
    id: id,
    name: 'Dos',
  }

  return (
      <ChatDetails state={state}/>
  );
}

export default App;
