import React from 'react';
import Button from '@material-ui/core/Button';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Dialog from '../shared/dialog';

export default function TopicHelpPopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleClickOpen();
        }}>
        <ContactSupportIcon variant="outlined" color="primary" />
      </Button>
      <Dialog
        isOpen={open}
        onClose={handleClose}
        title={<h5>Filings Flash Smart Search Operators</h5>}
        children={
          <div style={{ height: '400px' }}>
            <h5>OR</h5>
            <p>
              An “OR” statement will display all documents that contain either/any of the words listed. The example
              below of “silver OR gold” will display all documents containing “silver” and all documents containing
              “gold” within the filings universe selected. The syntax || and OR are interchangeable. (Note: Smart
              synonyms are added as ORs)
            </p>
            <p>Example: silver OR gold silver || gold</p>
            <p>Results: </p>
            <h5>AND</h5>
            <p>
              An “AND” statement will display all documents that contain both/ all words listed. The example below of
              “silver AND gold” will display documents that contain both “silver” and “gold” anywhere in the document.
              The syntax && and AND are interchangeable.
            </p>
            <p>Example: silver AND gold silver && gold</p>
            <p>Results: </p>
            <p>
              Metals Prices Changes in the market prices of silver, gold, lead and zinc can significantly affect our
              profitability and cash flow.{' '}
            </p>
            <p>AND, OR and NOT (also written &&, || and !) </p>
            <h5>NOT</h5>
            <p>
              A “NOT” will exclude contexts which include the “NOT” term. The example below of will display all contexts
              which contain “gold” unless it also contains “silver”. The syntax NOT, - and ! are interchangeable.
            </p>
            <p>Example: gold NOT silver gold !silver gold -silver </p>
            <p>Results: </p>
            <p>
              1.Our estimates of proven and probable reserves are based on the prices of $1,300 per gold ounce for 2020
              and 2019 and $1,200 per gold ounce for underground reserves and $1,225 for open pit reserves for 2018.
            </p>
            <h5>Must Have</h5>
            <p>
              A + statement means that the term must be in the document. The example below will display all documents
              that contain “gold” and also display the hits of “silver” within the documents that contain “gold”.
            </p>
            <p>Example: +gold OR silver</p>
            <p>
              1. Metals Prices Changes in the market prices of silver, gold, lead and zinc can significantly affect our
              profitability and cash flow. 2. Our estimates of proven and probable reserves are based on the prices of
              $1,300 per gold ounce for 2020 and 2019 and $1,200 per gold ounce for underground reserves and $1,225 for
              open pit reserves for 2018.
            </p>
            <h5>WILDCARDS</h5>

            <p>
              Wildcards are a substitute for zero or more characters. A ? replaces a single character. A * replaces zero
              or more characters. The examples are explained below.
            </p>
            <p>
              Example: ebit?? Will display all results of words that start with “ebit” and end with exactly 2 more
              letters.
            </p>
            <p>Results:</p>
            <p>
              1. Adjusted EBITDA and Non-GAAP net income (loss) are not measures of our financial performance under GAAP
              and should not be considered as alternatives to net income (loss), operating income (loss), or any other
              measures derived in accordance with GAAP.
            </p>
            <p>Example: Ebit*</p>
            <p>
              Will display all results of words that start with “ebit”. “EBITDAre” will appear in this search and not
              the previous search because there are three letters after “ebit”.{' '}
            </p>
            <p>Results:</p>
            <p>
              1.Adjusted EBITDA and Non-GAAP net income (loss) are not measures of our financial performance under GAAP
              and should not be considered as alternatives to net income (loss), operating income (loss), or any other
              measures derived in accordance with GAAP.
            </p>
            <p>
              {' '}
              2.  Calculated as LQA Adjusted EBITDAre as of 3/31/21, further adjusted for executed-but-not-yet-commenced
              leases, disposition pipeline totaling $54.3 million in gross proceeds…
            </p>
            <p>Example: dr?g</p>
            <p>Will display all results that start with “dr”, end with “g” and are separated by exactly one letter.</p>
            <p>Results:</p>
            <p>
              1.Since a 2010 U.S. Court of Appeals decision, the Food and Drug Administration (FDA”) is permitted to
              regulate electronic cigarettes as “tobacco products” under the Family Smoking Prevention and the Tobacco
              Control Act.
            </p>
            <p>
              2.  The editor is accessible on Windows, Mac and Linux operating systems and enables creators to drag and
              drop content, such as images, textures, 3D meshes and sounds, into a virtual workspace.
            </p>
            <p>Example: dr*g</p>
            <p>
              Will display all results that start with “dr” and end with “g”. “Dropping” will appear in this search but
              not in the previous search because there is more than one letter between “dr” and the “g”. “DRG” will also
              appear in this search and not in the previous because * can also be 0 characters.
            </p>
            <p>Results:</p>
            <p>
              1. Since a 2010 U.S. Court of Appeals decision, the Food and Drug Administration (FDA”) is permitted to
              regulate electronic cigarettes as “tobacco products” under the Family Smoking Prevention and the Tobacco
              Control Act.
            </p>
            <p>
              2. The editor is accessible on Windows, Mac and Linux operating systems and enables creators to drag and
              drop content, such as images, textures, 3D meshes and sounds, into a virtual workspace.
            </p>
            <p>
              3.his action was in response to the reserve ratio dropping to 1.30 percent primarily due to the inflow of
              more than $1 trillion in estimated insured deposits in the first six month of 2020 resulting mainly from
              the pandemic, monetary policy actions, direct government assistance and an overall reduction in spending.
            </p>
            <p>
              4.Also driving the increase was a specific reserve on one loan totaling $2.1 million at December 31,
              2020. 
            </p>
            <p>
              5.Each DRG or APC is associated with a level of payment and may be adjusted from time to time, usually
              annually.
            </p>
            <h5>Proximity Search</h5>
            <p>
              Proximity search allows for searching for words within a certain distance of each other. The syntax
              follows, “word1 word2”~x where world1 and word2 are separated by a space and are both in quotes followed
              by a ~ then a number (x). The number (x) represents the number of words that can separate the two words
              within the quotes. The example below will display all documents when “increase” and “ebitda” are separated
              by 5 words or less.
            </p>
            <p>(Note: Other functions such as wildcards, grouping, ORs etc. do not work within a proximity search)</p>
            <p>Example: “increase ebitda”~5</p>
            <p>
              1. The First Amendment, among other things, amended the TRP Revolver to (a) increase the maximum
              percentage of Consolidated EBITDA attributable to Material Project EBITDA Adjustments from 20% to 30%
            </p>
            <p>
              2. An increase in the Market/EBITDA multiple, in isolation, net of adjustments, would result in an
              increase in a fair value measurement. 
            </p>
            <h5>Grouping ()</h5>
            <p>
              Multiple terms can be grouped together using parentheses. This allows for an array of different
              conditional searches. The first example will display documents where both “increase” and “ebitda” are
              within 5 words and where “decrease” and “debt” are within 5 words. The second example will display
              documents that mention “mining” and at least one of the three metals: silver, gold or copper. Example:
              ("increase ebitda"~5) AND ("decrease debt"~5)
            </p>
            <p>Results: </p>
            <p>
              {' '}
              1. The decrease in general and administrative expense was primarily due to a $1.2 million decrease in
              bad debt expense resulting from recoveries of bad debt in the current year… Net income of $20.6 million
              and $9.9 million for the years ended December 31, 2020 and 2019, respectively, representing an increase of
              108%; and • Adjusted EBITDA of $31.8 million and $24.7 million for the years ended December 31, 2020 and
              2019…
            </p>
            <p>Example: (gold OR silver OR copper) AND mining</p>
            <p>Results</p>
            <p>
              1.As a silver and gold mining company, we also use these statistics on an aggregate basis, aggregating the
              Greens Creek, Lucky Friday and San Sebastian mines, to compare our performance with that of other silver
              mining companies, and aggregating Casa Berardi and Nevada Operations for comparison with other gold mining
              companies. 
            </p>
            <p>
              2.Estimates of the total ultimate closure and rehabilitation costs for gold, silver, copper, zinc and
              lead mining operations are significant and based principally on current legal and regulatory requirements
              and mine closure plans that may change materially.
            </p>
            <p>3.The Midas mining district has historic gold production dating as early as 1907.</p>
            <h5>Fuzzy Search ~</h5>
            <p>
              Fuzzy searches allow for approximate results for a search. The example below will display hits of “color”
              and words close to the spelling of color like “colors”, “colour”, “colon”, etc.
            </p>
            <p>Example: color~</p>
            <p>
              The reserved characters are: + - = = && || {'> < ! '} ( ) {} [ ] ^ " ~ * ? : \ / That means these
              characters are reserved as operators. In order to search for these characters, a / must lead the
              character, like: 2 /+ 2 will display results of “2 +2”
            </p>
          </div>
        }
        size={'sm'}
      />
    </div>
  );
}
