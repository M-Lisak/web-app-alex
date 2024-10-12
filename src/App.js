import { useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import { Button, Form, Input, Select, Tag } from 'antd'
import SelectCity from './components/ModalSelectCity/SelectCity'
import SelectDate from './components/ModalSelectDate/SelectDate'
import { Iconfa } from './iconsadsad'

//нахуй кнопку назад, она всё равно не будет использоваться, вместо этого сделаем внутреннюю маршрутизацию, по внутренним кнопкам

function App() {
  const {tg} = useTelegram()
  const [ openSelectCity, setOpenSelectCity ] = useState(false)
  const [ openSelectDate, setOpenSelectDate ] = useState(false)
  const [ form ] = Form.useForm()
  const [ city, setCity ] = useState('')
  const [ date, setDate ] = useState('')
  const [ currencyGive, setCurrencyGive ] = useState('RUB')
  const [ currencyGet, setCurrencyGet ] = useState('USDT')

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

  const changeCurrencyGive = () => {
    setCurrencyGive('RUB1')
  }

  const changeCurrencyGet = () => {
    setCurrencyGet('USDT1')
  }

  return (
    <div className="app">
      <Form form={form} name='app' layout='vertical'>
        <Form.Item label="Город">
          <Select
            onClick={() => setOpenSelectCity(true)}
            value={city}
            open={false}
            // suffixIcon
          />
        </Form.Item>
        <Form.Item label="Дата и время">
          <Select
            onClick={() => setOpenSelectDate(true)}
            value={date}
            open={false}
          />
        </Form.Item>
        {/* в label закинуть JSX, чтобы справа отображался значок обмена */}
        <Form.Item label="Обмен">
          <div className='app-exchange'>
            <div className='app-exchange-give'>
              <div className='app-exchange-left'>
                <Tag
                  className='app-exchange-tag'
                  onClick={changeCurrencyGive}
                >{currencyGive}</Tag>
                Отдаёте
              </div>
              <Input className='app-exchange-input'/>
            </div>
            <div className='app-exchange-icon'>
              <Iconfa />
            </div>
            <div className='app-exchange-get'>
              <div className='app-exchange-left'>
                <Tag
                  className='app-exchange-tag'
                  onClick={changeCurrencyGet}
                >{currencyGet}</Tag>
                Получаете
              </div>
              {'123123'}
            </div>
          </div>
        </Form.Item>

        <div className='exchange-rate'>{'курс'}</div>

        <Form.Item>
          <Button className='submit-button'>Обмен</Button>
        </Form.Item>

      </Form>

      <SelectCity
        open={openSelectCity}
        setOpen={setOpenSelectCity}
        setCity={setCity}
      />
      <SelectDate
        open={openSelectDate}
        setOpen={setOpenSelectDate}
        setDate={setDate}
      />
    </div>
  )
}

export default App