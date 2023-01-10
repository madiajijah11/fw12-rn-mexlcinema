import {
  Datepicker,
  Layout,
  Select,
  SelectItem,
  Text,
  Card,
  Divider,
  Button,
} from "@ui-kitten/components";
import { Image } from "@rneui/themed";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import SpiderMan from "../../assets/Rectangle-119.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import ebvid from "../../assets/Vector.png";
import { useNavigation } from "@react-navigation/native";

const data = {
  id: 1,
  poster: SpiderMan,
  title: "Spider-Man: Homecoming",
  genre: "Adventure, Action, Sci-Fi",
  releaseDate: "June 28, 2017",
  director: "Jon Watts",
  duration: "2h 13m",
  cast: "Tom Holland, Michael Keaton, Robert Downey Jr.",
  synopsis:
    "Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ",
};

const FirstSection = () => {
  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <Layout
        style={{
          padding: 10,
          borderWidth: 1,
          width: 190,
          height: 280,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={data.poster}
          style={{ width: 160, height: 250, borderRadius: 10 }}
        />
      </Layout>
      <Text category="h5">{data.title}</Text>
      <Text
        category="s1"
        style={{
          marginVertical: 10,
        }}
      >
        {data.genre}
      </Text>
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Layout
          style={{
            width: 180,
          }}
        >
          <Text>Release Date</Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {data.releaseDate}
          </Text>
        </Layout>
        <Layout
          style={{
            width: 180,
          }}
        >
          <Text>Directed by</Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {data.cast}
          </Text>
        </Layout>
      </Layout>
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Layout
          style={{
            width: 180,
          }}
        >
          <Text>Duration</Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {data.duration}
          </Text>
        </Layout>
        <Layout
          style={{
            width: 180,
          }}
        >
          <Text>Casts</Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {data.cast}
          </Text>
        </Layout>
      </Layout>
      <Layout
        style={{
          width: 360,
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Synopsis
        </Text>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          {data.synopsis}
        </Text>
      </Layout>
    </Layout>
  );
};

const schedules = {
  id: 1,
  cinemaPoster: ebvid,
  cinemaLocation: "Whatever street No.12, South Purwokerto",
  times: [
    "08:30am",
    "08:30am",
    "08:30am",
    "08:30am",
    "08:30am",
    "08:30am",
    "08:30am",
    "08:30am",
  ],
  price: 50000,
};

const SecondSection = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState();
  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Text>Showtimes and Tickets</Text>
        <Datepicker
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
          accessoryRight={<AntDesign name="calendar" size={24} color="black" />}
          style={{
            marginVertical: 10,
          }}
        />
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <SelectItem title="Sort" />
          <SelectItem title="Latest" />
          <SelectItem title="Oldest" />
        </Select>
        <Card
          style={{
            margin: 20,
          }}
        >
          <Layout
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={schedules.cinemaPoster}
              style={{
                width: 100,
                height: 75,
                resizeMode: "contain",
              }}
            />
            <Text category="s2">{schedules.cinemaLocation}</Text>
          </Layout>
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {schedules.times.map((time, index) => (
              <Text
                key={index + 1}
                style={{
                  width: "25%",
                  textAlign: "center",
                }}
              >
                {time}
              </Text>
            ))}
          </Layout>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Price</Text>
            <Text
              style={{
                fontWeight: "600",
              }}
            >
              {Number(schedules.price).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </Layout>
          <Button onPress={() => navigation.navigate("OrderPage")}>
            Book Now
          </Button>
        </Card>
      </Layout>
    </Layout>
  );
};

const MovieDetails = ({ route }) => {
  console.log(route);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <FirstSection />
        <SecondSection />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MovieDetails;
