import React, { useEffect, Fragment } from 'react';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { forEach, isEmpty, remove, cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSuggestions, setSimpleSearchTextArray } from '../../reducers/Topic';
import { findSuggestions } from './topicActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(_theme => ({
  loadingSection: {
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestionContainer: {
    paddingLeft: 20
  },
  suggestionSelection: {
    padding: '0 !important'
  },
  suggestionStyle: {
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    Width: '200px',
    overflow: 'hidden'
  }
}));

export default function TopicSuggestionsDialog(props) {
  const { suggestions, selectedSuggestions, suggestionsIsLoading, simpleSearchTextArray } = useSelector(
    state => state.Topic
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findSuggestions());
  }, [dispatch]);
  const isSuggestionChecked = suggestion => {
    let selectedSelectionsArr = [];
    forEach(selectedSuggestions, values => {
      selectedSelectionsArr = [...selectedSelectionsArr, ...values];
    });
    return selectedSelectionsArr.indexOf(suggestion) !== -1;
  };

  const handlSuggestionSelection = (value, keyWord) => {
    let simpleSearchTextArrayCopy = simpleSearchTextArray;
    const newSelectedSuggestions = cloneDeep(selectedSuggestions);
    if (!isSuggestionChecked(value)) {
      newSelectedSuggestions[keyWord] = [...newSelectedSuggestions[keyWord], value];
      dispatch(setSelectedSuggestions(newSelectedSuggestions));
      simpleSearchTextArrayCopy.push(value);
      dispatch(setSimpleSearchTextArray(simpleSearchTextArrayCopy));
    } else {
      const newKeyWordSelectedSuggestions = [...selectedSuggestions[keyWord]];
      remove(newKeyWordSelectedSuggestions, v => v === value); // it mutatues array
      selectedSuggestions[keyWord] = newKeyWordSelectedSuggestions;
      dispatch(setSelectedSuggestions(selectedSuggestions));
      const index = simpleSearchTextArrayCopy.findIndex(sug => sug === value);
      simpleSearchTextArray.splice(index, 1);
      dispatch(setSimpleSearchTextArray(simpleSearchTextArray));
    }
  };

  const createSuggestionContent = suggestionsObj => {
    const content = [];
    if (isEmpty(suggestionsObj)) {
      content.push(
        <Grid key={'noSuggestion'} item xs={12}>
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">No Suggestions available</h6>
        </Grid>
      );
    } else {
      forEach(suggestionsObj, (values, keyWord) => {
        let filteredData = values.filter(
          item => item.indexOf('https') === -1 && item.indexOf(')') === -1 && item.indexOf('#') === -1
        );
        content.push(
          <Fragment key={keyWord}>
            <Grid item xs={12}>
              {filteredData.length > 0 && keyWord ? (
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">{keyWord}</h6>
              ) : null}
            </Grid>

            {filteredData.map((value, index) => (
              <Grid item xs={3} key={index} className={classes.suggestionSelection}>
                <FormControlLabel
                  key={index}
                  className={classes.suggestionStyle}
                  control={
                    <Checkbox
                      checked={isSuggestionChecked(value)}
                      size="small"
                      onChange={e => handlSuggestionSelection(value, keyWord)}
                      value={value}
                    />
                  }
                  label={value}
                />
              </Grid>
            ))}
          </Fragment>
        );
      });
    }
    return content;
  };

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classes.suggestionContainer}>
      {suggestionsIsLoading ? (
        <Grid item xs={12}>
          <div className={classes.loadingSection}>Loading...</div>
        </Grid>
      ) : (
        createSuggestionContent(suggestions)
      )}
    </Grid>
  );
}
