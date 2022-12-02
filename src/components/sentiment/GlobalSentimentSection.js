import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import clsx from 'clsx';
import { setSelectedHeadingId, setIsHighlightedText } from '../../reducers/Sentiment';
import { upperCase, get, lowerCase, isEmpty } from 'lodash';
import Rainbow from './Rainbow';
const useStyles = makeStyles(theme => ({
    lvl: {
        fontSize: 20
    },
    content: {
        fontSize: 12
    },
    loaderSection: {
        textAlign: 'center'
    },
    highlightHeading: {
        background: '#CCC',
        display: 'inline'
    },
    upper: {
        textTransform: 'capitalize'
    },
    lvl2: {
        fontSize: 28
    },
    lvl4: {
        fontSize: 24
    },
    lvl6: {
        fontSize: 22
    },

    lvl8: {
        fontSize: 20
    },
    searchResultText: {
        '& .yellowColor': {
            backgroundColor: 'orange',
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: 4
        }
    },
    searchResultTextHeading: {
        '& .yellowcolor': {
            backgroundColor: 'orange',
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: 4
        },
        yellowClr: {
            backgroundColor: 'orange',
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: 4
        }
    },
    mainContainer: {
        backgroundColor: 'white'
    }
}));

const SentimentSection = ({ contentData, onHandleHighlights, onSelection }) => {
    const classes = useStyles();
    let keywordsArray = {};
    const dispatch = useDispatch();
    const [basicColor] = useState({
        minV: -1,
        maxV: 1,
        n: 100
    });
    let yellowTextCount = 0;
    const { data, isLoading, selectedHeadingId, sentiment, isHighLightedText } = useSelector(state => state.Sentiment);

    useEffect(() => {
        if (selectedHeadingId && data) {
            setTimeout(() => {
                dispatch(setSelectedHeadingId(null));
            }, 2000);
        }
    }, [selectedHeadingId, dispatch, data]);

    useEffect(() => {
        if (selectedHeadingId) {
            onSelection(selectedHeadingId);
        }
    }, [selectedHeadingId, onSelection]);

    const rainbow = new Rainbow();
    rainbow.setSpectrum('#ff2a2a', '#ff2a2a', 'white', '#89ff89', '#89ff89');
    const parentClr = val => {
        var pos = parseFloat(((val - basicColor.minV) / (basicColor.maxV - basicColor.minV)) * basicColor.n);
        let clr = rainbow.colourAt(pos);
        if (sentiment === 'extremeSentiment') {
            if (val > 0.2 || val < -0.2) {
                return clr;
            } else {
                // return white
                return 'FFFFFF';
            }
        }
        if (sentiment === 'hide') {
            return 'FFFFFF';
        }

        return clr;
    };

    const updateSentimentHighlightFunct = indexVal => {
        if (indexVal) {
            indexVal = indexVal.toLowerCase().replace(' ', '-');
            if (!keywordsArray[indexVal]) {
                keywordsArray[indexVal] = [];
            }
            const hashValue = createHash(`#${indexVal}${keywordsArray[indexVal]}text`);
            const obj = { [indexVal]: hashValue };
            keywordsArray[indexVal].push(obj);
            if (!isEmpty(keywordsArray) && !isHighLightedText) {
                dispatch(setIsHighlightedText(true));
            }
            onHandleHighlights(keywordsArray);
            return hashValue;
        } else {
            return '';
        }
    };
    const childClr = val => {
        if (val) {
            var pos = parseFloat(((val - basicColor.minV) / (basicColor.maxV - basicColor.minV)) * basicColor.n);
            let clr = rainbow.colourAt(pos);
            if (sentiment === 'extremeSentiment') {
                if (val > 0.2 || val < -0.2) {
                    return clr;
                } else {
                    // return white
                    return 'FFFFFF';
                }
            }
            if (sentiment === 'hide') {
                return 'FFFFFF';
            }
            return clr;
        }
    };
    const isValidString = string => {
        let ch = string.trim().charAt(0);       // take out first character of string
        let isCharacter = ch.match(/[a-z]/i);   // checks if first character is alphabet
        let isDigit = (ch >= '0' && ch <= '9'); // checks if first character is number
        let result;
        if (isCharacter) result = true;
        else result = false;
        if (result || isDigit) return false;    // returns false if first character is alphanumerical
        else return true;
    }

    let signatureIterator = 1;
    return (
        <div className={clsx({ [classes.mainContainer]: !isLoading })}>
            {isLoading ? (
                <div className={classes.loaderSection}>
                    <BeatLoader color={'var(--primary)'} size={15} />
                </div>
            ) : (
                contentData.map((d, index) => {
                    let idVal = lowerCase(d.prop);
                    if (idVal === 'signatures') {
                        idVal = idVal + signatureIterator;
                        signatureIterator++;
                    }
                    return index !== 0 ? (
                        <div
                            key={`1_${index}`}
                            style={{
                                paddingLeft: d.lvl * 4 + 4,
                                scrollMarginTop: '210px'
                            }}
                            id={createHash(idVal)}>
                            {d.content ? (
                                <div>
                                    {get(d, 'newData.elements', null)
                                        ? d.newData.elements[0].elements.map((a, indexx) => {
                                            return (
                                                <div
                                                    key={`2_${indexx}`}
                                                    style={{
                                                        backgroundColor: '#' + parentClr(0)
                                                    }}>
                                                    {a.elements
                                                        ? Array.isArray(a.elements)
                                                            ? a.elements.map((c, i) => {
                                                                return (
                                                                    <>
                                                                        <br />
                                                                        <span key={`3_${i}`}>
                                                                            {c.type === 'element' ? (
                                                                                <span
                                                                                    key={`4_${i}`}
                                                                                    className={clsx(classes.content, classes.searchResultText)}
                                                                                    style={{
                                                                                        backgroundColor: '#' + childClr(c.attributes ? c.attributes.v : 0)
                                                                                    }}>
                                                                                    {c.elements
                                                                                        ?
                                                                                        c.elements.map((d, e) => {
                                                                                            const parentAttributes = d.attributes;
                                                                                            return (
                                                                                                <Fragment key={`8_${e}`}>
                                                                                                    {d.type === 'element' ? (
                                                                                                        <>
                                                                                                            {Array.isArray(d.elements)
                                                                                                                ? d.elements.map((g, k) => {
                                                                                                                    if (g) {
                                                                                                                        yellowTextCount = yellowTextCount + 1;
                                                                                                                    }
                                                                                                                    if (g.type === 'element') {
                                                                                                                        if (
                                                                                                                            g.attributes &&
                                                                                                                            g.attributes.class === 'yellowColor'
                                                                                                                        ) {
                                                                                                                            d.attributes = g.attributes;
                                                                                                                        } else {
                                                                                                                            d.attributes = parentAttributes;
                                                                                                                        }
                                                                                                                        if (Array.isArray(g.elements)) {
                                                                                                                            g = g.elements[0];
                                                                                                                        } else {
                                                                                                                            d.attributes = parentAttributes;
                                                                                                                        }
                                                                                                                    } else {
                                                                                                                        d.attributes = parentAttributes;
                                                                                                                    }
                                                                                                                    return (
                                                                                                                        <span
                                                                                                                            id={updateSentimentHighlightFunct(
                                                                                                                                d.attributes
                                                                                                                                    ? d.attributes.class === 'yellowColor'
                                                                                                                                        ? g.text
                                                                                                                                            ? g.text
                                                                                                                                            : ''
                                                                                                                                        : ''
                                                                                                                                    : ''
                                                                                                                            )}
                                                                                                                            key={`4_${k}`}
                                                                                                                            style={{
                                                                                                                                backgroundColor: `${d.attributes
                                                                                                                                    ? d.attributes.class === 'yellowColor'
                                                                                                                                        ? 'orange'
                                                                                                                                        : '#' +
                                                                                                                                        childClr(
                                                                                                                                            d.attributes ? d.attributes.v : 0
                                                                                                                                        )
                                                                                                                                    : '#' +
                                                                                                                                    childClr(d.attributes ? d.attributes.v : 0)
                                                                                                                                    }`,
                                                                                                                                marginLeft: 0,
                                                                                                                                borderRadius: `${d.attributes
                                                                                                                                    ? d.attributes.class === 'yellowColor'
                                                                                                                                        ? 4
                                                                                                                                        : 0
                                                                                                                                    : 0
                                                                                                                                    }`,
                                                                                                                                scrollMarginTop: '300px'
                                                                                                                            }}>
                                                                                                                            {g.text ? g.text : ''}
                                                                                                                        </span>
                                                                                                                    );
                                                                                                                })
                                                                                                                : null}
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <Fragment key={`5_${e}`}>
                                                                                                            {c.attributes ? (
                                                                                                                c.attributes.class === 'yellowColor' ? (
                                                                                                                    <span
                                                                                                                        id={
                                                                                                                            d.text ? updateSentimentHighlightFunct(d.text) : null
                                                                                                                        }
                                                                                                                        key={`6_${e}`}
                                                                                                                        style={{
                                                                                                                            backgroundColor: 'orange',
                                                                                                                            marginLeft: 3,
                                                                                                                            borderRadius: 4,
                                                                                                                            scrollMarginTop: '300px'
                                                                                                                        }}>
                                                                                                                        {d.text ? d.text : ''}
                                                                                                                    </span>
                                                                                                                ) : (
                                                                                                                    (d.text) ? isValidString(d.text) ? (
                                                                                                                        <>
                                                                                                                            {d.text}
                                                                                                                            <br />
                                                                                                                        </>
                                                                                                                    ) : `${d.text}` : null
                                                                                                                )
                                                                                                            ) : (
                                                                                                                d.text
                                                                                                            )}
                                                                                                        </Fragment>
                                                                                                    )}
                                                                                                </Fragment>
                                                                                            );
                                                                                        })
                                                                                        : null}
                                                                                </span>
                                                                            ) : (
                                                                                c.text
                                                                            )}
                                                                        </span>
                                                                    </>
                                                                );
                                                            })
                                                            : null
                                                        : null}{''}
                                                </div>
                                            );
                                        })
                                        : null}
                                </div>
                            ) : (
                                <>
                                    <br />
                                    <p
                                        key={`11_${index}`}
                                        className={clsx(
                                            classes.upper,
                                            classes.searchResultTextHeading,
                                            classes.searchResultText,
                                            classes[`lvl${d.lvl}`],
                                            classes.lvl,
                                            selectedHeadingId === createHash(idVal) ? classes.highlightHeading : null
                                        )}
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                d.lvl === 4
                                                    ? upperCase(d.prop)
                                                    : d.prop
                                                        .toLowerCase()
                                                        .replace('data', '')
                                                        .replace('ex.data', '')
                                                        .replace('*.data', '')
                                        }}></p>
                                </>
                            )}
                        </div>
                    ) : null;
                })
            )}
        </div>
    );
};

export default SentimentSection;
