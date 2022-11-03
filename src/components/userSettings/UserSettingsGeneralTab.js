import React from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import UserSettingsStyles from "./UserSettingsStyles";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const UserSettingsGeneralTab = () => {
    const { user } = useSelector(state => state.User);

    const classes = UserSettingsStyles();
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

                <Grid item xs={6}>
                    <Paper className={classes.generalTabImage}>
                        image
                    </Paper>

                </Grid>


                <Grid item xs={6}>
                    <Paper className={classes.generalTabForm}>
                        <form  onSubmit={handleSubmit}>
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