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
import { useEffect, useState } from "react";
import { Image } from "@rneui/themed";
import ebvid from "../../assets/Vector.png";
import http from "../helpers/http";
import { useSelector } from "react-redux";

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
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [history, setHistory] = useState([]);
  const ImgURL = `https://adventurous-baseball-cap-newt.cyclic.app/assets/uploads/`;

  useEffect(() => {
    const history = async () => {
      const { data } = await http(token).get("/transactions/history");
      setHistory(data.data);
    };
    history();
  }, []);

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        {/* <Card disabled>
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
          <Button
            status="success"
            onPress={() => navigation.navigate("Ticket")}
          >
            Ticket in active
          </Button>
        </Card> */}
        {history?.map((item) => {
          return (
            <Card disabled key={item?.id}>
              {item.cinemaPicture ? (
                <Image
                  source={{ uri: ImgURL + item.cinemaPicture }}
                  style={{
                    width: 100,
                    height: 75,
                    resizeMode: "contain",
                  }}
                />
              ) : (
                <Image
                  source={ebvid}
                  style={{
                    width: 100,
                    height: 75,
                    resizeMode: "contain",
                  }}
                />
              )}
              <Text>
                {item?.bookingDate ? convertDate(item?.bookingDate) : "N/A"} -{" "}
                {item?.bookingTime}
              </Text>
              <Text>{item?.title}</Text>
              <Divider
                style={{
                  marginVertical: 10,
                }}
              />
              <Button
                status="success"
                onPress={() => navigation.navigate("Ticket")}
              >
                Ticket in active
              </Button>
            </Card>
          );
        })}
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
