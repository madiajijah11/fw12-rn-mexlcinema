import { Alert, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components";
import GooglePay from "../../assets/payment/logos_google-pay.png";
import Visa from "../../assets/payment/logos_visa.png";
import GoPay from "../../assets/payment/logos_gopay.png";
import Paypal from "../../assets/payment/logos_paypal.png";
import OVO from "../../assets/payment/logos_ovo.png";
import DANA from "../../assets/payment/logos_dana.png";
import { Image, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import http from "../helpers/http";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 1,
    paymentPicture: GooglePay,
    paymentName: "Google Pay",
  },
  {
    id: 2,
    paymentPicture: Visa,
    paymentName: "Visa",
  },
  {
    id: 3,
    paymentPicture: GoPay,
    paymentName: "GoPay",
  },
  {
    id: 4,
    paymentPicture: Paypal,
    paymentName: "Paypal",
  },
  {
    id: 5,
    paymentPicture: OVO,
    paymentName: "OVO",
  },
  {
    id: 6,
    paymentPicture: DANA,
    paymentName: "DANA",
  },
];

const TotalPayment = () => {
  return (
    <Layout
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
      }}
    >
      <Text>Total</Text>
      <Text>150000</Text>
    </Layout>
  );
};

const PayOrderSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(13, "Phone number must be at most 13 characters")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const PaymentMethods = () => {
  const navigation = useNavigation();
  const [paymentList, setPaymentList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const dataTransaction = useSelector((state) => state.transaction);
  const userId = useSelector((state) => state.profile.userInfo.id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getPaymentList();
  }, []);

  const getPaymentList = async () => {
    const { data } = await http(token).get("/paymentmethods");
    setPaymentList(data.data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(PayOrderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });
  console.log({ ...dataTransaction });

  const onSubmit = async (values) => {
    try {
      const { data } = await http(token).post("/api/v1/transactions/checkout", {
        userId,
        ...dataTransaction,
        paymentMethodId: selectedPayment,
        ...values,
      });
      Alert.alert("Success", data.message);
      navigation.navigate("History");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <Layout
          style={{
            padding: 10,
          }}
        >
          <Text>Payment Method</Text>
          <Card disabled>
            <Layout
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {paymentList?.map((item) => {
                return (
                  <Layout
                    key={item.id}
                    style={{
                      borderRadius: 10,
                      backgroundColor:
                        selectedPayment === item.id ? "#3567ff" : "white",
                      borderWidth: 1,
                      padding: 5,
                      margin: 5,
                    }}
                  >
                    <Pressable onPress={() => setSelectedPayment(item.id)}>
                      {item.picture ? (
                        <Image
                          source={{ uri: item.picture }}
                          style={{
                            height: 75,
                            width: 95,
                            resizeMode: "contain",
                          }}
                        />
                      ) : (
                        <Image
                          source={data[0].paymentPicture}
                          style={{
                            height: 75,
                            width: 95,
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </Pressable>
                  </Layout>
                );
              })}
              <Layout
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Divider style={{ flex: 1 }} />
                <Text
                  style={{
                    marginHorizontal: 10,
                  }}
                >
                  or
                </Text>
                <Divider style={{ flex: 1 }} />
              </Layout>
            </Layout>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Pay via cash.{" "}
              <Text
                style={{
                  color: "#3567ff",
                }}
              >
                See how it work
              </Text>
            </Text>
          </Card>
        </Layout>
      </Layout>
      <Layout>
        <Layout
          style={{
            padding: 10,
          }}
        >
          <Text>Personal Info</Text>
          <Card disabled>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  placeholder="Write your full name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.fullName && errors.fullName.message}
                />
              )}
              name="fullName"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Write your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email && errors.email.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Phone Number"
                  placeholder="Write your phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={
                    errors.phoneNumber && errors.phoneNumber.message
                  }
                />
              )}
              name="phoneNumber"
            />
          </Card>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || isSubmitting}
            style={{
              marginVertical: 10,
            }}
          >
            Pay your order
          </Button>
        </Layout>
      </Layout>
    </>
  );
};

const PaymentPage = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <TotalPayment />
        <PaymentMethods />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentPage;
