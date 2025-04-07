import "react-native-gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Appnavigator from "./app/index";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Appnavigator />
    </GestureHandlerRootView>
  );
};

export default App;
