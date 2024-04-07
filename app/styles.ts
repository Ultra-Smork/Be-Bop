import { StyleSheet } from 'react-native';

export const STYLESFORTHINGS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#8a63b5',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    color: '#8a63b5',
  },
  sectionText: {
    color: '#ffffff',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#8a63b5',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    padding: 10,
    backgroundColor: '#2a2a2a',
    color: '#777777',
    textAlign: 'center',
  },
});