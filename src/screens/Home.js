import { Image, Card, Input } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Layout, Button, Text } from '@ui-kitten/components';

import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';

import DashboardImage from '../../assets/homepage.png';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import http from '../helpers/http';

const NowShowing = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await http().get('/api/v1/movies/nowShowing');
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Layout style={{ marginVertical: 20, marginHorizontal: 10 }}>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 24 }}>Now Showing</Text>
          <Text
            style={{ fontSize: 18, color: '#3567ff' }}
            onPress={() => navigation.navigate('ViewAll')}>
            view all
          </Text>
        </Layout>
        <ScrollView horizontal>
          {movies?.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </Layout>
    </Layout>
  );
};

const UpComing = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchMonths();
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMovieByMonth = async () => {
      try {
        const response = await http().get(`/api/v1/movies/upComing?month=${selectedMonth}`);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieByMonth();
  }, [selectedMonth]);

  const fetchMovies = async () => {
    try {
      const response = await http().get('/api/v1/movies/upComing');
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonths = async () => {
    try {
      const response = await http().get('/api/v1/months');
      setMonths(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Layout style={{ marginVertical: 20, marginHorizontal: 10 }}>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 24 }}>Up Coming Movies</Text>
          <Text
            style={{ fontSize: 18, color: '#3567ff' }}
            onPress={() => navigation.navigate('ViewAll')}>
            view all
          </Text>
        </Layout>
        <ScrollView horizontal>
          {months?.map((item) => (
            <Button
              key={item.id}
              style={{
                margin: 5
              }}
              onPress={() => setSelectedMonth(item.id)}>
              {item.name}
            </Button>
          ))}
        </ScrollView>
        <ScrollView horizontal>
          {movies?.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </Layout>
    </Layout>
  );
};

const SubscribeSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

const Subscribe = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(SubscribeSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data) => {
    Alert.alert('Form Data', JSON.stringify(data));
  };

  return (
    <Layout
      style={{
        paddingBottom: 20
      }}>
      <Card
        disabled
        wrapperStyle={{
          paddingHorizontal: 10
        }}>
        <Text
          style={{
            textAlign: 'center'
          }}>
          Be the vanguard of the
        </Text>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
          Moviegoers
        </Text>
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
        <Button
          style={{
            marginBottom: 10
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}>
          Join now
        </Button>
        <Text
          style={{
            textAlign: 'center'
          }}>
          By joining you as a MexL Cinema member, we will always send you the latest updates via
          email.
        </Text>
      </Card>
    </Layout>
  );
};

const Home = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <HeaderBar />
        <Layout>
          <Layout
            style={{
              marginVertical: 40,
              marginHorizontal: 10
            }}>
            <Text style={{ fontSize: 18 }}>Nearest Cinema, Newest Movie,</Text>
            <Text style={{ fontSize: 30, color: '#3567ff' }}>Find out now!</Text>
            <Image
              source={DashboardImage}
              style={{
                aspectRatio: 1,
                height: 400,
                width: 400,
                resizeMode: 'cover'
              }}
            />
          </Layout>
        </Layout>
        <NowShowing navigation={navigation} />
        <UpComing navigation={navigation} />
        <Subscribe />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
