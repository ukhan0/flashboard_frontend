import { Card } from "@material-ui/core";
import React, { useEffect } from 'react';

const HomePageEarningWatcher = () => {
    const factorsData = {
        "description": { "text": "Company Name" },
        "sscore": { "text": "Social Sentiment", "neg": "#c33f40", "pos": "#3fc380", "hover": "S-Score is a normalized representation over Twitter social sentiment over a lookback period" },
        "svscore": { "text": "Relative Tweet Vol", "neg": "#c33f40", "pos": "#3fc380", "hover": "SV-Score is a normalized representation over indicative Tweet Volume over a lookback period" },
        "svolume": { "text": "Tweet Volume", "hover": "S-Volume is a representation of indicative Tweet Volume over the past 24 hours" },
        "sdispersion": { "text": "Dispersion", "hover": "S-Dispersion represents the diversity of Twitter conversations. It is the percentage of conversations coming from unique Twitter users" }
    };

  const filter = 'svolume+gt+12';

    useEffect(() => {
        window.SMA.SMAEarningsWatchers({
            container: 'sma_warning_widget',
            width: '100%',
            height: '100%',
            title: 'Social Sentiment Earnings Watcher',
            apikey: 'eb521eaa75f8e0b28b88c81a6e272d9ee03f75ee',
            ontology: 'ticker',
            order: 'top',
            factor: factorsData,
            filters: filter,
            serverDomain: 'stocktwits',
            onItemClick: function (ticker, description) {
                // alert(ticker)
            }
        });
    }, [factorsData , filter]);


    return (
        <Card className="card-box mb-4" style={{ height: '100%' }}>
            <div className="card-header">
                <div className="card-header--title font-weight-bold drag-handle">Earnings Watcher</div>
            </div>
            <div style={{ height: '100%'}} id="sma_warning_widget">
            </div>
        </Card>
    );

}

export default HomePageEarningWatcher;
