import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    generalTabForm: {
        height: '100%',
        padding: 20
    },
    tabMainContainer: {
        marginTop: '20px'
    },
}));

const UserSettingsChangePasswordTab = () => {
    const classes = useStyles();
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    });

    const newPassword = useRef({});
    newPassword.current = watch("newPassword", "");

    const onSubmit = (data) => {
        console.log('onSubmit data', data)
    };

    return (
        <div className={classes.tabMainContainer}>
            <Paper className={classes.generalTabForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="currentPassword"
                                control={control}
                                rules={{
                                    required: 'You must specify a password',
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        className=""
                                        inputRef={ref}
                                        label="Current Password"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors?.currentPassword}
                                        helperText={errors.currentPassword ? errors.currentPassword.message : ""}
                                        {...field}
                                    />
                                )}


                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="newPassword"
                                control={control}
                                rules={{
                                    required: 'You must specify a password',
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        className=""
                                        inputRef={ref}
                                        label="New Password"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors?.newPassword}
                                        helperText={errors.newPassword ? errors.newPassword.message : ""}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="confirmNewPassword"
                                control={control}
                                rules={{
                                    required: 'You must specify a password',
                                    validate: value =>
                                        value === newPassword.current || "The passwords do not match"
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        className=""
                                        inputRef={ref}
                                        label="Confirm New Password"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors?.confirmNewPassword}
                                        helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ""}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button color="primary" variant="contained" type='submit'
                                onClick={handleSubmit(onSubmit)}>
                                {' '}
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export default UserSettingsChangePasswordTab;
