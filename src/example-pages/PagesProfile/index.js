import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import PagesProfileContent from '../../example-components/PagesProfile/PagesProfileContent';
export default function PagesProfile() {
  return (
    <Fragment>
      <PageTitle titleHeading="Sentiment" titleDescription="" />

      <PagesProfileContent />
    </Fragment>
  );
}
