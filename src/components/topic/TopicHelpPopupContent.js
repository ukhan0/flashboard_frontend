import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { setTopicSearchText } from '../../reducers/Topic';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(theme => ({
  font: {
    fontFamily: 'sans-serif'
  },
  fontAndClr: {
    fontFamily: 'sans-serif',
    color: '#333333'
  },

  yellowclr: {
    backgroundColor: 'orange',
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 4
  },
  clrBlue: {
    color: 'blue',
    cursor: 'pointer'
  }
}));
const TopicHelpPopupContent = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getText = text => {
    props.onClose();
    dispatch(setTopicSearchText(text));
  };
  return (
    <div style={{ height: '400px' }}>
      <div>
        <h4>OR</h4>

        <p>
          An “OR” statement will display all documents that contain either/any of the words listed. The example below of
          “silver OR gold” will display all documents containing “silver” and all documents containing “ gold” within
          the filings universe selected. The syntax || and OR are interchangeable.
        </p>
        <p>(Note: Smart synonyms are added as ORs)</p>
        <p>
          Example:{' '}
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('silver OR gold');
            }}>
            silver OR gold
          </span>
        </p>
        <p>
          Alternative:{' '}
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('silver || gold');
            }}>
            silver || gold
          </span>
        </p>
        <p>Results:</p>
        <p>
          1. The assets of the Trust consist primarily of <span className={classes.yellowclr}>silver</span> bullion held
          by a custodian as an agent of the Trust responsible only to the Trustee.
        </p>
        <p>
          2. Metals Prices Changes in the market prices of <span className={classes.yellowclr}>silver</span>,{' '}
          <span className={classes.yellowclr}>gold</span>, lead and zinc can significantly affect our profitability and
          cash flow.
        </p>
        <p>
          3. Our estimates of proven and probable reserves are based on the prices of $1,300 per{' '}
          <span className={classes.yellowclr}>gold</span> ounce for 2020 and 2019 and $1,200 per{' '}
          <span className={classes.yellowclr}>gold</span> ounce for underground reserves and $1,225 for open pit
          reserves for 2018.
        </p>
        <h4> AND</h4>
        <p>
          An “AND” statement will display all documents that contain both/ all words listed. The example below of “
          silver AND gold” will display documents that contain both “ silver” and “gold” anywhere in the document. The
          syntax && and AND are interchangeable.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('silver AND gold');
            }}>
            silver AND gold
          </span>
        </p>
        <p>
          Alternative:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('silver && gold');
            }}>
            silver && gold
          </span>
        </p>
        <p>Results:</p>
        <p>
          1. Metals Prices Changes in the market prices of <span className={classes.yellowclr}>silver</span>,{' '}
          <span className={classes.yellowclr}>gold</span>, lead and zinc can significantly affect our profitability and
          cash flow.
        </p>
        <h4>NOT</h4>
        <p>
          A “NOT” will exclude contexts which include the “NOT” term. The example below of will display all text which
          contain “gold” unless it also contains “silver”. The syntax NOT, - and ! are interchangeable.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('gold NOT silve');
            }}>
            gold NOT silve
          </span>
        </p>
        <p>
          Alternative 1:{' '}
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('gold!silver');
            }}>
            gold!silver
          </span>
        </p>
        <p>
          Alternative 2:{' '}
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('gold -silver');
            }}>
            gold -silver
          </span>
        </p>
        <p>Results:</p>
        <p>
          1. Our estimates of proven and probable reserves are based on the prices of $1,300 per{' '}
          <span className={classes.yellowclr}>gold</span> ounce for 2020 and 2019 and $1,200 per{' '}
          <span className={classes.yellowclr}>gold</span> ounce for underground reserves and $1,225 for open pit
          reserves for 2018.
        </p>
        <h4>MUST HAVE</h4>
        <p>
          A ‘+’ character means that the term must be in the document. The example below will display all documents that
          contain “gold” and display the hits of “silver” within the documents that contain “gold”.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('+gold OR silver');
            }}>
            +gold OR silver
          </span>
        </p>
        <p>
          1. Metals Prices Changes in the market prices of <span className={classes.yellowclr}>silver</span>,{' '}
          <span className={classes.yellowclr}>gold</span>, lead and zinc can significantly affect our profitability and
          cash flow.
        </p>
        <p>
          2. Our estimates of proven and probable reserves are based on the prices of $1,300 per{' '}
          <span className={classes.yellowclr}>gold</span> ounce for 2020 and 2019 and $1,200 per{' '}
          <span className={classes.yellowclr}>gold</span> ounce for underground reserves and $1,225 for open pit
          reserves for 2018.
        </p>
        <h4>WILDCARDS</h4>
        <p>
          Wildcards are a substitute for zero or more characters. A ‘?’ character replaces a single character. A ‘*’
          character replaces zero or more characters. The examples are explained below.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('ebit??');
            }}>
            ebit??
          </span>{' '}
        </p>
        <p>Will display all results of words that start with “ebit” and end with exactly 2 more letters.</p>
        <p>Results:</p>
        <p>
          1. Adjusted <span className={classes.yellowclr}>EBITDA</span> and Non-GAAP net income (loss) are not measures
          of our financial performance under GAAP and should not be considered as alternatives to net income (loss),
          operating income (loss), or any other measures derived in accordance with GAAP.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('Ebit*');
            }}>
            Ebit*
          </span>{' '}
        </p>
        <p>
          Will display all results of words that start with “ebit”. “EBITDAre” will appear in this search and not the
          previous search because there are three letters after “ebit”.
        </p>
        <p>Results:</p>
        <p>
          1. Adjusted <span className={classes.yellowclr}>EBITDA</span> and Non-GAAP net income (loss) are not measures
          of our financial performance under GAAP and should not be considered as alternatives to net income (loss),
          operating income (loss), or any other measures derived in accordance with GAAP.
        </p>
        <p>
          2. Calculated as LQA Adjusted <span className={classes.yellowclr}>EBITDAre</span> as of 3/31/21, further
          adjusted for executed-but-not-yet-commenced leases, disposition pipeline totaling $54.3 million in gross
          proceeds…
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('dr?g');
            }}>
            dr?g
          </span>{' '}
        </p>
        <p>Will display all results that start with “dr”, end with “g” and are separated by exactly one letter.</p>
        <p>Results:</p>
        <p>
          1. Since a 2010 U.S. Court of Appeals decision, the Food and <span className={classes.yellowclr}>Drug</span>{' '}
          Administration (FDA”) is permitted to regulate electronic cigarettes as “tobacco products” under the Family
          Smoking Prevention and the Tobacco Control Act.
        </p>
        <p>
          2. The editor is accessible on Windows, Mac and Linux operating systems and enables creators to{' '}
          <span className={classes.yellowclr}>drag</span> and drop content, such as images, textures, 3D meshes and
          sounds, into a virtual workspace.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('dr*g');
            }}>
            dr*g
          </span>{' '}
        </p>
        <p>
          Will display all results that start with “dr” and end with “g”. “Dropping” will appear in this search but not
          in the previous search because there is more than one letter between “dr” and the “g”. “DRG” will also appear
          in this search and not in the previous because * can also be 0 characters.
        </p>
        <p>Results:</p>
        <p>
          1. Since a 2010 U.S. Court of Appeals decision, the Food and <span className={classes.yellowclr}>Drug</span>{' '}
          Administration (FDA”) is permitted to regulate electronic cigarettes as “tobacco products” under the Family
          Smoking Prevention and the Tobacco Control Act.
        </p>
        <p>
          2. The editor is accessible on Windows, Mac and Linux operating systems and enables creators to{' '}
          <span className={classes.yellowclr}>drag</span> and drop content, such as images, textures, 3D meshes and
          sounds, into a virtual workspace.
        </p>
        <p>
          3. his action was in response to the reserve ratio <span className={classes.yellowclr}>dropping</span> to 1.30
          percent primarily due to the inflow of more than $1 trillion in estimated insured deposits in the first six
          month of 2020 resulting mainly from the pandemic, monetary policy actions, direct government assistance and an
          overall reduction in spending.
        </p>
        <p>
          4. Also <span className={classes.yellowclr}>driving</span> the increase was a specific reserve on one loan
          totaling $2.1 million at December 31, 2020.
        </p>
        <p>
          5. Each <span className={classes.yellowclr}>DRG</span> or APC is associated with a level of payment and may be
          adjusted from time to time, usually annually.
        </p>
        <h4>Proximity Search</h4>

        <p>
          Proximity search allows for searching for words within a certain distance of each other. The syntax follows,
          “word1 word2”~x where world1 and word2 are separated by a space and are both in quotes followed by a ~ then a
          number (x). The number (x) represents the number of words that can separate the two words within the quotes.
          The example below will display all documents when “increase” and “
          <span className={classes.yellowclr}>ebitda</span>” are separated by 5 words or less.
        </p>
        <p>(Note: Other functions such as wildcards, grouping, ORs etc. do not work within a proximity search)</p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('“increase ebitda”~5');
            }}>
            “increase ebitda”~5
          </span>
        </p>
        <p>
          1. The First Amendment, among other things, amended the TRP Revolver to (a){' '}
          <span className={classes.yellowclr}>increase</span> the maximum percentage of Consolidated{' '}
          <span className={classes.yellowclr}>EBITDA</span> attributable to Material Project{' '}
          <span className={classes.yellowclr}>EBITDA</span> Adjustments from 20% to 30%
        </p>
        <p>
          2. An increase in the Market/<span className={classes.yellowclr}>EBITDA</span> multiple, in isolation, net of
          adjustments, would result in an <span className={classes.yellowclr}>increase</span> in a fair value
          measurement.
        </p>
        <h4>Grouping ()</h4>
        <p>
          Multiple terms can be grouped together using parentheses. This allows for an array of different conditional
          searches. The first example will display documents where both “increase” and “ ebitda” are within 5 words and
          where “decrease” and “debt” are within 5 words. The second example will display documents that mention
          “mining” and at least one of the three metals: silver, gold or copper.
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('("increase ebitd a"~5) AND ("decrease debt"~5)');
            }}>
            ("increase ebitd a"~5) AND ("decrease debt"~5)
          </span>
        </p>
        <p>Results:</p>
        <p>
          1. The decrease in general and administrative expense was primarily due to a $1.2 million{' '}
          <span className={classes.yellowclr}>decrease</span> in bad <span className={classes.yellowclr}>debt</span>
          expense resulting from recoveries of bad debt in the current year…
        </p>
        <p>
          Net income of $20.6 million and $9.9 million for the years ended December 31, 2020 and 2019, respectively,
          representing an <span className={classes.yellowclr}>increase</span> of 108%; and • Adjusted{' '}
          <span className={classes.yellowclr}>EBITDA</span> of $31.8 million and $24.7 million for the years ended
          December 31, 2020 and 2019…
        </p>
        <p>
          Example:
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('(gold OR silver OR copper) AND mining');
            }}>
            (gold OR silver OR copper) AND mining
          </span>
        </p>
        <p>Results</p>
        <p>
          1. As a <span className={classes.yellowclr}>silver</span> and <span className={classes.yellowclr}>gold</span>{' '}
          <span className={classes.yellowclr}>mining</span> company, we also use these statistics on an aggregate basis,
          aggregating the Greens Creek, Lucky Friday and San Sebastian mines, to compare our performance with that of
          other <span className={classes.yellowclr}>silver</span> mining companies, and aggregating Casa Berardi and
          Nevada Operations for comparison with other <span className={classes.yellowclr}>gold</span>
          mining companies.
        </p>
        <p>
          2. Estimates of the total ultimate closure and rehabilitation costs for <span>gol class='highlight'd</span>,{' '}
          <span className={classes.yellowclr}>silver</span>, <span className={classes.yellowclr}>copper</span>, zinc and
          lead <span className={classes.yellowclr}>mining</span>
          operations are significant and based principally on current legal and regulatory requirements and mine closure
          plans that may change materially.
        </p>
        <p>
          3. The Midas <span className={classes.yellowclr}>mining</span> district has historic{' '}
          <span className={classes.yellowclr}>gold</span>
          production dating as early as 1907.
        </p>
        <h4>Fuzzy Search ~</h4>
        <p>
          Fuzzy searches allow for approximate results for a search. A ‘~’ character after the search term executes
          fuzzy searching. The example below will display hits of “color” and words close to the spelling of color like
          “colors”, “colour”, “colon”, etc.
        </p>
        <p>
          Example:{' '}
          <span
            className={classes.clrBlue}
            onClick={() => {
              getText('color~');
            }}>
            color~
          </span>
        </p>
        <p>
          1. A kind of plagioclase mineral within the feldspar group with formula NaAlSi O 8 . Its{' '}
          <span className={classes.yellowclr}>colour</span> is white to grey.
        </p>
        <p>
          2. we do not approve for sale food known to contain artificial{' '}
          <span className={classes.yellowclr}>colors</span>, flavors, preservatives or sweeteners or partially
          hydrogenated or hydrogenated oils or phthalates or parabens, regardless of the proportion of its natural or
          organic ingredients
        </p>
        <p>
          3. Members of the investment team may also speak with business contacts who are industry experts who provide{' '}
          <span className={classes.yellowclr}>color</span> on industry and market trends, without discussing the
          specific investment opportunity.
        </p>
        <h4>Reserved Characters</h4>
        <p>{`1 The reserved characters are: + - = && || > < ! ( ) { } [  ]  ^   ' ~ * ? :  /`}</p>

        <p>
          That means these characters are reserved as operators. In order to search for these characters, a / must lead
          the character, like: 2 /+ 2 will display results of “2 +2”.
          <br />
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default TopicHelpPopupContent;
