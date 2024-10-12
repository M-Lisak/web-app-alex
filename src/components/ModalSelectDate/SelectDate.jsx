import React from 'react';
import { Button, List, Modal } from 'antd';

const SelectDate = (props) => {
  const { open, setOpen, setDate } = props

  const selectCity = (value) => {
    console.log("value", value)
    setDate(value)
    setOpen(false)
  }

  const data = [
    {title: 'date1'},
    {title: 'date2'},
    {title: 'date3'},
    {title: 'date4'},
    {title: 'date5'},
    {title: 'date6'},
    {title: 'date7'},
    {title: 'date8'},
    {title: 'date9'},
    {title: 'date10'},
  ]

  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      width={'100%'}
      height={'100%'}
    >
      <List
        className='select-city-list'
        grid={{column: 1, gutter: 40}}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button className='modal-button' onClick={() => selectCity(item.title)}>{item.title}</Button>
          </List.Item>
        )}
      />    
    </Modal>
  )
};

export default SelectDate;