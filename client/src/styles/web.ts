import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sidebarIcon: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
  },
  header: {
    fontSize: 32,
    paddingBottom: 40,
    fontFamily: 'Arial',
  },
  header2: {
    fontSize: 20,
    paddingBottom: 32,
    fontFamily: 'Arial',
  },
  headerIcon: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
  },
  containerPadding: {
    display: 'flex',
    padding: 48,
  },
  container: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Arial',
  },
  flex1: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Arial',
  },
  containerCenter: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial',
  },
  headerButtonView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
    fontFamily: 'Arial',
  },
  headerButton: {
    marginLeft: 16,
    width: 128,
    fontFamily: 'Arial',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    height: 32,
    fontFamily: 'Arial',
  },
  headerText: {
    fontFamily: 'Arial',
  },
  headerContent: {
    width: 200,
    paddingTop: 4,
    paddingLeft: 8,
    fontFamily: 'Arial',
  },
  collapsibleContent: {
    borderRadius: 5,
    borderWidth: 1,
    position: 'absolute',
    top: 60,
    zIndex: 2,
    elevation: 2,
  },
  buttonView: {
    paddingTop: 8,
    fontFamily: 'Arial',
  },
  buttonWidth: {
    width: 128,
    paddingBottom: 24,
    paddingRight: 8,
    fontFamily: 'Arial',
  },
  bodyText: {
    fontSize: 16,
    paddingBottom: 32,
    fontFamily: 'Arial',
  },
  bodyTextSmallPad: {
    fontSize: 16,
    paddingBottom: 16,
    fontFamily: 'Arial',
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 8,
    fontFamily: 'Arial',
  },
  inputText: {
    fontSize: 16,
    paddingBottom: 0,
    minWidth: 200,
    paddingTop: 4,
    fontFamily: 'Arial',
  },
  checkbox: {
    marginTop: 4,
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 8,
    fontFamily: 'Arial',
  },
  checkboxText: {
    fontSize: 16,
    paddingBottom: 0,
    minWidth: 200,
    fontFamily: 'Arial',
  },
  jrow: {
    display: 'flex',
    flexDirection: 'row',
  },
  jcolumn: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export { styles };
