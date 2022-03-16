import React, { useState, useEffect }  from 'react';
import { get } from 'lodash';

const CountryCodeRenderer =  (props) => {
  const [value, setValue] = useState();
  useEffect(() => {
      if(props.data.countryCode){
        const url = `https://flags.fmcdn.net/data/flags/mini/${
          props.data.countryCode?.toLowerCase()
        }.png`;
        const flagImage = `<img class="flag" border="0" width="15" height="10" src="${url}">`;
        const filteredWatchlist = props.context
          .filter(c =>
            get(c, 'code', '') === props.data.countryCode
          );
        setValue(`${flagImage} ${filteredWatchlist[0]?.name}`);
      }
  }, [props.context, props.data.countryCode]);

  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

function areEqual(prevProps, nextProps) {
 return true;
}

export default React.memo(CountryCodeRenderer, areEqual)
