import React from 'react';
import { Button, List, Modal } from 'antd';

const SelectCity = (props) => {
  const { open, setOpen } = props

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const data = [
    {title: 'city1'},
    {title: 'city2'},
    {title: 'city3'},
    {title: 'city4'},
    {title: 'city5'},
    {title: 'city6'},
    {title: 'city7'},
    {title: 'city8'},
    {title: 'city9'},
    {title: 'city10'},
    {title: 'city11'},
    {title: 'city12'},
    {title: 'city13'},
    {title: 'city14'},
    {title: 'city15'},
  ]

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={true}
      footer={null}
      width={'100%'}
    >
      <List
        className='select-city-list'
        grid={{column: 3}}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button>{item.title}</Button>
          </List.Item>
        )}
      />    
    </Modal>
  )
};

export default SelectCity;