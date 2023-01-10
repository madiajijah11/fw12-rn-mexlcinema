import {
  Button,
  Card,
  Divider,
  Layout,
  Tab,
  TabBar,
  Text,
} from "@ui-kitten/components";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { Image, Input } from "@rneui/themed";
import Picture from "../../assets/profile.png";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const TopTabBar = () => {
  return (
    <TabBar>
      <Tab title="Details Account" />
      <Tab title="Order History" />
    </TabBar>
  );
};

const Info = () => {
  return (
    <Layout>
      <Layout
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Card>
          <Text>Info</Text>
          <Layout
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={Picture}
              style={{
                width: 100,
                height: 100,
                resizeMode: "cover",
              }}
            />
            <Text>Jonas El Rodriguez</Text>
            <Text>Moviegoers</Text>
          </Layout>
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
          <Button>Logout</Button>
        </Card>
      </Layout>
    </Layout>
  );
};

const UpdateProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(13, "Phone number must be at most 13 characters")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AccountSettings = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "all",
    resolver: yupResolver(UpdateProfileSchema),
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
          Update changes
        </Button>
      </Layout>
    </Layout>
  );
};

YupPassword(Yup);

const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .password()
    .min(6, "Password must be at least 6 characters")
    .minLowercase(1, "Password must have at least one lowercase letter")
    .minUppercase(1, "Password must have at least one uppercase letter")
    .minNumbers(1, "Password must have at least one number")
    .minSymbols(1, "Password must have at least one symbol")
    .required("Password is required"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "all",
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
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
        <Card>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="New Password"
                placeholder="Write your new password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.newPassword && errors.newPassword.message}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="black"
                    onPress={() => {
                      handleShowPassword(!showPassword);
                    }}
                  />
                }
              />
            )}
            name="newPassword"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm New Password"
                placeholder="Confirm your new password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={
                  errors.confirmNewPassword && errors.confirmNewPassword.message
                }
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="black"
                    onPress={() => {
                      handleShowPassword(!showPassword);
                    }}
                  />
                }
              />
            )}
            name="confirmNewPassword"
          />
        </Card>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}
          style={{
            marginVertical: 10,
          }}
        >
          Update changes
        </Button>
      </Layout>
    </Layout>
  );
};

const Profile = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <TopTabBar />
        <Info />
        <AccountSettings />
        <ChangePassword />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
