export const homepageWidgetsKey = 'homepageWidgets';
export const homepageGridLayoutKey = 'homepageGridLayout';

export const homePageWidgets = {
    homePageTable: { title: 'Recent Documents', show: true },
    homePageNotification: { title: 'Notifications', show: true },
    homePageSmaLime1: { title: 'Social Top Ten Stocks', show: true },
    homePageTweets: { title: 'Social Stream', show: true },
    homePageHeatMap: { title: 'Heat Map', show: false },
    homePageEarningWatcher: { title: 'Earnings Watcher', show: false },
    homePageAccountStock: { title: 'Accurate Account Stocks', show: false }

};

export const homePageWidgetlayout = {
    "lg": [
        {
            "w": 4,
            "h": 2,
            "x": 0,
            "y": 0,
            "i": "homePageTable",
            "maxH": 3,
            "moved": false,
            "static": false
        },
        {
            "w": 4,
            "h": 2,
            "x": 0,
            "y": 2,
            "i": "homePageNotification",
            "maxH": 3,
            "moved": false,
            "static": false
        },
        {
            "w": 4,
            "h": 2,
            "x": 4,
            "y": 0,
            "i": "homePageSmaLime1",
            "maxH": 3,
            "moved": false,
            "static": false
        },
        {
            "w": 4,
            "h": 2,
            "x": 4,
            "y": 2,
            "i": "homePageTweets",
            "maxH": 3,
            "moved": false,
            "static": false
        },
        {
            "w": 4,
            "h": 2,
            "x": 0,
            "y": 4,
            "i": "homePageHeatMap",
            "maxH": 3,
            "moved": false,
            "static": false
        }
    ],
    "xs": [
        {
            "w": 1,
            "h": 2,
            "x": 0,
            "y": 0,
            "minW": 1,
            "maxH": 3,
            "i": "homePageTable"
        },
        {
            "w": 1,
            "h": 2,
            "x": 0,
            "y": 2,
            "minW": 1,
            "maxH": 3,
            "i": "homePageNotification"
        },
        {
            "w": 1,
            "h": 2,
            "x": 0,
            "y": 4,
            "minW": 1,
            "maxH": 3,
            "i": "homePageSmaLime1"
        },
        {
            "w": 1,
            "h": 2,
            "x": 0,
            "y": 6,
            "minW": 1,
            "maxH": 3,
            "i": "homePageTweets"
        },
        {
            "w": 1,
            "h": 2,
            "x": 0,
            "y": 8,
            "minW": 1,
            "maxH": 3,
            "i": "homePageHeatMap"
        }
    ]
};
