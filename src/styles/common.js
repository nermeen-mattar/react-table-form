// import Colors from "../constants/Colors";

export default {
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.06
    },
    flexCenter:  {justifyContent: 'center', flexWrap: 'wrap',},
    flexBetween:  { display: 'flex', justifyContent: 'space-between'},
    textCenter: {
        textAlign: 'center'
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    button: {
        borderRadius: '25px',
        padding: '12px',
        border: 'none',
    },
    primary: {
        background: 'lightcoral',
        fontWeight: 'bold',
        color: 'white',
    },
    secondary: {
        background: '#ccc',
    },
    container: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: '70%'
  }
}

