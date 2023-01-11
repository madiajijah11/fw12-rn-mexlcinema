import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React from "react";
import Navigation from "./src/navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { persistor, store } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <StatusBar style="auto" />
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
