import React, { Component } from 'react';

import { View, Image, StyleSheet, Text, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

const styles = StyleSheet.create({
  imgs: {
    height: 50,
    width: 50
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#bbb',
    alignSelf: 'center',
    marginTop: 20
  },
  texto: {
    color: '#ccc',
    marginVertical: 25,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    width: '75%',
    alignSelf: 'center',
    fontSize: 20,
    textAlign: 'center'
  }
})



// import { Container } from './styles';

export default class pages extends Component {


  constructor() {
    super();
    this.state = {
      imagem: null,
      nome: '',
      email: '',
      dataNascimento: ''
    }
  }




  _salvarDadosUsuario = async () => {
    let jwtDecode = require('jwt-decode');
    let token = await AsyncStorage.getItem('@opflix:token')
    let values = jwtDecode(token);
    this.setState({ nome: values.Username, email: values.email, dataNascimento: values.DataNascimento, imagem: values.Imagem })
  }


  _tratarData = (data) => {
    let novaData = data.split(' ')
    return novaData[0]
  }

  static navigationOptions = {
    tabBarIcon: () => (
      <Image source={require('./../img/user_icon.png')} style={styles.imgs} />
    ),
    header: null

  }

  componentDidMount() {
    this._salvarDadosUsuario();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <TouchableOpacity onPress={() => console.warn('teste')}>
          <Image source={require('./../img/edit_24px.png')} style={{ alignSelf: 'flex-end', tintColor: '#ccc',marginTop: 10,marginRight:10}} />
        </TouchableOpacity>
        <Image source={{ uri: this.state.imagem }} style={styles.profilePic} />
        <View style={{ marginTop: 15 }}>
          <Text style={styles.texto}>{this.state.nome}</Text>
          <Text style={styles.texto}>{this.state.email}</Text>
          <Text style={styles.texto}>{this._tratarData(this.state.dataNascimento)}</Text>
        </View>
      </View>
    );
  }
}
