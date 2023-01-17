import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Logo from "../../assets/mexl_cinema-1-edit-removebg.png";
import { Input, Text, Button, Image } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import http from "../helpers/http";
import { useNavigation } from "@react-navigation/native";

YupPassword(Yup);

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .password()
    .min(6, "Password must be at least 6 characters")
    .minLowercase(1, "Password must have at least one lowercase letter")
    .minUppercase(1, "Password must have at least one uppercase letter")
    .minNumbers(1, "Password must have at least one number")
    .minSymbols(1, "Password must have at least one symbol")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const ResetPassword = ({ route }) => {
  const navigation = useNavigation();
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
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const { code, password } = values;
      const { data } = await http().post("/api/v1/auth/resetPassword", {
        email: route.params.email,
        code,
        password,
      });
      if (data.status === true) {
        Alert.alert("Success", data.message);
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
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
            Set Password
          </Text>
          <Text>set your new password</Text>
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Code"
              placeholder="Write your code"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.code && errors.code.message}
            />
          )}
          name="code"
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Confirm Password"
              placeholder="Write your confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
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
          name="confirmPassword"
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || isSubmitting}
        >
          Submit
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
