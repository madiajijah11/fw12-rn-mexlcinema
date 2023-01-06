import { Header, Text } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

const HeaderBar = () => {
  return (
    <Header
      containerStyle={{
        backgroundColor: "blue",
      }}
      leftComponent={
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          MexL Cinema
        </Text>
      }
      rightComponent={<Ionicons name="menu" size={50} color="white" />}
    />
  );
};

export default HeaderBar;
