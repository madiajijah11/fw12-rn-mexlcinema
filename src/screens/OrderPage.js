import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "../components/Footer";
import HeaderBar from "../components/HeaderBar";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "@rneui/themed";
import ebvid from "../../assets/Vector.png";
import { useNavigation } from "@react-navigation/native";
import { chooseSeat } from "../redux/reducers/transaction";
import { useDispatch } from "react-redux";

const SelectSeats = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedSeat, setSelectedSeat] = useState([]);
  const selectSeat = (seat) => {
    if (selectedSeat.includes(seat)) {
      setSelectedSeat([...selectedSeat.filter((item) => item !== seat)]);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };

  const checkout = () => {
    dispatch(chooseSeat({ seatNum: selectedSeat.join(", ") }));
    navigation.navigate("PaymentPage");
  };
  return (
    <>
      <Layout>
        <Layout
          style={{
            padding: 10,
          }}
        >
          <Text>Choose Your Seat</Text>
          <Card disabled>
            <Divider
              style={{
                paddingVertical: 5,
                marginVertical: 10,
              }}
            />
            <Layout
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Layout
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {["A", "B", "C", "D", "E", "F", "G", " "].map((abc, index) => {
                  return (
                    <Layout key={index}>
                      {["0", "1", "2", "3", "4", "5", "6", "7"].map(
                        (number, index) => {
                          if (number > 0) {
                            if (abc !== " ") {
                              const seatNumber = `${abc}${number}`;
                              return (
                                <Pressable
                                  key={index}
                                  onPress={() => selectSeat(seatNumber)}
                                >
                                  <Layout
                                    style={{
                                      margin: 2,
                                      borderRadius: 5,
                                      width: 20,
                                      height: 20,
                                      backgroundColor:
                                        (selectedSeat.includes(seatNumber) &&
                                          "#3567ff") ||
                                        "brown",
                                    }}
                                  >
                                    <Text> </Text>
                                  </Layout>
                                </Pressable>
                              );
                            }
                          }
                        }
                      )}
                    </Layout>
                  );
                })}
              </Layout>
              <Layout
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {["A", "B", "C", "D", "E", "F", "G", " "].map((abc, index) => {
                  return (
                    <Layout key={index}>
                      {["0", "8", "9", "10", "11", "12", "13", "14"].map(
                        (number, index) => {
                          if (number > 0) {
                            if (abc !== " ") {
                              const seatNumber = `${abc}${number}`;
                              return (
                                <Pressable
                                  key={index}
                                  onPress={() => selectSeat(seatNumber)}
                                >
                                  <Layout
                                    style={{
                                      margin: 2,
                                      borderRadius: 5,
                                      width: 20,
                                      height: 20,
                                      backgroundColor:
                                        (selectedSeat.includes(seatNumber) &&
                                          "#3567ff") ||
                                        "brown",
                                    }}
                                  >
                                    <Text> </Text>
                                  </Layout>
                                </Pressable>
                              );
                            }
                          }
                        }
                      )}
                    </Layout>
                  );
                })}
              </Layout>
            </Layout>
            <Layout>
              <Text
                style={{
                  marginVertical: 10,
                }}
              >
                Seating key
              </Text>
              <Layout
                style={{
                  flexDirection: "row",
                }}
              >
                <Layout>
                  <Text>
                    <AntDesign name="arrowdown" size={24} /> A - G
                  </Text>
                  <Layout
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Layout
                      style={{
                        margin: 2,
                        borderRadius: 5,
                        width: 23,
                        backgroundColor: "brown",
                      }}
                    >
                      <Text> </Text>
                    </Layout>
                    <Text>Available</Text>
                  </Layout>
                  <Layout
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Layout
                      style={{
                        margin: 2,
                        borderRadius: 5,
                        width: 23,
                        backgroundColor: "cyan",
                      }}
                    >
                      <Text> </Text>
                    </Layout>
                    <Text>Sold</Text>
                  </Layout>
                </Layout>
                <Layout>
                  <Text>
                    <AntDesign name="arrowright" size={24} /> 1-14
                  </Text>
                  <Layout
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Layout
                      style={{
                        margin: 2,
                        borderRadius: 5,
                        width: 23,
                        backgroundColor: "#3567ff",
                      }}
                    >
                      <Text> </Text>
                    </Layout>
                    <Text>Selected</Text>
                  </Layout>
                </Layout>
              </Layout>
            </Layout>
          </Card>
        </Layout>
      </Layout>
      <Layout>
        <Layout
          style={{
            padding: 10,
          }}
        >
          <Text>Order Info</Text>
          <Card disabled>
            <Layout
              style={{
                justifyContent: "center",
              }}
            >
              <Layout
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={ebvid}
                  style={{
                    width: 100,
                    height: 75,
                    resizeMode: "contain",
                  }}
                />
                <Text>ebv.id Cinema</Text>
                <Text>Spider-Man: Homecoming</Text>
              </Layout>
              <Layout>
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Tuesday, 07 July 2020</Text>
                  <Text>02:00pm</Text>
                </Layout>
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>One ticket price</Text>
                  <Text>50000</Text>
                </Layout>
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Seat choose</Text>
                  <Text>C4, C5, C6</Text>
                </Layout>
                <Divider />
                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Total Payment</Text>
                  <Text>150000</Text>
                </Layout>
              </Layout>
            </Layout>
          </Card>
          <Button
            style={{ marginVertical: 10 }}
            disabled={selectedSeat.length === 0}
            onPress={checkout}
          >
            Checkout now
          </Button>
        </Layout>
      </Layout>
    </>
  );
};

const OrderPage = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <SelectSeats />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OrderPage;
