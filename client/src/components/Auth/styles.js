import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginTop: theme.spacing(8),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
    },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: deepPurple[300]
    },
    form: {
        marginTop: theme.spacing(3),
        width: '100%',
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
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