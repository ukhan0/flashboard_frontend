import React from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBarObj } from '../../reducers/Alerts';
import axios from "axios";
import config from '../../config/config';
import { get } from 'lodash';
import { setUser } from '../../reducers/User';


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
    tabMainContainer: {
        marginTop: '20px'
    },
}));

const UserSettingsGeneralTab = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            watchlistColor: user.enable_watchlist_color,
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${config.apiUrl}/api/users/update_user`, {
                id: user.id,
                name: data.name,
                enable_watchlist_color: data.watchlistColor
            });

            const responsePayload = get(response, 'data', null);
            if (responsePayload && !responsePayload.error) {
                const userData = { ...user, name: data.name, enable_watchlist_color: data.watchlistColor };
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch(setUser(userData));
                dispatch(setSnackBarObj({ message: 'User settings have been saved successfully.', severity: 'success' }));
            } else {
                dispatch(setSnackBarObj({ message: responsePayload.message, severity: 'error' }));
            }
        } catch (error) {
            dispatch(setSnackBarObj({ message: 'An error has occurred. Please try again.', severity: 'error' }));
        }

    };

    return (
        <div className={classes.tabMainContainer}>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{
                                            required: 'Please enter your name',
                                        }}
                                        render={({ field: { ref, ...field } }) => (
                                            <TextField inputRef={ref} variant="outlined" label="Name" fullWidth
                                                error={Boolean(errors.name)}
                                                helperText={errors.name ? errors.name.message : ""}
                                                {...field}
                                            />
                                        )}

                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        name="email"
                                        control={control}

                                        render={({ field: { ref, ...field } }) => (
                                            <TextField inputRef={ref} variant="outlined" label="Email" fullWidth
                                                error={!!errors?.email}
                                                helperText={errors.email ? errors.email.message : ""}
                                                disabled={true}
                                                {...field}
                                            />
                                        )}

                                    />
                                </Grid>

                                <Grid item xs={12}>

                                    <Controller
                                        name="watchlistColor"
                                        control={control}
                                        render={({ field: { ref, value, onChange, ...field } }) => (

                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        inputRef={ref}
                                                        checked={value}
                                                        color="primary"
                                                        onChange={(e, val) => {
                                                            if (val) {
                                                                setValue(`watchlistColor`, val);
                                                            }
                                                            return onChange(val);
                                                        }}
                                                        {...field}
                                                    />
                                                }
                                                label="Enable Watchlist Colors"
                                            />

                                        )}

                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Button color="primary" variant="contained" type='submit'> Save Changes</Button>
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