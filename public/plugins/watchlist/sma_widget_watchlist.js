SMA = window.SMA || {};
var rowData = [];

const countryCodes= [
    {
      name: 'Afghanistan',
      code: 'AF'
    },
    {
      name: 'Albania',
      code: 'AL'
    },
    {
      name: 'Algeria',
      code: 'DZ'
    },
    {
      name: 'American Samoa',
      code: 'AS'
    },
    {
      name: 'Andorra',
      code: 'AD'
    },
    {
      name: 'Angola',
      code: 'AO'
    },
    {
      name: 'Anguilla',
      code: 'AI'
    },
    {
      name: 'Antarctica',
      code: 'AQ'
    },
    {
      name: 'Antigua and Barbuda',
      code: 'AG'
    },
    {
      name: 'Argentina',
      code: 'AR'
    },
    {
      name: 'Armenia',
      code: 'AM'
    },
    {
      name: 'Aruba',
      code: 'AW'
    },
    {
      name: 'Australia',
      code: 'AU'
    },
    {
      name: 'Austria',
      code: 'AT'
    },
    {
      name: 'Azerbaijan',
      code: 'AZ'
    },
    {
      name: 'Bahamas',
      code: 'BS'
    },
    {
      name: 'Bahrain',
      code: 'BH'
    },
    {
      name: 'Bangladesh',
      code: 'BD'
    },
    {
      name: 'Barbados',
      code: 'BB'
    },
    {
      name: 'Belarus',
      code: 'BY'
    },
    {
      name: 'Belgium',
      code: 'BE'
    },
    {
      name: 'Belize',
      code: 'BZ'
    },
    {
      name: 'Benin',
      code: 'BJ'
    },
    {
      name: 'Bermuda',
      code: 'BM'
    },
    {
      name: 'Bhutan',
      code: 'BT'
    },
    {
      name: 'Bolivia',
      code: 'BO'
    },
    {
      name: 'Bonaire, Sint Eustatius and Saba',
      code: 'BQ'
    },
    {
      name: 'Bosnia and Herzegovina',
      code: 'BA'
    },
    {
      name: 'Botswana',
      code: 'BW'
    },
    {
      name: 'Bouvet Island',
      code: 'BV'
    },
    {
      name: 'Brazil',
      code: 'BR'
    },
    {
      name: 'British Indian Ocean Territory',
      code: 'IO'
    },
    {
      name: 'Brunei Darussalam',
      code: 'BN'
    },
    {
      name: 'Bulgaria',
      code: 'BG'
    },
    {
      name: 'Burkina Faso',
      code: 'BF'
    },
    {
      name: 'Burundi',
      code: 'BI'
    },
    {
      name: 'Cabo Verde',
      code: 'CV'
    },
    {
      name: 'Cambodia',
      code: 'KH'
    },
    {
      name: 'Cameroon',
      code: 'CM'
    },
    {
      name: 'Canada',
      code: 'CA'
    },
    {
      name: 'Cayman Islands',
      code: 'KY'
    },
    {
      name: 'Central African Republic',
      code: 'CF'
    },
    {
      name: 'Chad',
      code: 'TD'
    },
    {
      name: 'Chile',
      code: 'CL'
    },
    {
      name: 'China',
      code: 'CN'
    },
    {
      name: 'Christmas Island',
      code: 'CX'
    },
    {
      name: 'Cocos Islands',
      code: 'CC'
    },
    {
      name: 'Colombia',
      code: 'CO'
    },
    {
      name: 'Comoros',
      code: 'KM'
    },
    {
      name: 'Congo ',
      code: 'CD'
    },
    {
      name: 'Congo',
      code: 'CG'
    },
    {
      name: 'Cook Islands',
      code: 'CK'
    },
    {
      name: 'Costa Rica',
      code: 'CR'
    },
    {
      name: 'Croatia',
      code: 'HR'
    },
    {
      name: 'Cuba',
      code: 'CU'
    },
    {
      name: 'Curaï¿½ao',
      code: 'CW'
    },
    {
      name: 'Cyprus',
      code: 'CY'
    },
    {
      name: 'Czechia',
      code: 'CZ'
    },
    {
      name: "Cï¿½te d'Ivoire",
      code: 'CI'
    },
    {
      name: 'Denmark',
      code: 'DK'
    },
    {
      name: 'Djibouti',
      code: 'DJ'
    },
    {
      name: 'Dominica',
      code: 'DM'
    },
    {
      name: 'Dominican Republic',
      code: 'DO'
    },
    {
      name: 'Ecuador',
      code: 'EC'
    },
    {
      name: 'Egypt',
      code: 'EG'
    },
    {
      name: 'El Salvador',
      code: 'SV'
    },
    {
      name: 'Equatorial Guinea',
      code: 'GQ'
    },
    {
      name: 'Eritrea',
      code: 'ER'
    },
    {
      name: 'Estonia',
      code: 'EE'
    },
    {
      name: 'Eswatini',
      code: 'SZ'
    },
    {
      name: 'Ethiopia',
      code: 'ET'
    },
    {
      name: 'Falkland Islands [Malvinas]',
      code: 'FK'
    },
    {
      name: 'Faroe Islands',
      code: 'FO'
    },
    {
      name: 'Fiji',
      code: 'FJ'
    },
    {
      name: 'Finland',
      code: 'FI'
    },
    {
      name: 'France',
      code: 'FR'
    },
    {
      name: 'French Guiana',
      code: 'GF'
    },
    {
      name: 'French Polynesia',
      code: 'PF'
    },
    {
      name: 'French Southern Territories',
      code: 'TF'
    },
    {
      name: 'Gabon',
      code: 'GA'
    },
    {
      name: 'Gambia',
      code: 'GM'
    },
    {
      name: 'Georgia',
      code: 'GE'
    },
    {
      name: 'Germany',
      code: 'DE'
    },
    {
      name: 'Ghana',
      code: 'GH'
    },
    {
      name: 'Gibraltar',
      code: 'GI'
    },
    {
      name: 'Greece',
      code: 'GR'
    },
    {
      name: 'Greenland',
      code: 'GL'
    },
    {
      name: 'Grenada',
      code: 'GD'
    },
    {
      name: 'Guadeloupe',
      code: 'GP'
    },
    {
      name: 'Guam',
      code: 'GU'
    },
    {
      name: 'Guatemala',
      code: 'GT'
    },
    {
      name: 'Guernsey',
      code: 'GG'
    },
    {
      name: 'Guinea',
      code: 'GN'
    },
    {
      name: 'Guinea-Bissau',
      code: 'GW'
    },
    {
      name: 'Guyana',
      code: 'GY'
    },
    {
      name: 'Haiti',
      code: 'HT'
    },
    {
      name: 'Heard Island and McDonald Islands',
      code: 'HM'
    },
    {
      name: 'Holy See',
      code: 'VA'
    },
    {
      name: 'Honduras',
      code: 'HN'
    },
    {
      name: 'Hong Kong',
      code: 'HK'
    },
    {
      name: 'Hungary',
      code: 'HU'
    },
    {
      name: 'Iceland',
      code: 'IS'
    },
    {
      name: 'India',
      code: 'IN'
    },
    {
      name: 'Indonesia',
      code: 'ID'
    },
    {
      name: 'Iran',
      code: 'IR'
    },
    {
      name: 'Iraq',
      code: 'IQ'
    },
    {
      name: 'Ireland',
      code: 'IE'
    },
    {
      name: 'Isle of Man',
      code: 'IM'
    },
    {
      name: 'Israel',
      code: 'IL'
    },
    {
      name: 'Italy',
      code: 'IT'
    },
    {
      name: 'Jamaica',
      code: 'JM'
    },
    {
      name: 'Japan',
      code: 'JP'
    },
    {
      name: 'Jersey',
      code: 'JE'
    },
    {
      name: 'Jordan',
      code: 'JO'
    },
    {
      name: 'Kazakhstan',
      code: 'KZ'
    },
    {
      name: 'Kenya',
      code: 'KE'
    },
    {
      name: 'Kiribati',
      code: 'KI'
    },
    {
      name: 'Korea',
      code: 'KP'
    },
    {
      name: 'Korea',
      code: 'KR'
    },
    {
      name: 'Kuwait',
      code: 'KW'
    },
    {
      name: 'Kyrgyzstan',
      code: 'KG'
    },
    {
      name: "Lao People's Democratic Republic",
      code: 'LA'
    },
    {
      name: 'Latvia',
      code: 'LV'
    },
    {
      name: 'Lebanon',
      code: 'LB'
    },
    {
      name: 'Lesotho',
      code: 'LS'
    },
    {
      name: 'Liberia',
      code: 'LR'
    },
    {
      name: 'Libya',
      code: 'LY'
    },
    {
      name: 'Liechtenstein',
      code: 'LI'
    },
    {
      name: 'Lithuania',
      code: 'LT'
    },
    {
      name: 'Luxembourg',
      code: 'LU'
    },
    {
      name: 'Macao',
      code: 'MO'
    },
    {
      name: 'Madagascar',
      code: 'MG'
    },
    {
      name: 'Malawi',
      code: 'MW'
    },
    {
      name: 'Malaysia',
      code: 'MY'
    },
    {
      name: 'Maldives',
      code: 'MV'
    },
    {
      name: 'Mali',
      code: 'ML'
    },
    {
      name: 'Malta',
      code: 'MT'
    },
    {
      name: 'Marshall Islands',
      code: 'MH'
    },
    {
      name: 'Martinique',
      code: 'MQ'
    },
    {
      name: 'Mauritania',
      code: 'MR'
    },
    {
      name: 'Mauritius',
      code: 'MU'
    },
    {
      name: 'Mayotte',
      code: 'YT'
    },
    {
      name: 'Mexico',
      code: 'MX'
    },
    {
      name: 'Micronesia',
      code: 'FM'
    },
    {
      name: 'Moldova',
      code: 'MD'
    },
    {
      name: 'Monaco',
      code: 'MC'
    },
    {
      name: 'Mongolia',
      code: 'MN'
    },
    {
      name: 'Montenegro',
      code: 'ME'
    },
    {
      name: 'Montserrat',
      code: 'MS'
    },
    {
      name: 'Morocco',
      code: 'MA'
    },
    {
      name: 'Mozambique',
      code: 'MZ'
    },
    {
      name: 'Myanmar',
      code: 'MM'
    },
    {
      name: 'Namibia',
      code: 'NA'
    },
    {
      name: 'Nauru',
      code: 'NR'
    },
    {
      name: 'Nepal',
      code: 'NP'
    },
    {
      name: 'Netherlands',
      code: 'NL'
    },
    {
      name: 'New Caledonia',
      code: 'NC'
    },
    {
      name: 'New Zealand',
      code: 'NZ'
    },
    {
      name: 'Nicaragua',
      code: 'NI'
    },
    {
      name: 'Niger',
      code: 'NE'
    },
    {
      name: 'Nigeria',
      code: 'NG'
    },
    {
      name: 'Niue',
      code: 'NU'
    },
    {
      name: 'Norfolk Island',
      code: 'NF'
    },
    {
      name: 'Northern Mariana Islands',
      code: 'MP'
    },
    {
      name: 'Norway',
      code: 'NO'
    },
    {
      name: 'Oman',
      code: 'OM'
    },
    {
      name: 'Pakistan',
      code: 'PK'
    },
    {
      name: 'Palau',
      code: 'PW'
    },
    {
      name: 'Palestine, State of',
      code: 'PS'
    },
    {
      name: 'Panama',
      code: 'PA'
    },
    {
      name: 'Papua New Guinea',
      code: 'PG'
    },
    {
      name: 'Paraguay',
      code: 'PY'
    },
    {
      name: 'Peru',
      code: 'PE'
    },
    {
      name: 'Philippines',
      code: 'PH'
    },
    {
      name: 'Pitcairn',
      code: 'PN'
    },
    {
      name: 'Poland',
      code: 'PL'
    },
    {
      name: 'Portugal',
      code: 'PT'
    },
    {
      name: 'Puerto Rico',
      code: 'PR'
    },
    {
      name: 'Qatar',
      code: 'QA'
    },
    {
      name: 'Republic of North Macedonia',
      code: 'MK'
    },
    {
      name: 'Romania',
      code: 'RO'
    },
    {
      name: 'Russian Federation',
      code: 'RU'
    },
    {
      name: 'Rwanda',
      code: 'RW'
    },
    {
      name: 'Rï¿½union',
      code: 'RE'
    },
    {
      name: 'Saint Barthï¿½lemy',
      code: 'BL'
    },
    {
      name: 'Saint Helena, Ascension and Tristan da Cunha',
      code: 'SH'
    },
    {
      name: 'Saint Kitts and Nevis',
      code: 'KN'
    },
    {
      name: 'Saint Lucia',
      code: 'LC'
    },
    {
      name: 'Saint Martin',
      code: 'MF'
    },
    {
      name: 'Saint Pierre and Miquelon',
      code: 'PM'
    },
    {
      name: 'Saint Vincent and the Grenadines',
      code: 'VC'
    },
    {
      name: 'Samoa',
      code: 'WS'
    },
    {
      name: 'San Marino',
      code: 'SM'
    },
    {
      name: 'Sao Tome and Principe',
      code: 'ST'
    },
    {
      name: 'Saudi Arabia',
      code: 'SA'
    },
    {
      name: 'Senegal',
      code: 'SN'
    },
    {
      name: 'Serbia',
      code: 'RS'
    },
    {
      name: 'Seychelles',
      code: 'SC'
    },
    {
      name: 'Sierra Leone',
      code: 'SL'
    },
    {
      name: 'Singapore',
      code: 'SG'
    },
    {
      name: 'Sint Maarten',
      code: 'SX'
    },
    {
      name: 'Slovakia',
      code: 'SK'
    },
    {
      name: 'Slovenia',
      code: 'SI'
    },
    {
      name: 'Solomon Islands',
      code: 'SB'
    },
    {
      name: 'Somalia',
      code: 'SO'
    },
    {
      name: 'South Africa',
      code: 'ZA'
    },
    {
      name: 'South Georgia and the South Sandwich Islands',
      code: 'GS'
    },
    {
      name: 'South Sudan',
      code: 'SS'
    },
    {
      name: 'Spain',
      code: 'ES'
    },
    {
      name: 'Sri Lanka',
      code: 'LK'
    },
    {
      name: 'Sudan',
      code: 'SD'
    },
    {
      name: 'Suriname',
      code: 'SR'
    },
    {
      name: 'Svalbard and Jan Mayen',
      code: 'SJ'
    },
    {
      name: 'Sweden',
      code: 'SE'
    },
    {
      name: 'Switzerland',
      code: 'CH'
    },
    {
      name: 'Syrian Arab Republic',
      code: 'SY'
    },
    {
      name: 'Taiwan',
      code: 'TW'
    },
    {
      name: 'Tajikistan',
      code: 'TJ'
    },
    {
      name: 'Tanzania, United Republic of',
      code: 'TZ'
    },
    {
      name: 'Thailand',
      code: 'TH'
    },
    {
      name: 'Timor-Leste',
      code: 'TL'
    },
    {
      name: 'Togo',
      code: 'TG'
    },
    {
      name: 'Tokelau',
      code: 'TK'
    },
    {
      name: 'Tonga',
      code: 'TO'
    },
    {
      name: 'Trinidad and Tobago',
      code: 'TT'
    },
    {
      name: 'Tunisia',
      code: 'TN'
    },
    {
      name: 'Turkey',
      code: 'TR'
    },
    {
      name: 'Turkmenistan',
      code: 'TM'
    },
    {
      name: 'Turks and Caicos Islands',
      code: 'TC'
    },
    {
      name: 'Tuvalu',
      code: 'TV'
    },
    {
      name: 'Uganda',
      code: 'UG'
    },
    {
      name: 'Ukraine',
      code: 'UA'
    },
    {
      name: 'United Arab Emirates',
      code: 'AE'
    },
    {
      name: 'United Kingdom of Great Britain and Northern Ireland',
      code: 'GB'
    },
    {
      name: 'United States Minor Outlying Islands',
      code: 'UM'
    },
    {
      name: 'United States of America',
      code: 'US'
    },
    {
      name: 'Uruguay',
      code: 'UY'
    },
    {
      name: 'Uzbekistan',
      code: 'UZ'
    },
    {
      name: 'Vanuatu',
      code: 'VU'
    },
    {
      name: 'Venezuela',
      code: 'VE'
    },
    {
      name: 'Viet Nam',
      code: 'VN'
    },
    {
      name: 'Virgin Islands (British)',
      code: 'VG'
    },
    {
      name: 'Virgin Islands (U.S.)',
      code: 'VI'
    },
    {
      name: 'Wallis and Futuna',
      code: 'WF'
    },
    {
      name: 'Western Sahara',
      code: 'EH'
    },
    {
      name: 'Yemen',
      code: 'YE'
    },
    {
      name: 'Zambia',
      code: 'ZM'
    },
    {
      name: 'Zimbabwe',
      code: 'ZW'
    },
    {
      name: 'iland Islands',
      code: 'AX'
    }
  ];
  
const changedStyles = {
    lowest: "background-color: #bf2828; color: #ffffff; width: 80; text-transform: capitalize",
    low: "background-color: #f50101; color: #ffffff; width: 80; text-transform: capitalize",
    median: "background-color: #263055; color: #ffffff; width: 80; text-transform: capitalize",
    high: "background-color: #0de63f; color: #ffffff; width: 80; text-transform: capitalize",
    highest: "background-color: #1bc943; color: #ffffff; width: 80; text-transform: capitalize"
  };

  const changedStylesObj = {
    lowest: { backgroundColor: '#bf2828', color: '#ffffff', width: 80, textTransform: 'capitalize' },
    low: { backgroundColor: '#f50101', color: '#ffffff', width: 80, textTransform: 'capitalize' },
    median: { backgroundColor: '#263055', color: '#ffffff', width: 80, textTransform: 'capitalize' },
    high: { backgroundColor: '#0de63f', color: '#ffffff', width: 80, textTransform: 'capitalize' },
    highest: { backgroundColor: '#1bc943', color: '#ffffff', width: 80, textTransform: 'capitalize' }
  };

const changeStylesValues = Object.keys(changedStyles);


const changeWordStyler = value => {
    let style = null;
    if (!isNull(value)) {
      if (changeStylesValues.includes(value)) {
        style = changedStyles[value];
        // textTransform:'capitalize'
      }
    }
    return style;
  };


class CountryCodeRenderer {
    init(props){
        this.eGui = document.createElement('span');
        if(props.data.countryCode){
            const url = `https://flags.fmcdn.net/data/flags/mini/${
              props.data.countryCode?.toLowerCase()
            }.png`;
            const flagImage = `<img class="flag" border="0" width="15" height="10" src="${url}">`;
            const filteredWatchlist = countryCodes
              .filter(c =>
                get(c, 'code', '') === props.data.countryCode
              );
            const value = (`${flagImage} ${filteredWatchlist[0]?.name}`);
            this.eGui.innerHTML = value
          }
    }
    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }
  };  

class WordStatusRenderer {
    init(props){
        const colorStyles = changeWordStyler(props.value ? props.value.word : null);
        this.eGui = document.createElement('span');
        this.eGui.innerHTML = `<div style="text-align: center !important;">`;
        if(props.data.isColorEnable) {
            this.eGui.innerHTML +=  `<div style= "height: 20px; line-height: 21px; display: inline-block;
            padding: 0 0.7em;
            font-size: 70%;
            margin-top: 10px;
            font-weight: 700;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.2rem;`+(props.value ? (props.value.word ? colorStyles : "") : "")+`">`+
            (props.value ? props.value.word : `<div></div>`)+`</div>`
        } else {
            this.eGui.innerHTML +=  `<div style="`+(props.value ? (props.value.word ? 'text-transform: capitalize' : "") : "")+`">`+
            (props.value ? props.value.word : `<div></div>`)+`</div>`
        }
        this.eGui.innerHTML += `</div>`
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }
  }

class TickerLogoRenderer{
   
    init(params) {
        const tickerValue = params.value.includes('-G') ? '' : params.value;
        this.eGui = document.createElement('span');
        this.eGui.innerHTML = `<div style="display: flex ; height: 40px; align-items: center"><div style="float:left"><img style="width: 20px; height: 20px" src="https://sma-assets.s3.us-east-2.amazonaws.com/logos/${params.value}.png"/></div><div style="float:left; text-align: left; margin-left: 10px">${tickerValue}</div><div style="clear:both"></div></div>`;
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }
}

const parseNumber = number => {
    let parsedNumber = null;
    if (number) {
      try {
        parsedNumber = Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100
      } catch (e) {
        parsedNumber = null;
      }
    }
    
    return parsedNumber;
  };

  const isNull = (value) => typeof value === "object" && !value


  const descriptionValueStyler = params => {
    if (isNull(params.value)) {
      return null;
    }
    let value = params.value.word;
    let style = null;
    if (!isNull(value) && value) {
      if (changeStylesValues.includes(value)) {
        style = changedStylesObj[value];
      }
  
      if (!style) {
        return null;
      }
      return {
        color: style.backgroundColor
      };
    }
    return null;
  };
  
const percentFormater = (params, flag) => {
    let formatedValue = null;    
    if (!isNull(params.value)) {
      if (flag === false) {
        formatedValue = `${params.value.number.toFixed(2)}%`;
      } else {
        formatedValue = params.value.number.toFixed(2);
      }
    }
    return formatedValue;
  };
const currencyFormaterr = (currency, sign) => {
    var sansDec = currency.toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
  };
function currencyFormater (value, fractionDigits = 2, currencyType = 'USD', prefix = '', postfix = ''){
    if (value === null || value === '') {
      return null;
    }
    let number = Number(value);
    let formatedNumber = '';
    if (currencyType === '') {
      formatedNumber = number.toLocaleString('en-US', {
        minimumFractionDigits: fractionDigits
      });
    } else {
      formatedNumber = number.toLocaleString('en-US', {
        style: 'currency',
        currency: currencyType,
        minimumFractionDigits: fractionDigits
      });
    }
  
    if (fractionDigits === 0) {
      if (formatedNumber.indexOf('.') !== -1) {
        formatedNumber = formatedNumber.split('.')[0];
      }
    }
    return `${prefix}${formatedNumber}${postfix}`;
  };

const get = (object, path, defaultValue=null) => {
        const _path = Array.isArray(path)
            ? path
            : path.split('.');
        if (object && _path.length) return get(object[_path.shift()], _path, defaultValue);
        return object === undefined ? defaultValue : object;
    };

(function () {

    if (SMA && SMA.SMAWatchlistTable) {
        return
    }
    function extractHostname() {
        var hostname;
        var url = window.location.href;
        //find & remove protocol (http, ftp, etc.) and get hostname
        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
        return hostname;
    }

    function getBaseURL(){
        var currentDomain = extractHostname();
        window.topDomain = "http://34.209.84.170/flashboard-dev/public";
        if(currentDomain == 'sma-webapp-react.s3-website.us-east-2.amazonaws.com'){
            window.topDomain = "http://34.209.84.170/flashboard-dev/public";
        }else if(currentDomain == 'filingsflash.com' || currentDomain == 'unstructureddataterminal.com'){
            window.topDomain = "https://api-live.unstructureddataterminal.com/public";
        } else {
            window.topDomain = "http://34.209.84.170/flashboard-dev/public"
        }
    }
    counter = 0;
    window.allParams = [];
    
    SMA.SMAWatchlistTable = function (t) {
        

       

        //Functions passed when initialized
        getBaseURL();

        var readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                func();
            }
        }, 10);

        const formatData = rawDataArr => {
            return rawDataArr.map(rawData => formatComapnyData(rawData));
          };

        const getSectorIndustryById = id => {
            const sectorIndustry = {
                '1': {
                  id: 1,
                  industry: 'Aerospace and Defense',
                  sector: 'Industrials'
                },
                '2': {
                  id: 2,
                  industry: 'Air Freight and Logistics',
                  sector: 'Industrials'
                },
                '3': {
                  id: 3,
                  industry: 'Airlines',
                  sector: 'Industrials'
                },
                '4': {
                  id: 4,
                  industry: 'Auto Components',
                  sector: 'Consumer Discretionary'
                },
                '5': {
                  id: 5,
                  industry: 'Automobiles',
                  sector: 'Consumer Discretionary'
                },
                '6': {
                  id: 6,
                  industry: 'Banks',
                  sector: 'Financials'
                },
                '7': {
                  id: 7,
                  industry: 'Beverages',
                  sector: 'Consumer Staples'
                },
                '8': {
                  id: 8,
                  industry: 'Biotechnology',
                  sector: 'Health Care'
                },
                '9': {
                  id: 9,
                  industry: 'Building Products',
                  sector: 'Industrials'
                },
                '10': {
                  id: 10,
                  industry: 'Capital Markets',
                  sector: 'Financials'
                },
                '11': {
                  id: 11,
                  industry: 'Chemicals',
                  sector: 'Materials'
                },
                '12': {
                  id: 12,
                  industry: 'Commercial Services and Supplies',
                  sector: 'Industrials'
                },
                '13': {
                  id: 13,
                  industry: 'Communications Equipment',
                  sector: 'Information Technology'
                },
                '14': {
                  id: 14,
                  industry: 'Construction and Engineering',
                  sector: 'Industrials'
                },
                '15': {
                  id: 15,
                  industry: 'Construction Materials',
                  sector: 'Materials'
                },
                '16': {
                  id: 16,
                  industry: 'Consumer Finance',
                  sector: 'Financials'
                },
                '17': {
                  id: 17,
                  industry: 'Containers and Packaging',
                  sector: 'Materials'
                },
                '18': {
                  id: 18,
                  industry: 'Distributors',
                  sector: 'Consumer Discretionary'
                },
                '19': {
                  id: 19,
                  industry: 'Diversified Consumer Services',
                  sector: 'Consumer Discretionary'
                },
                '20': {
                  id: 20,
                  industry: 'Diversified Financial Services',
                  sector: 'Financials'
                },
                '21': {
                  id: 21,
                  industry: 'Diversified Telecommunication Services',
                  sector: 'Communication Services'
                },
                '22': {
                  id: 22,
                  industry: 'Electric Utilities',
                  sector: 'Utilities'
                },
                '23': {
                  id: 23,
                  industry: 'Electrical Equipment',
                  sector: 'Industrials'
                },
                '24': {
                  id: 24,
                  industry: 'Electronic Equipment, Instruments and Components',
                  sector: 'Information Technology'
                },
                '25': {
                  id: 25,
                  industry: 'Energy Equipment and Services',
                  sector: 'Energy'
                },
                '26': {
                  id: 26,
                  industry: 'Entertainment',
                  sector: 'Communication Services'
                },
                '27': {
                  id: 27,
                  industry: 'Equity Real Estate Investment Trusts (REITs)',
                  sector: 'Real Estate'
                },
                '28': {
                  id: 28,
                  industry: 'Food and Staples Retailing',
                  sector: 'Consumer Staples'
                },
                '29': {
                  id: 29,
                  industry: 'Food Products',
                  sector: 'Consumer Staples'
                },
                '30': {
                  id: 30,
                  industry: 'Gas Utilities',
                  sector: 'Utilities'
                },
                '31': {
                  id: 31,
                  industry: 'Health Care Equipment and Supplies',
                  sector: 'Health Care'
                },
                '32': {
                  id: 32,
                  industry: 'Health Care Providers and Services',
                  sector: 'Health Care'
                },
                '33': {
                  id: 33,
                  industry: 'Health Care Technology',
                  sector: 'Health Care'
                },
                '34': {
                  id: 34,
                  industry: 'Healthcare Equipment and Supplies',
                  sector: 'Health Care'
                },
                '35': {
                  id: 35,
                  industry: 'Healthcare Providers and Services',
                  sector: 'Health Care'
                },
                '36': {
                  id: 36,
                  industry: 'Hotels, Restaurants and Leisure',
                  sector: 'Consumer Discretionary'
                },
                '37': {
                  id: 37,
                  industry: 'Household Durables',
                  sector: 'Consumer Discretionary'
                },
                '38': {
                  id: 38,
                  industry: 'Household Products',
                  sector: 'Consumer Staples'
                },
                '39': {
                  id: 39,
                  industry: 'Independent Power and Renewable Electricity Producers',
                  sector: 'Utilities'
                },
                '40': {
                  id: 40,
                  industry: 'Industrial Conglomerates',
                  sector: 'Industrials'
                },
                '41': {
                  id: 41,
                  industry: 'Insurance',
                  sector: 'Financials'
                },
                '42': {
                  id: 42,
                  industry: 'Interactive Media and Services',
                  sector: 'Communication Services'
                },
                '43': {
                  id: 43,
                  industry: 'Internet and Direct Marketing Retail',
                  sector: 'Consumer Discretionary'
                },
                '44': {
                  id: 44,
                  industry: 'IT Services',
                  sector: 'Information Technology'
                },
                '45': {
                  id: 45,
                  industry: 'Leisure Products',
                  sector: 'Consumer Discretionary'
                },
                '46': {
                  id: 46,
                  industry: 'Life Sciences Tools and Services',
                  sector: 'Health Care'
                },
                '47': {
                  id: 47,
                  industry: 'Machinery',
                  sector: 'Industrials'
                },
                '48': {
                  id: 48,
                  industry: 'Marine',
                  sector: 'Industrials'
                },
                '49': {
                  id: 49,
                  industry: 'Media',
                  sector: 'Communication Services'
                },
                '50': {
                  id: 50,
                  industry: 'Metals and Mining',
                  sector: 'Materials'
                },
                '51': {
                  id: 51,
                  industry: 'Mortgage Real Estate Investment Trusts (REITs)',
                  sector: 'Financials'
                },
                '52': {
                  id: 52,
                  industry: 'Multi-Utilities',
                  sector: 'Utilities'
                },
                '53': {
                  id: 53,
                  industry: 'Multiline Retail',
                  sector: 'Consumer Discretionary'
                },
                '54': {
                  id: 54,
                  industry: 'Oil, Gas and Consumable Fuels',
                  sector: 'Energy'
                },
                '55': {
                  id: 55,
                  industry: 'Paper and Forest Products',
                  sector: 'Materials'
                },
                '56': {
                  id: 56,
                  industry: 'Personal Products',
                  sector: 'Consumer Staples'
                },
                '57': {
                  id: 57,
                  industry: 'Pharmaceuticals',
                  sector: 'Health Care'
                },
                '58': {
                  id: 58,
                  industry: 'Professional Services',
                  sector: 'Industrials'
                },
                '59': {
                  id: 59,
                  industry: 'Real Estate Management and Development',
                  sector: 'Real Estate'
                },
                '60': {
                  id: 60,
                  industry: 'Road and Rail',
                  sector: 'Industrials'
                },
                '61': {
                  id: 61,
                  industry: 'Semiconductors and Semiconductor Equipment',
                  sector: 'Information Technology'
                },
                '62': {
                  id: 62,
                  industry: 'Software',
                  sector: 'Information Technology'
                },
                '63': {
                  id: 63,
                  industry: 'Specialty Retail',
                  sector: 'Consumer Discretionary'
                },
                '64': {
                  id: 64,
                  industry: 'Technology Hardware, Storage and Peripherals',
                  sector: 'Information Technology'
                },
                '65': {
                  id: 65,
                  industry: 'Textiles, Apparel and Luxury Goods',
                  sector: 'Consumer Discretionary'
                },
                '66': {
                  id: 66,
                  industry: 'Thrifts and Mortgage Finance',
                  sector: 'Financials'
                },
                '67': {
                  id: 67,
                  industry: 'Tobacco',
                  sector: 'Consumer Staples'
                },
                '68': {
                  id: 68,
                  industry: 'Trading Companies and Distributors',
                  sector: 'Industrials'
                },
                '69': {
                  id: 69,
                  industry: 'Transportation Infrastructure',
                  sector: 'Industrials'
                },
                '70': {
                  id: 70,
                  industry: 'Water Utilities',
                  sector: 'Utilities'
                },
                '71': {
                  id: 71,
                  industry: 'Wireless Telecommunication Services',
                  sector: 'Communication Services'
                }
              };
            let data = sectorIndustry[id] || '';
            if (!data) {
              data = { id: '', sector: '', industry: '' };
            }
            return data;
          };

          const formatFileTypeData = (fileTypeFields, rawData) => {
            const commonColumns = [
                'sentiment',
                'sentimentWord',
                'sentimentChange',
                'sentimentChangeWord',
                'wordCountChange',
                'wordCountChangePercent',
                'wordCountChangePercentWord'
              ];
            const fileTypeData = {};
            for (const property in fileTypeFields) {
                var metricName = property
                fileTypeData[metricName] = {};
                commonColumns.forEach((fieldKey, index) => {
                    fileTypeData[metricName][fieldKey] = get(rawData, fileTypeFields[metricName][index], null);
                });
              }
            return fileTypeData;
          };
          
          const formatComapnyData = rawData => {
            const fields10k = {
                totdoc: ['i', 'j', 'k', 'l', 'm', 'n', 'o'],
                mda: ['w', 'x', 'y', 'z', 'aa', 'ab', 'ac'],
                rf: ['ak', 'al', 'am', 'an', 'ao', 'ap', 'aq'],
                notes: [
                  'ay',
                  'az',
                  'ba',
                  'bb',
                  'bc',
                  'bd',
                  'be'
                  // "bf": 18,		// available in respone but not required
                  // "bg": 21,		// available in respone but not required
                ],
                fss: [
                  'fss_10k_sentiment', // not available in response
                  'fss_10k_sentiment_word', // not available in response
                  'fss_10k_sentiment_change', // not available in response
                  'fss_10k_sentiment_change_word', // not available in response
                  'bq',
                  'br',
                  'fss_10k_word_count_change_percent_word' // not available in response
                ]
              };
              
              const fields10q = {
                totdoc: ['p', 'q', 'r', 's', 't', 'u', 'v'],
                mda: ['ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj'],
                rf: ['ar', 'as', 'at', 'au', 'av', 'aw', 'ax'],
                notes: [
                  'bh',
                  'bi',
                  'bj',
                  'bk',
                  'bl',
                  'bm',
                  'bn'
                  // "bo": 18,		// available in respone but not required
                  // "bp": 21,		// available in respone but not required
                ],
                fss: [
                  'fss_10k_sentiment', // not available in response
                  'fss_10k_sentiment_word', // not available in response
                  'fss_10k_sentiment_change', // not available in response
                  'fss_10k_sentiment_change_word', // not available in response
                  'bs',
                  'bt',
                  'fss_10k_word_count_change_percent_word' // not available in response
                ]
              };
            return {
              ticker: get(rawData, "ticker", null),
              companyName: rawData.b,
              industry: (getSectorIndustryById(rawData.cc).industry) ? getSectorIndustryById(rawData.cc).industry : get(rawData, "d"),
              sector: (getSectorIndustryById(rawData.cc).sector) ? getSectorIndustryById(rawData.cc).sector : get(rawData, "c") ,
              mktcap: rawData.e,
              adv: rawData.f,
              last10k: rawData.last_10k,
              last10q: rawData.last_10q,
              '10k': formatFileTypeData(fields10k, rawData),
              '10q': formatFileTypeData(fields10q, rawData),
              recentId10k: rawData['bu'],
              recentId10q: rawData['bw'],
              oldId10k: rawData['bv'],
              oldId10q: rawData['bx'],
              oldId: rawData['bv'],
              periodDate10k: rawData['ca'],
              periodDate10q: rawData['cb'],
              isTickerActive: get(rawData, 'isTickerActive', false),
              documentId: get(rawData, "document_id", null),
              cid:  get(rawData, "cid", null),
              companyId: get(rawData, "cid", null),
              countryCode: get(rawData, "co", null),
            };
          };

          const dateFormaterMoment = value => {
            let formatedValue = null;
            if (value) {
              formatedValue = value.format('MM/DD/YYYY');
            }
            return formatedValue;
          };

          const parseDateStrMoment = dateStr => {
            let dateObj = null;
            if (dateStr) {
              try {
                dateObj = moment(dateStr);
              } catch (e) {
                dateObj = null;
              }
            }
            return dateObj;
          };

          const changeWordGetter = value => {
            let actulaValue = null;
            if (!isNull(value) && typeof value !== 'object') {
              actulaValue = value.toLowerCase();
            }
            return actulaValue;
          };
          
          const changeWordFormatter = value => {
            let formatedValue = '';
            if (value && typeof value !== 'object') {
              formatedValue = value.toUpperCase();
            }
            return formatedValue;
          };


        const processWatchlistData = (watchlistData, selectedFileType, selectedMetric= "totdoc") => {
            const filteredData = [];
            watchlistData.forEach(watchlist => {
            //   console.log("watchlist is:", watchlist)  
              const data = {
                ...watchlist,
                ...watchlist[selectedFileType][selectedMetric],
                last: dateFormaterMoment(
                  parseDateStrMoment(selectedFileType === '10k' ? watchlist.last10k : watchlist.last10q)
                ),
        
                recentId: selectedFileType === '10k' ? watchlist['recentId10k'] : watchlist['recentId10q'],
                oldId: selectedFileType === '10k' ? watchlist['oldId10k'] : watchlist['oldId10q'],
                periodDate: dateFormaterMoment(
                  parseDateStrMoment(selectedFileType === '10k' ? watchlist['periodDate10k'] : watchlist['periodDate10q'])
                ),
        
                documentType: selectedFileType,
                isColorEnable: true
              };
              delete data['10k'];
              delete data['10q'];
              filteredData.push(data);
            });
            return filteredData;
          }

        var getWatchlistData = async(documentType,selectedUniverse,fileType , tickers, gridOptions) => {
            // const userAction = async () => {
                const response = await fetch(window.topDomain+"/api/get_companies_data?selected_type="+documentType+"&subject=ticker&doc_type="+fileType+"&tickers="+tickers.join(","));
                rowData = await response.json(); //extract JSON from the http response
                if(rowData.data.status === "success"){
                    const watchlistDataFormatted = formatData(rowData.data.content);
                    // console.log("watchlistDataFormatted is:", watchlistDataFormatted)
                    const rowDataNow = processWatchlistData(watchlistDataFormatted, fileType)
                    // console.log("rowDataNow is:", rowDataNow)
                    gridOptions.api.setRowData(rowDataNow);
                }
                // do something with myJson
            //   }
        }

        const countriesCode = [
            {
              name: 'Afghanistan',
              code: 'AF'
            },
            {
              name: 'Albania',
              code: 'AL'
            },
            {
              name: 'Algeria',
              code: 'DZ'
            },
            {
              name: 'American Samoa',
              code: 'AS'
            },
            {
              name: 'Andorra',
              code: 'AD'
            },
            {
              name: 'Angola',
              code: 'AO'
            },
            {
              name: 'Anguilla',
              code: 'AI'
            },
            {
              name: 'Antarctica',
              code: 'AQ'
            },
            {
              name: 'Antigua and Barbuda',
              code: 'AG'
            },
            {
              name: 'Argentina',
              code: 'AR'
            },
            {
              name: 'Armenia',
              code: 'AM'
            },
            {
              name: 'Aruba',
              code: 'AW'
            },
            {
              name: 'Australia',
              code: 'AU'
            },
            {
              name: 'Austria',
              code: 'AT'
            },
            {
              name: 'Azerbaijan',
              code: 'AZ'
            },
            {
              name: 'Bahamas',
              code: 'BS'
            },
            {
              name: 'Bahrain',
              code: 'BH'
            },
            {
              name: 'Bangladesh',
              code: 'BD'
            },
            {
              name: 'Barbados',
              code: 'BB'
            },
            {
              name: 'Belarus',
              code: 'BY'
            },
            {
              name: 'Belgium',
              code: 'BE'
            },
            {
              name: 'Belize',
              code: 'BZ'
            },
            {
              name: 'Benin',
              code: 'BJ'
            },
            {
              name: 'Bermuda',
              code: 'BM'
            },
            {
              name: 'Bhutan',
              code: 'BT'
            },
            {
              name: 'Bolivia',
              code: 'BO'
            },
            {
              name: 'Bonaire, Sint Eustatius and Saba',
              code: 'BQ'
            },
            {
              name: 'Bosnia and Herzegovina',
              code: 'BA'
            },
            {
              name: 'Botswana',
              code: 'BW'
            },
            {
              name: 'Bouvet Island',
              code: 'BV'
            },
            {
              name: 'Brazil',
              code: 'BR'
            },
            {
              name: 'British Indian Ocean Territory',
              code: 'IO'
            },
            {
              name: 'Brunei Darussalam',
              code: 'BN'
            },
            {
              name: 'Bulgaria',
              code: 'BG'
            },
            {
              name: 'Burkina Faso',
              code: 'BF'
            },
            {
              name: 'Burundi',
              code: 'BI'
            },
            {
              name: 'Cabo Verde',
              code: 'CV'
            },
            {
              name: 'Cambodia',
              code: 'KH'
            },
            {
              name: 'Cameroon',
              code: 'CM'
            },
            {
              name: 'Canada',
              code: 'CA'
            },
            {
              name: 'Cayman Islands',
              code: 'KY'
            },
            {
              name: 'Central African Republic',
              code: 'CF'
            },
            {
              name: 'Chad',
              code: 'TD'
            },
            {
              name: 'Chile',
              code: 'CL'
            },
            {
              name: 'China',
              code: 'CN'
            },
            {
              name: 'Christmas Island',
              code: 'CX'
            },
            {
              name: 'Cocos Islands',
              code: 'CC'
            },
            {
              name: 'Colombia',
              code: 'CO'
            },
            {
              name: 'Comoros',
              code: 'KM'
            },
            {
              name: 'Congo ',
              code: 'CD'
            },
            {
              name: 'Congo',
              code: 'CG'
            },
            {
              name: 'Cook Islands',
              code: 'CK'
            },
            {
              name: 'Costa Rica',
              code: 'CR'
            },
            {
              name: 'Croatia',
              code: 'HR'
            },
            {
              name: 'Cuba',
              code: 'CU'
            },
            {
              name: 'Curaï¿½ao',
              code: 'CW'
            },
            {
              name: 'Cyprus',
              code: 'CY'
            },
            {
              name: 'Czechia',
              code: 'CZ'
            },
            {
              name: "Cï¿½te d'Ivoire",
              code: 'CI'
            },
            {
              name: 'Denmark',
              code: 'DK'
            },
            {
              name: 'Djibouti',
              code: 'DJ'
            },
            {
              name: 'Dominica',
              code: 'DM'
            },
            {
              name: 'Dominican Republic',
              code: 'DO'
            },
            {
              name: 'Ecuador',
              code: 'EC'
            },
            {
              name: 'Egypt',
              code: 'EG'
            },
            {
              name: 'El Salvador',
              code: 'SV'
            },
            {
              name: 'Equatorial Guinea',
              code: 'GQ'
            },
            {
              name: 'Eritrea',
              code: 'ER'
            },
            {
              name: 'Estonia',
              code: 'EE'
            },
            {
              name: 'Eswatini',
              code: 'SZ'
            },
            {
              name: 'Ethiopia',
              code: 'ET'
            },
            {
              name: 'Falkland Islands [Malvinas]',
              code: 'FK'
            },
            {
              name: 'Faroe Islands',
              code: 'FO'
            },
            {
              name: 'Fiji',
              code: 'FJ'
            },
            {
              name: 'Finland',
              code: 'FI'
            },
            {
              name: 'France',
              code: 'FR'
            },
            {
              name: 'French Guiana',
              code: 'GF'
            },
            {
              name: 'French Polynesia',
              code: 'PF'
            },
            {
              name: 'French Southern Territories',
              code: 'TF'
            },
            {
              name: 'Gabon',
              code: 'GA'
            },
            {
              name: 'Gambia',
              code: 'GM'
            },
            {
              name: 'Georgia',
              code: 'GE'
            },
            {
              name: 'Germany',
              code: 'DE'
            },
            {
              name: 'Ghana',
              code: 'GH'
            },
            {
              name: 'Gibraltar',
              code: 'GI'
            },
            {
              name: 'Greece',
              code: 'GR'
            },
            {
              name: 'Greenland',
              code: 'GL'
            },
            {
              name: 'Grenada',
              code: 'GD'
            },
            {
              name: 'Guadeloupe',
              code: 'GP'
            },
            {
              name: 'Guam',
              code: 'GU'
            },
            {
              name: 'Guatemala',
              code: 'GT'
            },
            {
              name: 'Guernsey',
              code: 'GG'
            },
            {
              name: 'Guinea',
              code: 'GN'
            },
            {
              name: 'Guinea-Bissau',
              code: 'GW'
            },
            {
              name: 'Guyana',
              code: 'GY'
            },
            {
              name: 'Haiti',
              code: 'HT'
            },
            {
              name: 'Heard Island and McDonald Islands',
              code: 'HM'
            },
            {
              name: 'Holy See',
              code: 'VA'
            },
            {
              name: 'Honduras',
              code: 'HN'
            },
            {
              name: 'Hong Kong',
              code: 'HK'
            },
            {
              name: 'Hungary',
              code: 'HU'
            },
            {
              name: 'Iceland',
              code: 'IS'
            },
            {
              name: 'India',
              code: 'IN'
            },
            {
              name: 'Indonesia',
              code: 'ID'
            },
            {
              name: 'Iran',
              code: 'IR'
            },
            {
              name: 'Iraq',
              code: 'IQ'
            },
            {
              name: 'Ireland',
              code: 'IE'
            },
            {
              name: 'Isle of Man',
              code: 'IM'
            },
            {
              name: 'Israel',
              code: 'IL'
            },
            {
              name: 'Italy',
              code: 'IT'
            },
            {
              name: 'Jamaica',
              code: 'JM'
            },
            {
              name: 'Japan',
              code: 'JP'
            },
            {
              name: 'Jersey',
              code: 'JE'
            },
            {
              name: 'Jordan',
              code: 'JO'
            },
            {
              name: 'Kazakhstan',
              code: 'KZ'
            },
            {
              name: 'Kenya',
              code: 'KE'
            },
            {
              name: 'Kiribati',
              code: 'KI'
            },
            {
              name: 'Korea',
              code: 'KP'
            },
            {
              name: 'Korea',
              code: 'KR'
            },
            {
              name: 'Kuwait',
              code: 'KW'
            },
            {
              name: 'Kyrgyzstan',
              code: 'KG'
            },
            {
              name: "Lao People's Democratic Republic",
              code: 'LA'
            },
            {
              name: 'Latvia',
              code: 'LV'
            },
            {
              name: 'Lebanon',
              code: 'LB'
            },
            {
              name: 'Lesotho',
              code: 'LS'
            },
            {
              name: 'Liberia',
              code: 'LR'
            },
            {
              name: 'Libya',
              code: 'LY'
            },
            {
              name: 'Liechtenstein',
              code: 'LI'
            },
            {
              name: 'Lithuania',
              code: 'LT'
            },
            {
              name: 'Luxembourg',
              code: 'LU'
            },
            {
              name: 'Macao',
              code: 'MO'
            },
            {
              name: 'Madagascar',
              code: 'MG'
            },
            {
              name: 'Malawi',
              code: 'MW'
            },
            {
              name: 'Malaysia',
              code: 'MY'
            },
            {
              name: 'Maldives',
              code: 'MV'
            },
            {
              name: 'Mali',
              code: 'ML'
            },
            {
              name: 'Malta',
              code: 'MT'
            },
            {
              name: 'Marshall Islands',
              code: 'MH'
            },
            {
              name: 'Martinique',
              code: 'MQ'
            },
            {
              name: 'Mauritania',
              code: 'MR'
            },
            {
              name: 'Mauritius',
              code: 'MU'
            },
            {
              name: 'Mayotte',
              code: 'YT'
            },
            {
              name: 'Mexico',
              code: 'MX'
            },
            {
              name: 'Micronesia',
              code: 'FM'
            },
            {
              name: 'Moldova',
              code: 'MD'
            },
            {
              name: 'Monaco',
              code: 'MC'
            },
            {
              name: 'Mongolia',
              code: 'MN'
            },
            {
              name: 'Montenegro',
              code: 'ME'
            },
            {
              name: 'Montserrat',
              code: 'MS'
            },
            {
              name: 'Morocco',
              code: 'MA'
            },
            {
              name: 'Mozambique',
              code: 'MZ'
            },
            {
              name: 'Myanmar',
              code: 'MM'
            },
            {
              name: 'Namibia',
              code: 'NA'
            },
            {
              name: 'Nauru',
              code: 'NR'
            },
            {
              name: 'Nepal',
              code: 'NP'
            },
            {
              name: 'Netherlands',
              code: 'NL'
            },
            {
              name: 'New Caledonia',
              code: 'NC'
            },
            {
              name: 'New Zealand',
              code: 'NZ'
            },
            {
              name: 'Nicaragua',
              code: 'NI'
            },
            {
              name: 'Niger',
              code: 'NE'
            },
            {
              name: 'Nigeria',
              code: 'NG'
            },
            {
              name: 'Niue',
              code: 'NU'
            },
            {
              name: 'Norfolk Island',
              code: 'NF'
            },
            {
              name: 'Northern Mariana Islands',
              code: 'MP'
            },
            {
              name: 'Norway',
              code: 'NO'
            },
            {
              name: 'Oman',
              code: 'OM'
            },
            {
              name: 'Pakistan',
              code: 'PK'
            },
            {
              name: 'Palau',
              code: 'PW'
            },
            {
              name: 'Palestine, State of',
              code: 'PS'
            },
            {
              name: 'Panama',
              code: 'PA'
            },
            {
              name: 'Papua New Guinea',
              code: 'PG'
            },
            {
              name: 'Paraguay',
              code: 'PY'
            },
            {
              name: 'Peru',
              code: 'PE'
            },
            {
              name: 'Philippines',
              code: 'PH'
            },
            {
              name: 'Pitcairn',
              code: 'PN'
            },
            {
              name: 'Poland',
              code: 'PL'
            },
            {
              name: 'Portugal',
              code: 'PT'
            },
            {
              name: 'Puerto Rico',
              code: 'PR'
            },
            {
              name: 'Qatar',
              code: 'QA'
            },
            {
              name: 'Republic of North Macedonia',
              code: 'MK'
            },
            {
              name: 'Romania',
              code: 'RO'
            },
            {
              name: 'Russian Federation',
              code: 'RU'
            },
            {
              name: 'Rwanda',
              code: 'RW'
            },
            {
              name: 'Rï¿½union',
              code: 'RE'
            },
            {
              name: 'Saint Barthï¿½lemy',
              code: 'BL'
            },
            {
              name: 'Saint Helena, Ascension and Tristan da Cunha',
              code: 'SH'
            },
            {
              name: 'Saint Kitts and Nevis',
              code: 'KN'
            },
            {
              name: 'Saint Lucia',
              code: 'LC'
            },
            {
              name: 'Saint Martin',
              code: 'MF'
            },
            {
              name: 'Saint Pierre and Miquelon',
              code: 'PM'
            },
            {
              name: 'Saint Vincent and the Grenadines',
              code: 'VC'
            },
            {
              name: 'Samoa',
              code: 'WS'
            },
            {
              name: 'San Marino',
              code: 'SM'
            },
            {
              name: 'Sao Tome and Principe',
              code: 'ST'
            },
            {
              name: 'Saudi Arabia',
              code: 'SA'
            },
            {
              name: 'Senegal',
              code: 'SN'
            },
            {
              name: 'Serbia',
              code: 'RS'
            },
            {
              name: 'Seychelles',
              code: 'SC'
            },
            {
              name: 'Sierra Leone',
              code: 'SL'
            },
            {
              name: 'Singapore',
              code: 'SG'
            },
            {
              name: 'Sint Maarten',
              code: 'SX'
            },
            {
              name: 'Slovakia',
              code: 'SK'
            },
            {
              name: 'Slovenia',
              code: 'SI'
            },
            {
              name: 'Solomon Islands',
              code: 'SB'
            },
            {
              name: 'Somalia',
              code: 'SO'
            },
            {
              name: 'South Africa',
              code: 'ZA'
            },
            {
              name: 'South Georgia and the South Sandwich Islands',
              code: 'GS'
            },
            {
              name: 'South Sudan',
              code: 'SS'
            },
            {
              name: 'Spain',
              code: 'ES'
            },
            {
              name: 'Sri Lanka',
              code: 'LK'
            },
            {
              name: 'Sudan',
              code: 'SD'
            },
            {
              name: 'Suriname',
              code: 'SR'
            },
            {
              name: 'Svalbard and Jan Mayen',
              code: 'SJ'
            },
            {
              name: 'Sweden',
              code: 'SE'
            },
            {
              name: 'Switzerland',
              code: 'CH'
            },
            {
              name: 'Syrian Arab Republic',
              code: 'SY'
            },
            {
              name: 'Taiwan',
              code: 'TW'
            },
            {
              name: 'Tajikistan',
              code: 'TJ'
            },
            {
              name: 'Tanzania, United Republic of',
              code: 'TZ'
            },
            {
              name: 'Thailand',
              code: 'TH'
            },
            {
              name: 'Timor-Leste',
              code: 'TL'
            },
            {
              name: 'Togo',
              code: 'TG'
            },
            {
              name: 'Tokelau',
              code: 'TK'
            },
            {
              name: 'Tonga',
              code: 'TO'
            },
            {
              name: 'Trinidad and Tobago',
              code: 'TT'
            },
            {
              name: 'Tunisia',
              code: 'TN'
            },
            {
              name: 'Turkey',
              code: 'TR'
            },
            {
              name: 'Turkmenistan',
              code: 'TM'
            },
            {
              name: 'Turks and Caicos Islands',
              code: 'TC'
            },
            {
              name: 'Tuvalu',
              code: 'TV'
            },
            {
              name: 'Uganda',
              code: 'UG'
            },
            {
              name: 'Ukraine',
              code: 'UA'
            },
            {
              name: 'United Arab Emirates',
              code: 'AE'
            },
            {
              name: 'United Kingdom of Great Britain and Northern Ireland',
              code: 'GB'
            },
            {
              name: 'United States Minor Outlying Islands',
              code: 'UM'
            },
            {
              name: 'United States of America',
              code: 'US'
            },
            {
              name: 'Uruguay',
              code: 'UY'
            },
            {
              name: 'Uzbekistan',
              code: 'UZ'
            },
            {
              name: 'Vanuatu',
              code: 'VU'
            },
            {
              name: 'Venezuela',
              code: 'VE'
            },
            {
              name: 'Viet Nam',
              code: 'VN'
            },
            {
              name: 'Virgin Islands (British)',
              code: 'VG'
            },
            {
              name: 'Virgin Islands (U.S.)',
              code: 'VI'
            },
            {
              name: 'Wallis and Futuna',
              code: 'WF'
            },
            {
              name: 'Western Sahara',
              code: 'EH'
            },
            {
              name: 'Yemen',
              code: 'YE'
            },
            {
              name: 'Zambia',
              code: 'ZM'
            },
            {
              name: 'Zimbabwe',
              code: 'ZW'
            },
            {
              name: 'iland Islands',
              code: 'AX'
            }
          ];

        const colDefs = [
            {
              headerName: 'Ticker',
              headerTooltip: 'Ticker',
              field: 'ticker',
              colId: 'ticker',
              width: 118,
              minWidth: 118,
              cellClass: ['center-align-text'],
              filter: 'agTextColumnFilter',
              suppressMenu: false,
              menuTabs: ['generalMenuTab'],
              pinned: 'left',
              cellRenderer: TickerLogoRenderer
            },
            {
              headerName: 'Company Name',
              headerTooltip: 'Company Name',
              field: 'companyName',
              colId: 'companyName',
              width: 197,
              filter: 'agTextColumnFilter',
              menuTabs: ['generalMenuTab'],
              suppressMenu: false,
              pinned: 'left'
            },
            {
              headerName: 'Sector',
              headerTooltip: 'Sector',
              field: 'sector',
              width: 142,
              colId: 'sector',
              filter: 'agTextColumnFilter'
            },
            {
              headerName: 'Industry',
              headerTooltip: 'Industry',
              field: 'industry',
              colId: 'industry',
              width: 158,
              filter: 'agTextColumnFilter'
            },
            {
              headerName: 'Market Cap in Millions',
              headerTooltip: 'Market Cap',
              field: 'mktcap',
              colId: 'mktcap',
              width: 117,
              filter: 'agNumberColumnFilter',
              filterParams: {
                numberParser: text => {
                  if (text === null) {
                    text = null;
                  } else {
                    if (!isNaN(parseFloat(text.replace(',', '.')))) {
                      text = parseFloat(text.replace(',', '.'));
                    }
                  }
                  return text;
                }
              },
              valueGetter: params => parseNumber(get(params, 'data.mktcap', null)),
              valueFormatter: params => currencyFormater(params.value, 0, 'USD'),
              cellStyle: () => {
                return { textAlign: 'right' };
              }
            },
            {
              headerName: 'Avg Daily $ Value',
              headerTooltip: 'Avg Daily $ Value',
              field: 'adv',
              colId: 'adv',
              filter: 'agNumberColumnFilter',
              width: 127,
              filterParams: {
                numberParser: text => {
                  if (text === null) {
                    text = null;
                  } else {
                    if (!isNaN(parseFloat(text.replace(',', '.')))) {
                      text = parseFloat(text.replace(',', '.'));
                    }
                  }
                  return text;
                }
              },
              valueGetter: params => parseNumber(get(params, 'data.adv', null)),
              valueFormatter: params => currencyFormater(params.value, 0, 'USD'),
              cellStyle: () => {
                return { textAlign: 'right' };
              }
            },
            {
              headerName: 'Last Reported',
              headerTooltip: 'Last Reported',
              field: 'last',
              colId: 'last',
              width: 117,
              sort: "desc",
              filter: 'agDateColumnFilter',
              cellClass: ['center-align-text'],
            //   comparator: dateComparator,
              getQuickFilterText: params => params.value
            },
            {
              headerName: 'Period Date',
              headerTooltip: 'Period Date',
              field: 'periodDate',
              colId: 'periodDate',
              width: 117,
              sort: "desc",
            //   comparator: dateComparator,
              filter: 'agDateColumnFilter',
              cellClass: ['center-align-text'],
              getQuickFilterText: params => params.value
            },
            {
              headerName: 'Aggregated Sentiment',
              headerTooltip: `The aggregated sentiment of the parsed text using \n CA\`s proprietary Financial NLP`,
              field: 'sentiment',
              width: 112,
              colId: 'sentiment',
              type: 'numericColumn',
              filter: 'agNumberColumnFilter',
              valueGetter: params => {
                const sentimentValue = get(params, 'data.sentiment', null);
                let sentimentObj = null;
                if (sentimentValue) {
                  sentimentObj = {
                    number: parseNumber(get(params, 'data.sentiment', null)),
                    word: changeWordGetter(get(params, 'data.sentimentWord', null))
                  };
                }
                return sentimentObj;
              },
              valueFormatter: params => {
                  return  percentFormater(params, true)
              },
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  const value = get(params, 'data.sentiment', null);
                  return value !== null ? parseNumber(value) : null;
                }
              },
              cellStyle: params => {
                return params.data.isColorEnable ? descriptionValueStyler(params) : null;
              }
            },
            {
              headerName: 'Sentiment Quintile',
              headerTooltip: 'Sentiment Quintile',
              field: 'sentimentWord',
              colId: 'sentimentWord',
              width: 106,
              valueGetter: params => {
                return {
                  number: parseNumber(get(params, 'data.sentiment', null)),
                  word: changeWordGetter(get(params, 'data.sentimentWord'))
                };
              },
              valueFormatter: params => {
                return changeWordFormatter(params.value.word);
              },
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  return get(params, 'data.sentimentWord', null);
                }
              },
              cellRenderer: WordStatusRenderer
            },
            {
              headerName: 'Sentiment Change',
              headerTooltip: 'The raw change in `Sentiment` from the company`s most recent filing of the same type.',
              field: 'sentimentChange',
              colId: 'sentimentChange',
              type: 'numericColumn',
              filter: 'agNumberColumnFilter',
              width: 104,
              valueGetter: params => {
                const sentimentValue = get(params, 'data.sentimentChange', null);
                let sentimentObj = null;
                if (sentimentValue) {
                  sentimentObj = {
                    number: parseNumber(sentimentValue),
                    word: changeWordGetter(get(params, 'data.sentimentChangeWord', null))
                  };
                }
                return sentimentObj;
              },
              valueFormatter: params => percentFormater(params, true),
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  const value = get(params, 'data.sentimentChange', null);
                  return value !== null ? parseNumber(value) : null;
                }
              },
              cellStyle: params => {
                return params.data.isColorEnable ? descriptionValueStyler(params) : null;
              }
            },
            {
              headerName: 'Sentiment Change Quintile',
              headerTooltip: 'Sentiment Change Quintile',
              field: 'sentimentChangeWord',
              colId: 'sentimentChangeWord',
              width: 118,
              valueGetter: params => {
                const sentimentValue = get(params, 'data.sentimentChange', null);
                let sentimentObj = null;
                if (sentimentValue) {
                  sentimentObj = {
                    number: parseNumber(sentimentValue),
                    word: changeWordGetter(get(params, 'data.sentimentChangeWord', null))
                  };
                }
                return sentimentObj;
              },
              valueFormatter: params => {
                return changeWordFormatter(params.value ? params.value.word : null);
              },
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  return get(params, 'data.sentimentChangeWord', null);
                }
              },
              cellRenderer: WordStatusRenderer
            },
            {
              headerName: 'Word Count Change',
              headerTooltip: `The raw change in Word Count of the parsed text from the company\`s most recent filing of the same type.`,
              field: 'wordCountChange',
              colId: 'wordCountChange',
              type: 'numericColumn',
              filter: 'agNumberColumnFilter',
              width: 93,
              valueGetter: params => {
                const sentimentValue = get(params, 'data.wordCountChange', null);
                let sentimentObj = null;
                if (sentimentValue) {
                  sentimentObj = {
                    number: parseNumber(sentimentValue),
                    word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
                  };
                }
                return sentimentObj;
              },
          
              valueFormatter: params => {
                if (params.value !== null) {
                  return currencyFormater(params.value.number, 0, '');
                }
                return null;
              },
              cellStyle: params => {
                return params.data.isColorEnable ? descriptionValueStyler(params) : null;
              },
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  const value = get(params, 'data.wordCountChange', null);
                  return value !== null ? parseNumber(value) : null;
                }
              }
            },
            {
              headerName: 'Word Count Change Percentage',
              headerTooltip:
                'The percentage change in Word Count of the parsed text from the company`s most recent filing of the same type.',
              field: 'wordCountChangePercent',
              colId: 'wordCountChangePercent',
              type: 'numericColumn',
              filter: 'agNumberColumnFilter',
              width: 109,
              valueGetter: params => {
                const sentimentValue = get(params, 'data.wordCountChangePercent', null);
                let sentimentObj = null;
                if (sentimentValue) {
                  sentimentObj = {
                    number: parseNumber(sentimentValue),
                    word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
                  };
                }
                return sentimentObj;
              },
              valueFormatter: params => percentFormater(params, false),
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  const value = get(params, 'data.wordCountChangePercent', null);
                  return value !== null ? parseNumber(value) : null;
                }
              },
              cellStyle: params => {
                return params.data.isColorEnable ? descriptionValueStyler(params) : null;
              }
            },
            {
              headerName: 'Word Count Change Quintile',
              headerTooltip:
                'Quintile of the security for that Factor , ' +
                'Lowest – First quintile of the factor (1st - 20th percentile) ,  ' +
                'Low – Second quintile of the factor (21st - 40th percentile) ,  ' +
                'Median – Third quintile of the factor (41st - 60th percentile) ,  ' +
                'High – Fourth quintile of the factor (61st - 80th percentile)  , ' +
                'Highest – Fifth quintile of the factor (81st - 100th percentile)',
              field: 'wordCountChangePercentWord',
              colId: 'wordCountChangePercentWord',
              width: 115,
              valueGetter: params => {
                const sentimentValue = get(params, 'data.wordCountChangePercent', null);
                let sentimentObj = null;
                if (sentimentValue) {
                  sentimentObj = {
                    number: parseNumber(sentimentValue),
                    word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
                  };
                }
                return sentimentObj;
              },
              valueFormatter: params => {
                return changeWordFormatter(params.value ? params.value.word : null);
              },
            //   comparator: numberWordComparator,
              filterParams: {
                valueGetter: params => {
                  return get(params, 'data.wordCountChangePercentWord', null);
                }
              },
              cellRenderer: WordStatusRenderer
            },
            {
              headerName: 'Country',
              headerTooltip: 'Country',
              field: 'countryCode',
              colId: 'countryCode',
              width: 158,
              filter: 'agTextColumnFilter',
              valueGetter: params => {
                const filteredWatchlist = countriesCode.filter(c => get(c, 'code') === get(params, 'data.countryCode'));
                return filteredWatchlist[0]?.name;
              },
              cellRenderer: CountryCodeRenderer
            }
          ];

        const setupGridCols = async (documentType, selectedUniverse, fileType, tickers) => {
              
              const gridOptions = {
                columnDefs: colDefs,
                defaultColDef: {
                    sortable: true,
                    filter: true,
                    resizable: true,
                    floatingFilter: true,
                    suppressMenu: true,
                    filterParams: { newRowsAction: 'keep' },
                    headerClass: ['allColumnHeader'],
                    wrapText: true
                },
                rowData: rowData,
                onRowEditingStarted: function (event) {
                  console.log('never called - not doing row editing');
                },
                onRowEditingStopped: function (event) {
                  console.log('never called - not doing row editing');
                },
                onCellEditingStarted: function (event) {
                  console.log('cellEditingStarted');
                },
                onCellEditingStopped: function (event) {
                  console.log('cellEditingStopped');
                },
                tooltipShowDelay: 0,
                pagination: true,
                suppressScrollOnNewData: true, 
                enableBrowserTooltips: true
              };

              const gridDiv = document.querySelector('#aggridDiv');
              new agGrid.Grid(gridDiv, gridOptions);
              await getWatchlistData(documentType, selectedUniverse,fileType, tickers,gridOptions)
        }

        const setupGrid = async (documentType, selectedUniverse, fileType, tickers) => {
            await setupGridCols(documentType, selectedUniverse, fileType, tickers)
        }

        function func() {
            var tContainer = t.container || "sma_watchlist_table_container";
            var tableWidth = t.tableWidth || "auto";
            var tableHeight = t.tableHeight || "auto";
            var documentType = t.docType || "domestic";
            var selectedUniverse = t.selectedUniverse || "recent";
            var fileType = t.fileType || "10k";
            var tickers = t.tickers || [];

            if(tableWidth.indexOf('%') > -1 || tableWidth=== "auto")
            {
                tableWidth = tableWidth || "auto";
            }
            else{
                tableWidth = (tableWidth) + 'px' || "auto";
            }

            if(tableHeight.indexOf('%') > -1 || tableHeight=== "auto")
            {
                tableHeight = tableHeight || "auto";
            }
            else{
                tableHeight = (tableHeight - 20) + 'px' || "auto";
            }
            const divContent = document.getElementById(tContainer)
            if(divContent){
                divContent.innerHTML= '<div id="aggridDiv" style="height: '+tableHeight+'; width: '+tableWidth+';" class="ag-theme-alpine"></div>'
                
                var cssFile = document.createElement('link');
                cssFile.rel = 'stylesheet';
                cssFile.href = "https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css";
                document.body.appendChild(cssFile); // append css to head element

                var cssFile2 = document.createElement('link');
                cssFile2.rel = 'stylesheet';
                cssFile2.href = "https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css";
                document.body.appendChild(cssFile2); // append css to head element

                var my_awesome_script2 = document.createElement('script');
                my_awesome_script2.setAttribute('src','https://MomentJS.com/downloads/moment.js');
                document.body.appendChild(my_awesome_script2);

                var my_awesome_script = document.createElement('script');
                my_awesome_script.setAttribute('src','https://unpkg.com/ag-grid-community@27.1.0/dist/ag-grid-community.min.js');
                document.body.appendChild(my_awesome_script);

                my_awesome_script.onload = () => {
                    setupGrid(documentType, selectedUniverse, fileType, tickers);
                }
            }
        }
        func();
    }
})()