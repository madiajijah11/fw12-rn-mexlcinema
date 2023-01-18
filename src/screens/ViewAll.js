import {
  Select,
  SelectItem,
  Layout,
  Text,
  Input,
  Button,
  IndexPath,
} from "@ui-kitten/components";
import { useState, useEffect } from "react";
import http from "../helpers/http";

import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";
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

const orders = ["desc", "asc"];

const FirstSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [months, setMonths] = useState([]);
  const [paginating, setPaginating] = useState(1);
  const [month, setMonth] = useState("");
  const [order, setOrder] = useState("");

  const displayValue = orders[selectedIndex.row];

  const fetchMonths = async () => {
    try {
      const response = await http().get("/api/v1/months");
      setMonths(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      const fetchMovies = async () => {
        const response = await http().get(
          `/api/v1/movies?search=${search}&page=${paginating}&order=${order}&limit=4`
        );
        setMovies(response.data.results);
      };
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMonths();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await http().get(
          `/api/v1/movies?page=${paginating}&order=${order}&limit=4`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [paginating, order]);

  return (
    <>
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
            onSelect={(index) => {
              setSelectedIndex(index);
              setOrder(orders[index.row]);
            }}
            value={displayValue}
          >
            {orders.map((item) => (
              <SelectItem key={item} title={item} />
            ))}
          </Select>
          <Input
            placeholder="Search Movie Name ..."
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
          <Button
            onPress={onSubmit}
            style={{ marginVertical: 10 }}
            size="small"
          >
            Search
          </Button>
        </Layout>
      </Layout>
      <Layout>
        <Layout
          style={{
            padding: 10,
          }}
        >
          <ScrollView horizontal>
            {months?.map((item) => (
              <Button
                key={item.id}
                style={{
                  margin: 5,
                }}
                onPress={() => setMonth(item.id)}
              >
                {item.name}
              </Button>
            ))}
          </ScrollView>
          <Layout>
            {movies?.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </Layout>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => setPaginating(paginating - 1)}
              disabled={paginating === 1}
            >
              Prev
            </Button>
            <Button
              status="info"
              style={{
                marginHorizontal: 10,
              }}
            >
              {paginating}
            </Button>
            <Button
              onPress={() => setPaginating(paginating + 1)}
              disabled={movies.length < 4}
            >
              Next
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </>
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
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ViewAll;
