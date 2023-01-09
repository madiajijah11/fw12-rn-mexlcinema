import { Layout, Text } from "@ui-kitten/components";
import { Image } from "@rneui/themed";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";

import SpiderMan from "../../assets/Rectangle-119.png";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
          <Text>{data.releaseDate}</Text>
        </Layout>
        <Layout
          style={{
            width: 180,
          }}
        >
          <Text>Directed by</Text>
          <Text>{data.cast}</Text>
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
          <Text>{data.duration}</Text>
        </Layout>
        <Layout
          style={{
            width: 180,
          }}
        >
          <Text>Casts</Text>
          <Text>{data.cast}</Text>
        </Layout>
      </Layout>
      <Layout
        style={{
          width: 360,
        }}
      >
        <Text>Synopsis</Text>
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

const MovieDetails = ({ route }) => {
  console.log(route);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <FirstSection />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MovieDetails;
