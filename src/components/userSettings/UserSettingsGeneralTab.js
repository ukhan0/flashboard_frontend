import React from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    generalTabImage: {
        [
            theme.breakpoints.down('xs')]: {
            padding: '20px 8px',
        },

        [
            theme.breakpoints.up('sm')]: {
            padding: '20px 8px',

        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    generalTabImageForm: {
        maxWidth: 300
    },
    generalTabForm: {
        height: '100%',
        padding: 20
    },
}));

const UserSettingsGeneralTab = () => {
    const { user } = useSelector(state => state.User);

    const classes = useStyles();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            select: {}
        }
    });

    return (
        <div className={classes.generalTabMainContainer}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                    <Paper className={classes.generalTabImage}>
                        <div className={classes.generalTabImageForm}>
                            <AddAPhotoIcon />
                            <div>image</div>
                            <p>Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 MB</p>
                            <div><Button color="primary" variant="contained"> Save Changes</Button></div>
                        </div>
                    </Paper>

                </Grid>


                <Grid item xs={12} sm={6}>
                    <Paper className={classes.generalTabForm}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => <TextField variant="outlined" label="Name" fullWidth {...field} />}
                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <TextField className="" name="email" label="Email" variant="outlined" fullWidth />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button color="primary" variant="contained"> Save Changes</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>

                </Grid>
            </Grid>
        </div>
    )
}

export default UserSettingsGeneralTab;