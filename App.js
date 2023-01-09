import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React from "react";
import Navigation from "./src/navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

export default function App() {
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <View
          style={{
            flexBasis: "100%",
          }}
        >
          <Navigation />
          <StatusBar style="auto" />
        </View>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
