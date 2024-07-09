import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Card, Title, Paragraph} from 'react-native-paper';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ClinicinfoScreen = () => {
  const doctor = useSelector((state: any) => state.doctors);
  const [clinic, setClinic] = useState<any>([]);
  useEffect(() => {
    const getClinic = async () => {
      if (doctor.clinic_id && doctor.clinic_id.length > 0) {
        const clinicPromises = doctor.clinic_id.map(async (id: any) => {
          const response = await firestore().collection('clinic').doc(id).get();
          return response.data();
        });

        const clinicData = await Promise.all(clinicPromises);
        setClinic(clinicData);
      }
    };
    getClinic();
  }, [doctor.clinic_id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {clinic &&
        clinic.map((c: any) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title} variant="headlineSmall">
                Clinic Information
              </Text>
              <Paragraph>
                <Text variant="bodyMedium" style={styles.label}>
                  Name:{' '}
                </Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {c?.name}
                </Text>
              </Paragraph>
              <Paragraph>
                <Text variant="bodyMedium" style={styles.label}>
                  Email:{' '}
                </Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {c?.email}
                </Text>
              </Paragraph>
              <Paragraph>
                <Text variant="bodyMedium" style={styles.label}>
                  Address:{' '}
                </Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {c?.address}
                </Text>
              </Paragraph>
              <Paragraph>
                <Text variant="bodyMedium" style={styles.label}>
                  Contact Number:{' '}
                </Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {c?.contactNumber}
                </Text>
              </Paragraph>
              <Paragraph>
                <Text variant="bodyMedium" style={styles.label}>
                  Services:{' '}
                </Text>
                <Text variant="bodyMedium" style={styles.value}>
                  {c?.services}
                </Text>
              </Paragraph>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default ClinicinfoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    margin: 16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginBottom: 8,
  },
});
