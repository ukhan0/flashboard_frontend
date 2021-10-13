import React from 'react';
import Button from '@material-ui/core/Button';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Dialog from '../shared/dialog';
import TopicHelpPopupContent from './TopicHelpPopupContent';

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
        titleVariant={'h4'}
        titleColor={'black'}
        isOpen={open}
        onClose={handleClose}
        title={'Filings Flash Smart Search Operators'}
        size={'lg'}>
        <TopicHelpPopupContent onClose={handleClose} />
      </Dialog>
    </div>
  );
}
