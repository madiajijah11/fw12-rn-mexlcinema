import { Text, Image, ListItem } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import HeaderBar from "../components/HeaderBar";
import { View } from "react-native";
import DashboardImage from "../../assets/homepage.png";
import SpiderMan from "../../assets/Rectangle-119.png";
import LionKing from "../../assets/Rectangle-119-1.png";
import JohnWick from "../../assets/Rectangle-119-2.png";

const data = [
  {
    id: 1,
    poster: SpiderMan,
    title: "Spider-Man: Homecoming",
    genre: "Action, Adventure, Sci-Fi",
  },
  {
    id: 2,
    poster: LionKing,
    title: "The Lion King",
    genre: "Animation, Adventure, Drama",
  },
  {
    id: 3,
    poster: JohnWick,
    title: "John Wick: Chapter 3 - Parabellum",
    genre: "Action, Crime, Thriller",
  },
];

const Home = () => {
  return (
    <ScrollView>
      <HeaderBar />
      <View style={{ marginVertical: 40, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18 }}>Nearest Cinema, Newest Movie,</Text>
        <Text style={{ color: "blue", fontSize: 30 }}>Find out now!</Text>
        <Image
          source={DashboardImage}
          style={{ aspectRatio: 1, width: "100%", resizeMode: "center" }}
        />
      </View>
      <View style={{ backgroundColor: "white" }}>
        <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>Now Showing</Text>
            <Text style={{ fontSize: 18, color: "blue" }}>View all</Text>
          </View>
          <ScrollView horizontal>
            {data.map((item) => (
              <ListItem key={item.id}>
                <Image
                  source={item.poster}
                  style={{ width: 100, height: 150 }}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                  <ListItem.Subtitle>{item.genre}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
