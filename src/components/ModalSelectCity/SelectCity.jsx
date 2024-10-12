import React from 'react';
import { Button, List, Modal } from 'antd';

const SelectCity = (props) => {
  const { open, setOpen, setCity } = props

  const selectCity = (value) => {
    console.log("value", value)
    setCity(value)
    setOpen(false)
  }

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
      closable={false}
      footer={null}
      width={'100%'}
      height={'100%'}
    >
      <List
        className='select-city-list'
        grid={{column: 2, gutter: 40}}
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

export default SelectCity;