import { Platform } from "react-native";

const baseMobileStyles = {
  containerPadding: {
    display: 'flex',
    padding: 8,
  },
  container: {
    fontFamily: 'Arial',
  },
  flex1: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Arial',
  },
  containerCenter: {
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
    marginTop: 8,
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
    zIndex: 2,
    elevation: 2,
    fontFamily: 'Arial',
    backgroundColor: '#151718',
  },
  buttonView: {
    fontFamily: 'Arial',
  },
  buttonWidth: {
    width: 94,
    paddingBottom: 16,
    marginRight: Platform.OS === 'ios' ? 0 : 8,
    fontFamily: 'Arial',
  },
  bodyText: {
    fontSize: 16,
    paddingBottom: 8,
    fontFamily: 'Arial',
  },
  bodyTextSmallPad: {
    fontSize: 16,
    fontFamily: 'Arial',
  },
  inputView: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 6,
    fontFamily: 'Arial',
  },
  inputText: {
    fontSize: 16,
    paddingBottom: 0,
    minWidth: 200,
    fontFamily: 'Arial',
  },
  checkbox: {
    marginTop: 1,
    marginHorizontal: 7,
  },
  jrow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
  },
  jcolumn: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default baseMobileStyles;
