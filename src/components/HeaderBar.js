import { Header } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text } from "@ui-kitten/components";

const HeaderBar = () => {
  return (
    <Header
      containerStyle={{
        backgroundColor: "#3567ff",
      }}
      leftComponent={
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          MexL Cinema
        </Text>
      }
      rightComponent={
        <Button size="large">
          <Ionicons name="menu" size={50} color="white" />
        </Button>
      }
    />
  );
};

export default HeaderBar;
