import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import DiscussInTheCommunity from './DiscussInTheCommunity';
import FindyourDoctor from './FindYourDoctor';
import StorageyourMedicalRecords from './StorageYourMedicalRecords';
import AppIntroSlider from 'react-native-app-intro-slider';
const IntroScreen = (props: any) => {
  const components = [
    <FindyourDoctor />,
    <StorageyourMedicalRecords />,
    <DiscussInTheCommunity />,
  ];
  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={components}
        renderItem={({item}) => item}
        dotStyle={{backgroundColor: 'rgba(0, 0, 0, .2)'}}
        activeDotStyle={{backgroundColor: '#3AA1A2'}}
        renderNextButton={() => <Text style={{marginTop: 10}}>Next</Text>}
        showSkipButton={true}
        renderSkipButton={() => <Text style={{marginTop: 10}}>Skip</Text>}
        renderDoneButton={() => <Text style={{marginTop: 10}}>Next</Text>}
        onDone={() => {
          props.setShow(false);
        }}
      />
    </View>
  );
};

export default IntroScreen;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});
