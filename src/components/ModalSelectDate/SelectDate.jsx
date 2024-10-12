import React from 'react';
import { Modal } from 'antd';

const SelectDate = (props) => {
  const { open, setOpen } = props

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={true}
    >
            asdfasdfasdf
            asdfasdfasdfasd
            asdfasdfasdfasdf
            asdf
    </Modal>
  )
};

export default SelectDate;