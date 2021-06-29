import React, { useState } from 'react';
import {
  ButtonGroup,
  Button,
  Popper,
  ClickAwayListener,
  Paper,
  Grow,
  MenuList,
  MenuItem,
  ListItemText
} from '@material-ui/core';
import {
  setSelectedUniverse,
  setSelectedSector,
  setSelectedWatchlistCompanyNames,
  setSelectedIndustries
} from '../../reducers/Topic';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import sectors from '../../config/gicsData';

const TopicUniverseGroup = () => {
  const { selectedUniverse, selectedSector } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const sectorDropdownRef = React.useRef(null);
  let showSelectedSector = selectedSector ? selectedSector : 'Sector';
  const sectorValues = sectors.map(s => s.value);

  const universeSelection = [
    { label: 'All', key: 'all', disabled: false },
    { label: 'Watchlist', key: 'watchlist', disabled: false },
    { label: showSelectedSector, key: 'sector', disabled: false },
    { label: 'Custom', key: 'custom', disabled: false }
  ];

  const handleUniverseSelection = universeKey => {
    if (universeKey === 'all') {
      dispatch(setSelectedSector(null));
      dispatch(setSelectedIndustries([]));
      dispatch(setSelectedWatchlistCompanyNames([]));
    } else if (universeKey === 'sector') {
      setIsSectorDropdownOpen(!isSectorDropdownOpen);
      dispatch(setSelectedWatchlistCompanyNames([]));
    } else if (universeKey === 'watchlist') {
      dispatch(setSelectedWatchlistCompanyNames([]));
      dispatch(setSelectedSector(null));
      dispatch(setSelectedIndustries([]));
    } else if (universeKey === 'custom') {
      dispatch(setSelectedWatchlistCompanyNames([]));
      dispatch(setSelectedSector(null));
      dispatch(setSelectedIndustries([]));
    }
    dispatch(setSelectedUniverse(universeKey));
  };

  const handleSectorSelection = sector => {
    dispatch(setSelectedIndustries([]));
    dispatch(setSelectedSector(sector));
  };

  return (
    <>
      <ButtonGroup color="primary">
        {universeSelection.map((universe, i) => {
          return universe.key === 'sector' ? (
            <Button
              ref={sectorDropdownRef}
              key={`uni_${i}`}
              endIcon={<ArrowDropDownIcon />}
              onClick={() => handleUniverseSelection(universe.key)}
              variant={selectedUniverse === universe.key ? 'contained' : 'outlined'}>
              {universe.label}
            </Button>
          ) : (
            <Button
              disabled={universe.disabled}
              size="medium"
              key={`uni_${i}`}
              onClick={() => handleUniverseSelection(universe.key)}
              variant={selectedUniverse === universe.key ? 'contained' : 'outlined'}>
              {universe.label}
            </Button>
          );
        })}
      </ButtonGroup>
      <Popper
        open={isSectorDropdownOpen}
        anchorEl={sectorDropdownRef.current}
        role={undefined}
        transition
        color="primary"
        disablePortal
        style={{ zIndex: 10000 }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}>
            <Paper style={{ zIndex: 10000, height: 250, overflow: 'scroll' }}>
              <ClickAwayListener onClickAway={() => setIsSectorDropdownOpen(false)}>
                <MenuList>
                  {sectorValues.map(sector => (
                    <MenuItem key={sector} value={sector} onClick={() => handleSectorSelection(sector)}>
                      <ListItemText primary={sector} />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default TopicUniverseGroup;
