import { Card } from "@material-ui/core";
import React, { useEffect } from 'react';

const HomePageAccountStock = () => {
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
            // type: 'SMA',
            // layoutColor: '999999',
            // tblRowColor: 'F9F9F9'
            // onItemClick: function(ticker){
            //   // alert('Hurray!!! Got '+ticker);
            // }
        });
    }, []);


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
