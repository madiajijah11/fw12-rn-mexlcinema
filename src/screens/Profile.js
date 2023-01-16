import {
  Button,
  Card,
  Divider,
  Layout,
  Tab,
  TabBar,
  Text,
} from "@ui-kitten/components";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/auth";
import http from "../helpers/http";
import { getUserInfo } from "../redux/actions/profile";
import * as ImagePicker from "expo-image-picker";

const TopTabBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Tab
        title="Details Account"
        onPress={() => navigation.navigate("Profile")}
      />
      <Tab
        title="Order History"
        onPress={() => navigation.navigate("History")}
      />
    </TabBar>
  );
};

const Info = ({ user }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const formData = new FormData();
      formData.append("picture", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "picture",
      });
      await http(token).patch("/api/v1/profile/upload", formData);
      Alert.alert("Success", "Picture has been changed");
      dispatch(getUserInfo());
    }
  };

  return (
    <Layout>
      <Layout
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Card disabled>
          <Text>Info</Text>
          <Layout
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              {user?.picture ? (
                <Image
                  source={{ uri: user.picture }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              ) : (
                <Image
                  source={Picture}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              )}
            </TouchableOpacity>
            <Text>
              {user?.firstName || user?.lastName
                ? `${user?.firstName} ${user?.lastName}`
                : "N/A"}
            </Text>
            <Text>Moviegoers</Text>
          </Layout>
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
          <Button
            onPress={() => {
              dispatch(logout());
              navigation.navigate("Home");
            }}
          >
            Logout
          </Button>
        </Card>
      </Layout>
    </Layout>
  );
};

const UpdateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(13, "Phone number must be at most 13 characters")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AccountSettings = ({ user }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await http(token).patch("/api/v1/profile/edit", {
        ...values,
      });
      dispatch(getUserInfo());
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
                label="First Name"
                placeholder="Write your first name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.firstName && errors.firstName.message}
              />
            )}
            name="firstName"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Last Name"
                placeholder="Write your last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.lastName && errors.lastName.message}
              />
            )}
            name="lastName"
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
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || isSubmitting}
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
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

const ChangePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await http(token).patch("/api/v1/profile/changePassword", {
        ...values,
      });
      Alert.alert("Success", "Password changed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Layout
        style={{
          padding: 10,
        }}
      >
        <Card disabled>
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
          disabled={!isDirty || isSubmitting}
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
  const { userInfo } = useSelector((state) => state.profile);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <HeaderBar />
        <TopTabBar />
        <Info user={userInfo} />
        <AccountSettings user={userInfo} />
        <ChangePassword />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
