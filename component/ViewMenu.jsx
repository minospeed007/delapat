import {StyleSheet,View, Text,Button} from 'react-native'

const ViewMenu =()=>{

    return(
        <View style={styles.container}>
            <Text style={styles.label}>View Menu</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    margin: 8,
  },
  input: {
    width: 150,
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  success:{
    marginTop:10,
    marginBottom:10,
    color:'green',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  buttonContainer:{
    width: '100%',
    backgroundColor:'red',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
});
export default ViewMenu