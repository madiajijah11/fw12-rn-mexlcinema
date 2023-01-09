import { View } from "react-native";
import { Image, Text } from "@rneui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";

import Logo from "../../assets/mexl_cinema-1-edit-removebg.png";
import Sponsor1 from "../../assets/Vector.png";
import Sponsor2 from "../../assets/Vector-1.png";
import Sponsor3 from "../../assets/Vector-2.png";

const Footer = () => {
  return (
    <View style={{ backgroundColor: "#3567ff", padding: 20 }}>
      <View>
        <Image
          source={Logo}
          style={{
            aspectRatio: 1,
            height: 100,
            width: 160,
            resizeMode: "contain",
          }}
        />
        <Text>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Explore
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              margin: 2,
            }}
          >
            Home
          </Text>
          <Text
            style={{
              margin: 2,
            }}
          >
            List Movie
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Our Sponsors
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={Sponsor1}
            style={{
              height: 50,
              width: 100,
              resizeMode: "center",
            }}
          />
          <Image
            source={Sponsor2}
            style={{
              height: 50,
              width: 100,
              resizeMode: "center",
            }}
          />
          <Image
            source={Sponsor3}
            style={{
              height: 50,
              width: 100,
              resizeMode: "center",
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Follow us
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <AntDesign
            style={{
              marginHorizontal: 5,
            }}
            name="facebook-square"
            size={24}
            color="black"
          />
          <AntDesign
            style={{
              marginHorizontal: 5,
            }}
            name="instagram"
            size={24}
            color="black"
          />
          <AntDesign
            style={{
              marginHorizontal: 5,
            }}
            name="twitter"
            size={24}
            color="black"
          />
          <AntDesign
            style={{
              marginHorizontal: 5,
            }}
            name="youtube"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View>
        <Text>&copy; 2022 MexL Cinema, All Rights Reserved.</Text>
      </View>
    </View>
  );
};

export default Footer;
