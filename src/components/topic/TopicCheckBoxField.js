import React, { Fragment } from 'react';

import {
  Grid,
  FormControlLabel,
  Checkbox,
  FormControl,
} from '@material-ui/core';

import { FormLabel } from '@material-ui/core';

export default function TopicCheckBoxField() {
  const [state, setState] = React.useState({
    coronavirus: true,
    coronavirusdisease2019: false,
    p2019_2020coronaviruspandamic: false,
    covid_2019pandamicinindia: true
  });

  const handleChange3 = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { coronavirus, coronavirusdisease2019, p2019_2020coronaviruspandamic, covid_2019pandamicinindia } = state;

  const checkboxArray = [
    {
      checked: coronavirus,
      value: 'coronavirus',
      label: 'CoronaVirus'
    },
    {
      checked: coronavirusdisease2019,
      value: 'coronavirusdisease2019',
      label: 'CoronaVirus Disease 2019'
    },
    {
      checked: p2019_2020coronaviruspandamic,
      value: 'p2019_2020coronaviruspandamic',
      label: '2019-2020 CoronaVirus Pandamic '
    },
    {
      checked: covid_2019pandamicinindia,
      value: 'covid_2019pandamicinindia',
      label: 'Covid-2019 pandamic in India'
    }
  ];

  const error =
    [coronavirus, coronavirusdisease2019, p2019_2020coronaviruspandamic, covid_2019pandamicinindia].filter(v => v)
      .length !== 2;

  return (
    <FormControl size="small">
      <FormLabel component="legend">coronavirus</FormLabel>
      {checkboxArray.map(option => {
        return (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={option.checked}
                size="small"
                onChange={handleChange3(option.value)}
                value={option.value}
              />
            }
            label={option.label}
          />
        );
      })}
    </FormControl>
  );
}
