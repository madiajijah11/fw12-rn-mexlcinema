import {
  Select,
  SelectItem,
  Layout,
  Text,
  Input,
  List,
  Button,
} from "@ui-kitten/components";
import { useState } from "react";

import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";
import Months from "../components/Months";
import MovieCard from "../components/MovieCard";

import SpiderMan from "../../assets/Rectangle-119.png";
import LionKing from "../../assets/Rectangle-119-1.png";
import JohnWick from "../../assets/Rectangle-119-2.png";
import BlackWidow from "../../assets/Rectangle-139.png";

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
  {
    id: 4,
    poster: BlackWidow,
    title: "Black Widow",
    genre: "Action, Adventure, Sci-Fi",
  },
];

const FirstSection = () => {
  const [selectedIndex, setSelectedIndex] = useState();
  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Text category="h6">List Movie</Text>
        <Select
          style={{
            marginVertical: 10,
          }}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <SelectItem title="Sort" />
          <SelectItem title="Latest" />
          <SelectItem title="Oldest" />
        </Select>
        <Input placeholder="Search Movie Name ..." />
      </Layout>
    </Layout>
  );
};

const SecondSection = () => {
  const renderItem = ({ item }) => <MovieCard item={item} />;

  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Months />
        <List data={data} renderItem={renderItem} initialNumToRender={4} />
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              marginHorizontal: 5,
            }}
          >
            1
          </Button>
          <Button
            style={{
              marginHorizontal: 5,
            }}
          >
            2
          </Button>
          <Button
            style={{
              marginHorizontal: 5,
            }}
          >
            3
          </Button>
          <Button
            style={{
              marginHorizontal: 5,
            }}
          >
            4
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const ViewAll = () => {
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

export default ViewAll;
