import React, { useMemo } from 'react';
import { get } from 'lodash';

const CountryCodeRenderer = props => {
  const value = useMemo(() => {
    const url = `https://flags.fmcdn.net/data/flags/mini/${props.data.countryCode?.toLowerCase()}.png`;
    const flagImage = `<img class="flag" border="0" width="15" height="10" src="${url}">`;
    const filteredWatchlist = props.context.find(c => get(c, 'code', '') === props.data.countryCode);
    return `${flagImage} ${get(filteredWatchlist, 'name', '')}`;
  }, [props.context, props.data.countryCode]);
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

function areEqual(prevProps, nextProps) {
  return true;
}

export default React.memo(CountryCodeRenderer, areEqual);
