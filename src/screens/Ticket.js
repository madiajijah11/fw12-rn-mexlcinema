import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import { Layout, Text } from '@ui-kitten/components';
import { Image } from '@rneui/themed';

import QR from '../../assets/qr-code.png';

const data = {
  barcode: QR,
  movie: 'Spider-Man: Homecoming',
  genre: 'Action, Adventure, Sci-Fi',
  date: 'Tuesday, 07 July 2020 - 04:30pm',
  time: '04:30pm',
  count: 3,
  seats: 'A1, A2, A3',
  price: 150000
};

const TicketDetails = () => {
  return (
    <Layout>
      <Layout
        style={{
          padding: 10
        }}>
        <Layout
          style={{
            borderWidth: 1
          }}>
          <Layout
            style={{
              paddingVertical: 10,
              paddingHorizontal: 40
            }}>
            <Layout
              style={{
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={data.barcode}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain'
                }}
              />
            </Layout>
          </Layout>
          <Layout
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 10
            }}>
            <Layout
              style={{
                width: '50%'
              }}>
              <Text>Movie</Text>
              <Text>{data.movie}</Text>
            </Layout>
            <Layout
              style={{
                width: '50%'
              }}>
              <Text>Genre</Text>
              <Text>{data.genre}</Text>
            </Layout>
            <Layout
              style={{
                width: '50%'
              }}>
              <Text>Date</Text>
              <Text>{data.date}</Text>
            </Layout>
            <Layout
              style={{
                width: '50%'
              }}>
              <Text>Time</Text>
              <Text>{data.time}</Text>
            </Layout>
            <Layout
              style={{
                width: '50%'
              }}>
              <Text>Count</Text>
              <Text>{data.count} pcs</Text>
            </Layout>
            <Layout
              style={{
                width: '50%'
              }}>
              <Text>Seats</Text>
              <Text>{data.seats}</Text>
            </Layout>
          </Layout>
          <Layout
            style={{
              marginVertical: 10,
              marginHorizontal: 40,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1
            }}>
            <Text>Total</Text>
            <Text>Rp. {data.price}</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const Ticket = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <HeaderBar />
        <TicketDetails />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Ticket;
