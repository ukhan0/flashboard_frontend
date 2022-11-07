import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarObj } from '../../reducers/Alerts';
import axios from 'axios';
import config from '../../config/config';
import { get } from 'lodash';
import { setUser } from '../../reducers/User';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { maxFileSize, acceptedFileTypes } from "./userSettingsConfig"

const useStyles = makeStyles(theme => ({
    generalTabImage: {
        padding: '20px 8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    generalTabImageForm: {
        maxWidth: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    imgHelpText: {
        fontSize: 12,
        textAlign: 'center'
    },
    generalTabForm: {
        height: '100%',
        padding: 20
    },
    tabMainContainer: {
        marginTop: '20px'
    },
    imgContainer: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: 'lightgrey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&:hover $text': {
            position: 'absolute',
            zIndex: 9,
            backgroundColor: 'rgba(22, 28, 36, 0.64)',
            opacity: 1
        }
    },
    text: {
        transition: 'all 0.2s ease-in-out',
        opacity: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'absolute',
        zIndex: 8,
        color: 'white',
        fontSize: 12,
        '& svg': {
            marginBottom: 4
        }
    },
    img: {
        width: '100%',
        height: '100%',
    },

    fileInput: {
        display: 'none'
    }
}));

const UserSettingsGeneralTab = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.User);
    const [profileImgPreview, setProfileImgPreview] = useState(user?.profile_pic);
    const [profileImg, setProfileImg] = useState(null);
    const [profileImgError, setProfileImgError] = useState('');
    const imgInputRef = useRef();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            watchlistColor: user.enable_watchlist_color
        }
    });

    const onSubmit = async data => {
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

    const handleFile = () => {
        imgInputRef.current.click();
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    }

    const handleResize = (base64Str, maxWidth = 300, maxHeight = 300) => {
        return new Promise(resolve => {
            let img = new Image();

            img.src = base64Str;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                const MAX_WIDTH = maxWidth;
                const MAX_HEIGHT = maxHeight;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL());
            };
        });
    };

    const handleChange = async e => {
        const { files } = e.target;
        const selectedFile = files[0];
        try {
            if (!acceptedFileTypes.find(item => item.type === selectedFile.type)) {
                setProfileImgError("File type not allowed");
                return;
            }
            if (selectedFile.size <= maxFileSize) {
                const file = await getBase64(files[0]);
                const img = await handleResize(file, 300, 300);
                setProfileImgPreview(img);
                setProfileImg(files[0]);
                setProfileImgError("");
            }
            else {
                setProfileImgPreview(null);
                setProfileImg(null);
                setProfileImgError("File is larger than 3mb");
            }

        } catch (error) {
            console.log('error', error);
        }
    };

    const submitProfileImg = async () => {

        try {
            const formData = new FormData();
            formData.append("id", user.id)
            formData.append("profile_img", profileImg)
            const response = await axios.post(`${config.apiUrl}/api/users/update_user`, formData);

            const responsePayload = get(response, 'data', null);
            if (responsePayload && !responsePayload.error) {
                const userData = { ...user, profile_pic: responsePayload.data.profile_pic };
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch(setUser(userData));
                dispatch(setSnackBarObj({ message: 'User settings have been saved successfully.', severity: 'success' }));
            } else {
                dispatch(setSnackBarObj({ message: responsePayload.message, severity: 'error' }));
            }
        } catch (error) {
            console.log(error)
            dispatch(setSnackBarObj({ message: 'An error has occurred. Please try again.', severity: 'error' }));
        }
    }

    return (
        <div className={classes.tabMainContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.generalTabImage}>
                        <div className={classes.generalTabImageForm}>
                            <div className={classes.imgContainer}>
                                <input
                                    type="file"
                                    className={classes.fileInput}
                                    ref={imgInputRef}
                                    accept=".png, .jpg, .jpeg, .gif"
                                    onChange={e => handleChange(e)}
                                />
                                {profileImgPreview ? <img src={profileImgPreview} alt="profile" /> : null}
                                <div className={classes.text} onClick={handleFile}>
                                    <AddAPhotoIcon />
                                    Upload photo
                                </div>
                            </div>

                            <div className={"mt-3"}>
                                <Typography color="textSecondary" className={classes.imgHelpText}>
                                    Allowed *.jpeg, *.jpg, *.png, *.gif <br />
                                    max size of 3 MB
                                </Typography>

                                {profileImgError !== "" ?
                                    <Typography color="error" className={classes.imgHelpText}>
                                        {profileImgError}
                                    </Typography>
                                    : null
                                }
                            </div>
                            <div className={"mt-3"}>
                                <Button color="primary" variant="contained" onClick={submitProfileImg}
                                    disabled={!profileImg ? true : false}
                                >
                                    {' '}
                                    Save Changes
                                </Button>
                            </div>
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
                                            required: 'Please enter your name'
                                        }}
                                        render={({ field: { ref, ...field } }) => (
                                            <TextField
                                                inputRef={ref}
                                                variant="outlined"
                                                label="Name"
                                                fullWidth
                                                error={Boolean(errors.name)}
                                                helperText={errors.name ? errors.name.message : ''}
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
                                            <TextField
                                                inputRef={ref}
                                                variant="outlined"
                                                label="Email"
                                                fullWidth
                                                error={!!errors?.email}
                                                helperText={errors.email ? errors.email.message : ''}
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
                                    <Button color="primary" variant="contained" type="submit">
                                        {' '}
                                        Save Changes
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserSettingsGeneralTab;
