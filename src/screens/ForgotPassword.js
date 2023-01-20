import { View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../../assets/mexl_cinema-1-edit-removebg.png';
import { Input, Text, Button, Image } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import http from '../helpers/http';

YupPassword(Yup);

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await http().post('/api/v1/auth/forgotPassword', {
        email: values.email
      });
      if (data.status === true) {
        Alert.alert('Success', data.message);
        navigation.navigate('ResetPassword', {
          email: values.email
        });
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            paddingLeft: 10,
            marginBottom: 20
          }}>
          <Image
            source={Logo}
            style={{
              height: 100,
              width: '100%',
              resizeMode: 'center'
            }}
          />
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold'
            }}>
            Forgot Password
          </Text>
          <Text>we&apos;ll send a link to your email shortly</Text>
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
        <Button onPress={handleSubmit(onSubmit)} disabled={!isDirty || isSubmitting}>
          Send
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
