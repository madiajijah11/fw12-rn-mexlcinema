import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
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
import { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

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
        backgroundColor: "#3567ff",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <Text>Total</Text>
      <Text>150000</Text>
    </Layout>
  );
};

const PaymentMethods = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Text>Payment Method</Text>
        <Card>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.map((item) => {
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
                    <Image
                      source={item.paymentPicture}
                      style={{
                        height: 75,
                        width: 95,
                        resizeMode: "contain",
                      }}
                    />
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
  );
};

const PayOrderSchema = Yup.object().shape({
  fullName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(13, "Phone number must be at most 13 characters")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const PersonalInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "all",
    resolver: yupResolver(PayOrderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data) => {
    Alert.alert("Form Data", JSON.stringify(data));
  };

  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Text>Personal Info</Text>
        <Card>
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
                errorMessage={errors.phoneNumber && errors.phoneNumber.message}
              />
            )}
            name="phoneNumber"
          />
        </Card>
        <Button
          onPress={() => handleSubmit(onSubmit)}
          disabled={!isDirty}
          style={{
            marginVertical: 10,
          }}
        >
          Pay your order
        </Button>
      </Layout>
    </Layout>
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
        <PersonalInfo />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentPage;
