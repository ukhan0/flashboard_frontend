import React, { useMemo, useEffect } from 'react';
import HomePageTable from './HomePageTable';
import HomePageNotification from './HomepageNotification';
import HomePageSmaLime1 from './HomePageSmaLime1';
import HomePageTweets from './HomePageTweets';
import HomePageHeatMap from './HomePageHeatMap';
import HomePageEarningWatcher from './HomePageEarningWatcher';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { homepageGridLayoutKey, homePageWidgetlayout } from './homePageConfig';
import HomePageAccountStock from './HomePageAccountStock';

const ResponsiveGridLayout = WidthProvider(Responsive);

const HomeGridLayout = ({ enableDragResizeWidgets, drawerSelectedWidget }) => {
  const handleLayoutChange = (layout, layouts) => {
    localStorage.setItem(homepageGridLayoutKey, JSON.stringify(layouts));
  };

  const getLayouts = () => {
    const savedLayouts = localStorage.getItem(homepageGridLayoutKey);
    return savedLayouts ? JSON.parse(savedLayouts) : homePageWidgetlayout;
  };

  const getComponent = name => {
    let component;
    switch (name) {
      case 'homePageTable':
        component = <HomePageTable />;
        break;

      case 'homePageNotification':
        component = <HomePageNotification />;
        break;

      case 'homePageSmaLime1':
        component = <HomePageSmaLime1 />;
        break;

      case 'homePageTweets':
        component = <HomePageTweets />;
        break;

      case 'homePageHeatMap':
        component = <HomePageHeatMap />;
        break;

      case 'homePageEarningWatcher':
        component = <HomePageEarningWatcher />;
        break;

      case 'homePageAccountStock':
        component = <HomePageAccountStock />;
        break;

      default:
        component = <div>No Widget </div>;
    }

    return component;
  };

  const componentRender = useMemo(() => {
    return drawerSelectedWidget.map((item, index) => {
      return { ...item, component: getComponent(item.name) };
    });
  }, [drawerSelectedWidget]);

  const layoutScroll = () => {
    let widgetScroll = componentRender[componentRender.length - 1];
    if (widgetScroll) {
      const drawerExtraHeight = 100;
      widgetScroll = document.getElementById(widgetScroll.name)
      let drawerHeader = document.getElementById('widget-drawer-container')
      drawerHeader = drawerHeader ? drawerHeader.offsetHeight + drawerExtraHeight : 100 + drawerExtraHeight;
      let topOfElement;

      if (componentRender.length >= 2) {
        topOfElement = window.pageYOffset + widgetScroll.getBoundingClientRect().top - drawerHeader
      } else {
        topOfElement = widgetScroll.getBoundingClientRect().top - 200
      }

      window.scroll({ top: topOfElement, behavior: "smooth" });
    }
  }

  useEffect(() => {
    // scroll layout when widget selection updated
    layoutScroll();
  }, [componentRender])


  return (
    <ResponsiveGridLayout
      containerPadding={[0, 4]}
      layouts={getLayouts()}
      breakpoints={{ lg: 1200, xs: 0 }}
      cols={{ lg: 8, xs: 1 }}
      rowHeight={300}
      width={'100%'}
      onLayoutChange={handleLayoutChange}
      draggableHandle={'.drag-handle'}
      margin={[10, 10]}
      compactType={'vertical'}
      resizeHandles={['se']}
      autoSize={true}
      isDraggable={enableDragResizeWidgets}
      isResizable={enableDragResizeWidgets}
    >
      {componentRender.map((item, index) => {
        return (
          <div
            id={item.name}
            key={item.name}
            data-grid-id={item.name}
            data-grid={{ x: 8, y: componentRender.length > 1 ? componentRender.length * 2 : 0, w: 4, h: 2 }}>
            {item.component}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}

export default HomeGridLayout;
