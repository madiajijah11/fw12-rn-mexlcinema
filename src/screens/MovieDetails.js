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
import { useState, useEffect } from "react";
import SpiderMan from "../../assets/Rectangle-119.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import ebvid from "../../assets/Vector.png";
import { useNavigation } from "@react-navigation/native";
import http from "../helpers/http";

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

const FirstSection = ({ id }) => {
  const [movie, setMovie] = useState({});
  const ImgURL = `https://adventurous-baseball-cap-newt.cyclic.app/assets/uploads/`;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const { data } = await http().get(`/movies/${id}`);
        setMovie(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [id]);

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const convertTime = (time) => {
    const timeArray = time?.split(":");
    const hour = timeArray[0]?.replace(/^0+/, "");
    const minute = timeArray[1]?.replace(/^0+/, "");
    return minute === "" ? `${hour} hour` : `${hour} hour ${minute} minute`;
  };

  // convert cast to array
  const castArray = movie?.cast?.split(",");
  // just show 3 cast
  const castArray3 = castArray?.slice(0, 3);

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
        {movie?.picture ? (
          <Image
            source={{ uri: ImgURL + movie.picture }}
            style={{ width: 160, height: 250, borderRadius: 10 }}
          />
        ) : (
          <Image
            source={data.poster}
            style={{ width: 160, height: 250, borderRadius: 10 }}
          />
        )}
      </Layout>
      <Text category="h5">{movie?.title}</Text>
      <Text
        category="s1"
        style={{
          marginVertical: 10,
        }}
      >
        {movie?.genre}
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
            {convertDate(movie?.releaseDate)}
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
            {movie?.director}
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
            {movie?.duration}
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
            {castArray3?.map((cast, index) => {
              return index === castArray3.length - 1 ? (
                <Text key={index}>
                  {cast}
                  <Text className="text-gray-400">...</Text>
                </Text>
              ) : (
                <Text key={index}>{cast},</Text>
              );
            })}
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
          {movie?.synopsis}
        </Text>
      </Layout>
    </Layout>
  );
};

const schedules = [
  {
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
  },
];

const SecondSection = ({ id }) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState();
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");

  const ImgURL = `https://adventurous-baseball-cap-newt.cyclic.app/assets/uploads/`;

  useEffect(() => {
    getLocation();
  }, [id]);

  useEffect(() => {
    getSchedule(id, city, date);
  }, [id, city, date]);

  const getLocation = async () => {
    const { data } = await http().get(`/movies/${id}/schedules/city`, {
      params: { date },
    });
    setLocation(data.data);
    if (data.data.length) {
      setCity(data.data[0].name);
    }
  };

  const getSchedule = async (id, city, date) => {
    const { data } = await http().get(`/movies/${id}/schedules`, {
      params: { city, date },
    });
    setSchedule(data.data);
  };

  const selectTime = (time, cinema) => {
    setSelectedTime(time);
    setSelectedCinema(cinema);
  };

  // const book = () => {
  //   dispatch(
  //     chooseMovie({
  //       movieId: id,
  //       cinemaId: selectedCinema,
  //       bookingDate: date,
  //       bookingTime: selectedTime,
  //     })
  //   );
  //   navigate("/order-page");
  // };

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
        {schedule?.map((cinema) => (
          <Card
            disabled
            style={{
              margin: 20,
            }}
            key={cinema?.id}
          >
            <Layout
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cinema?.picture ? (
                <Image
                  source={{ uri: ImgURL + cinema?.picture }}
                  style={{
                    width: 100,
                    height: 75,
                    resizeMode: "contain",
                  }}
                />
              ) : (
                <Image
                  source={schedules.cinemaPoster}
                  style={{
                    width: 100,
                    height: 75,
                    resizeMode: "contain",
                  }}
                />
              )}
              <Text category="s2">
                {cinema.address}, {cinema.city}
              </Text>
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
              {cinema?.time?.map((time, index) => (
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
                {Number(cinema?.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </Text>
            </Layout>
            <Button onPress={() => navigation.navigate("OrderPage")}>
              Book Now
            </Button>
          </Card>
        ))}
      </Layout>
    </Layout>
  );
};

const MovieDetails = ({ route }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <FirstSection id={route.params.item} />
        <SecondSection id={route.params.item} />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MovieDetails;
