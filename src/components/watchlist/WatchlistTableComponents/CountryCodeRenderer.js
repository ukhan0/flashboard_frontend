import React from 'react';

const CountryCodeRenderer = props => {
  const url = `https://flags.fmcdn.net/data/flags/mini/${props.data.countryCode?.toLowerCase()}.png`;
  const flagImage = `<img class="flag" border="0" width="15" height="10" src="${url}">`;
  const value = `${flagImage} ${props.data.countryName}`;
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

export default CountryCodeRenderer;
