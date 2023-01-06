import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Logo from "../../assets/mexl_cinema-1-edit-removebg.png";
import { Input, Text, Button, Image } from "@rneui/base";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

YupPassword(Yup);

const LoginSchema = Yup.object().shape({
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    Alert.alert("Form Data", JSON.stringify(data));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            paddingLeft: 10,
            marginBottom: 20,
          }}
        >
          <Image
            source={Logo}
            containerStyle={{
              width: "100%",
              height: 100,
            }}
          />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
          <Text>
            Sign in with your data that you entered during your registration
          </Text>
        </View>
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
          rules={{
            required: "Password is required",
          }}
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
                showPassword ? (
                  <Ionicons
                    name="eye-off"
                    size={24}
                    color="black"
                    onPress={() => {
                      handleShowPassword();
                    }}
                  />
                ) : (
                  <Ionicons
                    name="eye"
                    size={24}
                    color="black"
                    onPress={() => {
                      handleShowPassword();
                    }}
                  />
                )
              }
            />
          )}
          name="password"
        />
        <Button onPress={handleSubmit(onSubmit)} disabled={!isDirty}>
          Login
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
            Forgot your password?
            <Text
              onPress={() => navigation.navigate("ForgotPassword")}
              style={{
                color: "blue",
                textDecorationLine: "underline",
              }}
            >
              {" "}
              Reset Now
            </Text>
          </Text>
        </View>
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
            Don't have an account?
            <Text
              onPress={() => navigation.navigate("Register")}
              style={{
                color: "blue",
                textDecorationLine: "underline",
              }}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
