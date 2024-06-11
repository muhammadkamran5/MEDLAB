import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    iconButton: {
      height: 20,
      width: 22,
      marginLeft: 17,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 17,
      color: '#225B6E',
    },
    searchBar: {
      marginTop: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginHorizontal: 20,
    },
    grid: {
      flex: 1,
      marginHorizontal: 20,
    },
    card: {
      backgroundColor: '#fff',
      height: 160,
    },
    cardTitle: {
      fontWeight: 'bold',
    },
    cardImage: {
      alignSelf: 'center',
    },
    askCard: {
      flex: .27,
      padding: 20,
      justifyContent : 'center',
      marginHorizontal: 20,
      backgroundColor: '#fff',
    },
    cardButtons: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row',
      gap: 5,
    },
    buttons:{
      backgroundColor : '#fff', 
      marginHorizontal : 20, 
      paddingVertical : 5
    },
    button: {
      borderRadius: 5,
  
    },
  });
  
  export default styles  