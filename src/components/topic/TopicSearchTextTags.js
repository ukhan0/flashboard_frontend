/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
const useStyles = makeStyles(theme => ({
  rootContainer: {
    position: 'relative'
  },
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3)
    }
  },

  chipStyle: {
    borderRadius: 0,
    backgroundColor: '#cde69c'
  },

  searchSuggestionIcon: {
    top: '7px',
    marginTop: 0,
    position: 'absolute',
    right: '14px'
  }
}));

export default function Tags(props) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes.rootContainer)}>
      <Autocomplete
        key={props.key}
        multiple
        size="small"
        id="tags-outlined"
        closeIcon={false}
        onChange={(event, value) => {
          props.handleSearch(event, value);
        }}
        options={[]}
        value={props.values.length > 0 ? props.values : []}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              color="primary"
              style={{ maxHeight: '22px' }}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => {
          const newParams = { ...params, inputProps: { ...params.inputProps, onKeyDown: props.handleKeyDown } };
          return (
            <TextField
              onBlur={e => {
                props.handleSeachTagOnFocusOut(e.target.value);
              }}
              inputRef={props.inputRef}
              size="small"
              {...newParams}
              variant="outlined"
              fullWidth
            />
          );
        }}
      />
      <span className={classes.searchSuggestionIcon}>
        <WbIncandescentOutlinedIcon
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (props.values.length > 0) {
              props.handleOnShowSuggestions(props.searchSuggestionType);
            }
          }}
          variant="outlined"
          color={props.values.length > 0 ? 'primary' : 'disabled'}
        />
      </span>
    </div>
  );
}
