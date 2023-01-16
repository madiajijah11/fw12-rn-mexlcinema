import { Image, ListItem } from "@rneui/themed";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const ImgURL = `https://adventurous-baseball-cap-newt.cyclic.app/assets/uploads/`;

const MovieCard = ({ item }) => {
  const navigation = useNavigation();

  // limit genre to 3 words
  const genre = item?.movieGenre?.map((genre) => genre.genres.name).join(", ");
  const limitGenre = genre?.length > 20 ? genre?.slice(0, 20) + "..." : genre;

  // limit title to 3 words
  const limitTitle =
    item.title?.length > 20 ? item.title?.slice(0, 20) + "..." : item.title;

  return (
    <Card
      disabled={true}
      key={item.id}
      style={{
        borderWidth: 1,
        borderColor: "#3567ff",
        marginHorizontal: 5,
        marginVertical: 10,
      }}
    >
      <Layout
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item.picture ? (
          <Image
            source={{ uri: ImgURL + item.picture }}
            style={{
              width: 120,
              height: 170,
              borderRadius: 5,
              resizeMode: "contain",
            }}
          />
        ) : (
          <Image
            source={item.poster}
            style={{
              width: 120,
              height: 170,
              borderRadius: 5,
              resizeMode: "contain",
            }}
          />
        )}
        <Text style={{ fontWeight: "bold", marginTop: 5 }}>
          {item?.title ? limitTitle : "No Title"}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>
          {item?.movieGenre ? limitGenre : "No Genre"}
        </Text>
        <Button
          appearance="outline"
          onPress={() => navigation.navigate("MovieDetails", { item: item.id })}
        >
          Details
        </Button>
      </Layout>
    </Card>
  );
};

export default MovieCard;
