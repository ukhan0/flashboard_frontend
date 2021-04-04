import React, { useState, useEffect, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import config from '../../config/config';
import { get, forEach, isEmpty, remove, cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux'; 
import { setSuggestionsWithSelections, setSelectedSuggestions } from '../../reducers/Topic'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  loadingSection: {
    height: 300,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionContainer: {
    paddingLeft: 10,
  },
  suggestionSelection: {
    padding: '0 !important',
  },
}));

export default function TopicSuggestionsDialog(props) {
  const { suggestions, selectedSuggestions } = useSelector(state => state.Topic);
  const [ isLoading, setIsLoading ] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    const findSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${config.apiUrl}/api/dictionary/search`, {
          searchTerm: props.searchText
        });
        const responsePayload = get(response, 'data', null);
        const newSuggestions = get(responsePayload, 'results', {})
        const selectedSuggestions = {}
        forEach(newSuggestions, (_values, keyWord) => {
          selectedSuggestions[keyWord] = []
        })
        setIsLoading(false);
        dispatch(setSuggestionsWithSelections(newSuggestions, selectedSuggestions));
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    findSuggestions();
  }, [props.searchText, dispatch]);

  const isSuggestionChecked = (suggestion) => {
    let selectedSelectionsArr = []
    forEach(selectedSuggestions, (values) => {
      selectedSelectionsArr = [...selectedSelectionsArr, ...values]
    })
    return selectedSelectionsArr.indexOf(suggestion) !== -1
  }

  const handlSuggestionSelection = (value, keyWord) => {
    const newSelectedSuggestions = cloneDeep(selectedSuggestions)
    if(!isSuggestionChecked(value)) {
      newSelectedSuggestions[keyWord] = [...newSelectedSuggestions[keyWord], value]
      dispatch(setSelectedSuggestions(newSelectedSuggestions))
    } else {
      const newKeyWordSelectedSuggestions = [...selectedSuggestions[keyWord]]
      remove(newKeyWordSelectedSuggestions, v => v === value)  // it mutatues array
      selectedSuggestions[keyWord] = newKeyWordSelectedSuggestions
      dispatch(setSelectedSuggestions(selectedSuggestions)) 
    }
  }

  const createSuggestionContent = (suggestionsObj) => {
    const content = []
    if(isEmpty(suggestionsObj)){
      content.push(
        <h6 key={'noSuggestion'} className="font-weight-bold font-size-lg mb-1 text-black">
          No Suggestions available
        </h6>
      )
    } else {
      forEach(suggestionsObj, (values, keyWord) => {
        content.push((
          <Fragment key={keyWord}>
            <Grid item xs={12}>
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                {keyWord}
              </h6>
            </Grid>
              {
                values.map((value, index) =>
                  <Grid item xs={3} key={index} className={classes.suggestionSelection}>
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={isSuggestionChecked(value)}
                          size="small"
                          onChange={(e) => handlSuggestionSelection(value, keyWord)}
                          value={value}
                        />
                      }
                      label={value}
                    />
                  </Grid>
                )
              }
          </Fragment>
        ));
      })
    } 
    return content;
  }
  
  return (
    <Dialog maxWidth="md" open={props.isOpen} onClose={props.onClose}>
      <DialogTitle id="max-width-dialog-title">Smart Synonums</DialogTitle>
      <DialogContent>
        <FormControl size="small">
          <Grid container spacing={4} direction="row" justify="flex-start" alignItems="center" className={classes.suggestionContainer}>
            {
              isLoading ? 
                <Grid item xs={12}>
                  <div className={classes.loadingSection}>Loading...</div>
                </Grid>
                :
                createSuggestionContent(suggestions)
            }
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
