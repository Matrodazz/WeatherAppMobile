import { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

export default function App() {

  const [local, setLocal] = useState('');
  const [apiData, setApiData] = useState(null);

  const apiKey = '';

  useEffect(() => {
    const getWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${local},&lang=pt_br&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setApiData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getWeatherData();
    
  }, [local]);

  const imagem = { uri: 'https://images2.alphacoders.com/238/238870.jpg' };

  return (
  <View style={styles.container}>
   <ImageBackground style={styles.image} source={imagem}>
      {apiData && (
        <View>
          <Text style={styles.local}>{apiData.name}   </Text>
          <Text style={styles.desc}>{apiData.weather[0].description}</Text>
          <Text style={styles.temp}>{(apiData.main.temp)}&deg;C</Text>
        </View>
      )}

        <View style={styles.searchCont}>
          <TextInput
            style={styles.search}
            placeholder="Procure por uma cidade"
            onChangeText={text => setLocal(text)}
            value={local}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    opacity: 0.82,
  },

  local: {
    color: 'white',
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 'bold',
    padding: 5,
  },

  desc: {
    fontFamily: 'Roboto',
    color: '#cfd0d1',
    textAlign: 'center',
    fontSize: 15,
  },

  temp: {
    fontFamily: 'Roboto',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },

  search: {
    fontFamily: 'Roboto',
    color: '#cfd0d1',
    textAlign: 'center',
    fontSize: 13,
    padding: 7,
    width: 250,
    borderColor: '#646669',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#646669',
    opacity: 0.8,
  },

  searchCont: {
    alignItems: 'center',
  },
});
