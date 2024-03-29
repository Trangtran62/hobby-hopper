import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '10px 10px 10px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        padding: '10px 10px 10px 10px',
    },
    appBar1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "90%"
    },
    heading: {
        color: deepPurple[300],
        textDecoration: 'none'
    },
    image: {
        marginLeft: '15px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '250px',
    },
    userName: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    button: {
        marginTop: theme.spacing(1),
        textTransform: 'none',
        '&:hover': {
            backgroundColor: deepPurple[100],
            boxShadow: 'none',
        }
    }
    }));