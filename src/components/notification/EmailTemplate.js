import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { get } from 'lodash';
const EmailTemplate = () => {
  const history = useHistory();
  const { emailTemplate } = useSelector(state => state.Watchlist);
  if (!emailTemplate['emailTemplate']) {
    history.push('/watchlist');
  }
  return (
    <div className="bg-light pt-4">
      <Container className="py-3">
        <div className="card shadow-xxl mb-4">
          <div className="p-3 p-xl-5">
            <div class="d-flex card-header" >
              <div class="card-header--title font-size-md font-weight-bold py-2" style={{width:'100%',textAlign:'center'}}>
                {get(emailTemplate, 'title', null)}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <div dangerouslySetInnerHTML={{ __html: get(emailTemplate, 'emailTemplate', null) }}></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default EmailTemplate;
