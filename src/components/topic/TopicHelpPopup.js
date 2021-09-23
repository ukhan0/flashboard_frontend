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
      <Dialog isOpen={open} onClose={handleClose} title={<h5>Filings Flash Smart Search Operators</h5>} size={'sm'}>
        <TopicHelpPopupContent />
      </Dialog>
    </div>
  );
}
