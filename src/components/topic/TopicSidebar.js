import React, { Fragment } from 'react';
import SidebarMenu from '../../layout-components/SidebarMenu';

import navItems from './TopicNavItems';
const TopicSidebar = () => {
  const sidebarMenuContent = (
    <div>
      {navItems.map(list => (
        <SidebarMenu style={{ height: 450 }} component="div" key={list.label} pages={list.content} title={list.label} />
      ))}
    </div>
  );

  return <Fragment>{sidebarMenuContent}</Fragment>;
};

export default TopicSidebar;
