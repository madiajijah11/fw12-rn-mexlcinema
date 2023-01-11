import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import {
  Tab,
  TabBar,
  Card,
  Text,
  Divider,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useState } from "react";
import { Image } from "@rneui/themed";
import ebvid from "../../assets/Vector.png";

const TopTabBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigation = useNavigation();
  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Tab
        title="Details Account"
        onPress={() => navigation.navigate("Profile")}
      />
      <Tab
        title="Order History"
        onPress={() => navigation.navigate("History")}
      />
    </TabBar>
  );
};

const OrderHistory = () => {
  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Card>
          <Image
            source={ebvid}
            style={{
              width: 100,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
          <Text>Spider-Man: Homecoming</Text>
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
          <Button status="success">Ticket in active</Button>
        </Card>
      </Layout>
    </Layout>
  );
};

const History = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <TopTabBar />
        <OrderHistory />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default History;
