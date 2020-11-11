import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles({
    dashboardSidebar: {
        background: 'linear-gradient(135deg, #282c34 0%,#10151d 100%) !important',
        width: '20%',
        height: 'calc(100vh - 0px)',
        float: 'left'
    },
    logo: {
        width: 180,
        height: 'auto',
        margin: '25px 2em'
    },
    ulMenu: {
        color: 'white',
        textAlign: 'left',
        padding: '10px 30px',
        listStyle: 'none',
        fontSize: 19
    },
    liMenu: {
        padding: '7px 14px',
        borderBottom: '1px solid #ffffff17',
        marginBottom: 12,
        '&:hover': {
            backgroundColor: '#ffff00',
            color: '#000000'
        },
    },
    linkCandidate: {
        textDecoration: 'none',
        color: 'snow'
    }
})