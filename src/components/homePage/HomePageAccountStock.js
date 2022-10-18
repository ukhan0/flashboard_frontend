import { Card } from "@material-ui/core";
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setIsFromThemex } from '../../reducers/Topic';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';

const HomePageAccountStock = () => {
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
            if (company.recentId === undefined) {
                company = {};
            }

            dispatch(setIsFromThemex(false));
            dispatch(setSelectedWatchlist(company));
            dispatch(setSidebarToggle(false));
            dispatch(setSidebarToggleMobile(false));
        },
        [dispatch, completeCompaniesData, completeCompaniesDataGlobal]
    );

    useEffect(() => {
        window.SMA.SMAWebAccurateAccount({
            container: 'sma_account_stock_widget',
            width: '100%',
            height: '100%',
            apikey: 'a43ba9d17b54090fc5fd179ed7c427838ba0817f',
            dates: 'datetime+eq+recent',
            frequency: '1',
            sort: 'positive+desc',
            limit: 10,
            onItemClick: function (ticker) {
                if (ticker) {
                    setCompany(ticker);
                }
            }
        });
    }, [setCompany]);


    return (
        <Card className="card-box mb-4" style={{ height: '100%' }}>
            <div className="card-header">
                <div className="card-header--title font-weight-bold drag-handle">Accurate Account Stocks</div>
            </div>
            <div id="sma_account_stock_widget" style={{ height: '80%' }}>
            </div>
        </Card>
    );

}

export default HomePageAccountStock;
