import { Image, ListItem } from "@rneui/themed";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const ImgURL = `https://adventurous-baseball-cap-newt.cyclic.app/assets/uploads/`;

const MovieCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <ListItem
      key={item.id}
      style={{
        borderWidth: 1,
        borderColor: "#3567ff",
        marginHorizontal: 5,
        marginVertical: 10,
      }}
    >
      <ListItem.Content
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
        <ListItem.Title style={{ fontWeight: "bold", marginTop: 5 }}>
          {item.title}
        </ListItem.Title>
        <ListItem.Subtitle style={{ fontSize: 14, marginBottom: 5 }}>
          {item.genre}
        </ListItem.Subtitle>
        <Button
          appearance="outline"
          onPress={() => navigation.navigate("MovieDetails", { item: item.id })}
        >
          Details
        </Button>
      </ListItem.Content>
    </ListItem>
  );
};

export default MovieCard;
