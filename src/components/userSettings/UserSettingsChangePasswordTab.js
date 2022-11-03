import React from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import UserSettingsStyles from "./UserSettingsStyles";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UserSettingsChangePasswordTab = () => {
    const { user } = useSelector(state => state.User);

    const classes = UserSettingsStyles();
    const { handleSubmit } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            select: {}
        }
    });

    return (
        <div className={classes.generalTabMainContainer}>
            <Paper className={classes.generalTabForm}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField className="" name="currentPassword" label="Current Password" variant="outlined" fullWidth type="password" />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField className="" name="newPassword" label="New Password" variant="outlined" fullWidth />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField className="" name="confirmNewPassword" label="Confirm New Password" variant="outlined" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <Button color="primary" variant="contained"> Save Changes</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default UserSettingsChangePasswordTab;