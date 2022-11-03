import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    mainContainer: {
        // backgroundColor: 'white',
        padding: '4px 0 20px 0'
    },
    settingsHeading: {
        padding: '8px 16px'
    },
    tabContainer: {
        padding: '8px 16px'
    },
    
    tab: {
        '& .MuiTab-wrapper': {
            flexDirection: 'row',
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    },
    generalTabMainContainer: {
        marginTop: '20px'
    },

    generalTabImage: {
        height: '100%',
        padding: 20
    },
    generalTabForm: {
        height: '100%',
        padding: 20
    }

}));
