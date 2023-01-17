import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Logo from "../../assets/mexl_cinema-1-edit-removebg.png";
import { Input, Text, Button, Image } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { setToken } from "../redux/reducers/auth";
import http from "../helpers/http";
import { useDispatch } from "react-redux";

YupPassword(Yup);

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(13, "Phone number must be at most 13 characters")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .password()
    .min(6, "Password must be at least 6 characters")
    .minLowercase(1, "Password must have at least one lowercase letter")
    .minUppercase(1, "Password must have at least one uppercase letter")
    .minNumbers(1, "Password must have at least one number")
    .minSymbols(1, "Password must have at least one symbol")
    .required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const { firstName, lastName, phoneNumber, email, password } = values;
      const { data } = await http().post("/api/v1/auth/register", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      dispatch(setToken(data.token));
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              paddingLeft: 10,
              marginBottom: 20,
            }}
          >
            <Image
              source={Logo}
              style={{
                height: 100,
                width: "100%",
                resizeMode: "center",
              }}
            />
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Text>
            <Text>Fill your additional details</Text>
          </View>
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
                label="Password"
                placeholder="Write your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password && errors.password.message}
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
            name="password"
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || isSubmitting}
          >
            Register
          </Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginTop: 20,
              }}
            >
              Already have an account?
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  color: "#3567ff",
                  textDecorationLine: "underline",
                }}
              >
                {" "}
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
