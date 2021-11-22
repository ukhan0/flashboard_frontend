import React from 'react';
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
      <ContactSupportIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleClickOpen();
        }}
        variant="outlined"
        color="primary"
      />

      <Dialog
        titleVariant={'h4'}
        titleColor={'black'}
        isOpen={open}
        onClose={handleClose}
        title={'Unstructured Data Terminal Smart Search Operators'}
        size={'lg'}>
        <TopicHelpPopupContent onClose={handleClose} />
      </Dialog>
    </div>
  );
}
