import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  surfaceWrapper: {
    width: '90%',
    minHeight: 500,
    padding: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  backButton: {
    borderRadius: 15,
    height: 30,
    width: 30,
    top: 0,
    left: 0,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    marginTop: 10,
    flex: 1,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    borderRadius: 15,
    height: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
