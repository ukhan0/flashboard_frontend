import Card from '@material-ui/core/Card';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setIsFromThemex } from '../../reducers/Topic';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';

const HomePageEarningWatcher = () => {
    const dispatch = useDispatch();
    const { completeCompaniesData, completeCompaniesDataGlobal } = useSelector(state => state.Watchlist);

    const setCompany = useCallback(
        async ticker => {
            let company = await getCompanyByIndex(ticker, completeCompaniesData, completeCompaniesDataGlobal);

            if (company) {
                let last10k = new Date(company['last10k']);
                let last10q = new Date(company['last10q']);
                company.recentId = last10k > last10q ? company.recentId10k : company.recentId10q;
            }

            // if recent id not set
            if (company.recentId === undefined || company.recentId === null) {
                company = {};
            }

            dispatch(setIsFromThemex(false));
            dispatch(setSelectedWatchlist(company));
            dispatch(setSidebarToggle(false));
            dispatch(setSidebarToggleMobile(false));
        },
        [dispatch, completeCompaniesData, completeCompaniesDataGlobal]
    );

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
            apikey: '907cdf5f789e613d36f0b4dda38930fb1dc590bf',
            customCSS:'.box-frame,body{background: #fff;}.Table-holder h2,.Table-holder h1,.box-frame h3{color: #000;}.bg-grey{background: #fff;} .tooltip{background:#fff; color:#000} .scroll-box li:hover {background:#03a9f433} .longEnough{height:92%;max-height:92%;} .scrollOnMobile {height:104%;} .text-center.heading-area {display: none;} .slick-slider .slick-next, .slick-slider .slick-prev{background-color: rgb(0 0 0 / 50%);} .next-call {background-color: #ffedb1;border: 1px solid #b7a408; margin: 5px 0px;}',
            ontology: 'ticker',
            order: 'top',
            factor: factorsData,
            filters: filter,
            serverDomain: 'stocktwits',
            onItemClick: function (ticker) {
                if (ticker) {
                    setCompany(ticker);
                }
            }
        });
    }, [factorsData, filter, setCompany]);


    return (
        <Card className="card-box mb-4" style={{ height: '100%' }}>
            <div className="card-header">
                <div className="card-header--title font-weight-bold drag-handle">Earnings Watcher</div>
            </div>
            <div style={{ height: 'calc(100% - 60px)', overflow: 'hidden' }} id="sma_warning_widget">
            </div>
            <div className="card-footer"></div>
        </Card>
    );

}

export default HomePageEarningWatcher;
