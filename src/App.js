import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import { Button, Form, InputNumber, Select, Tag } from 'antd'
import SelectCity from './components/ModalSelectCity/SelectCity'
import SelectDate from './components/ModalSelectDate/SelectDate'
import { Iconfa } from './iconsadsad'
import { useNavigate } from 'react-router-dom'

//нахуй кнопку назад, она всё равно не будет использоваться, вместо этого сделаем внутреннюю маршрутизацию, по внутренним кнопкам

const CURRENCY = {
  rub: 'RUB',
  usdt: 'USDT'
}

function App() {
  const {tg} = useTelegram()
  const [ openSelectCity, setOpenSelectCity ] = useState(false)
  const [ openSelectDate, setOpenSelectDate ] = useState(false)
  const [ form ] = Form.useForm()
  const [ city, setCity ] = useState('')
  const [ date, setDate ] = useState('')
  const [ currencyGive, setCurrencyGive ] = useState(CURRENCY.rub)
  const [ currencyGet, setCurrencyGet ] = useState(CURRENCY.usdt)
  const [ valueInt, setValueInt ] = useState(null)
  const [ exchangeRate, setExchangeRate ] = useState(0.234)
  const navigate = useNavigate()

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

  const convertCurrency = () => {
    setCurrencyGive(prev => prev === CURRENCY.rub ? CURRENCY.usdt : CURRENCY.rub)
    setCurrencyGet(prev => prev === CURRENCY.rub ? CURRENCY.usdt : CURRENCY.rub)
    setExchangeRate(prev => currencyGive === CURRENCY.rub ? 0.124 : 124)
  }

  const onChangeValue = (value) => {
      setValueInt(value)
  }

  const exchangeRateCalc = (value) => {
    return (value * exchangeRate).toFixed(2)
  }

  const submitForm = useCallback(async => {
    form.validateFields()
        .then(() => {
          //сохраняем данные, и переходим к другой странице
          //так же нужно добавить breadcrumbs(в идеале кнопку назад в тг))))))
          console.log('success', form.getFieldsValue())
          navigate('/user')
        })
        // eslint-disable-next-line
  }, [form])

  return (
    <div className="app">
      <Form form={form} name='app' layout='vertical'>
        <Form.Item label="Город" /* required */>
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
                >{currencyGive}</Tag>
                Отдаёте
              </div>
              <InputNumber
                className='app-exchange-input'
                controls={false}
                value={valueInt}
                onChange={onChangeValue}
                onPressEnter={(e) => e?.target?.blur()}
              />
            </div>
            <div className='app-exchange-icon' onClick={convertCurrency}>
              <Iconfa />
            </div>
            <div className='app-exchange-get'>
              <div className='app-exchange-left'>
                <Tag
                  className='app-exchange-tag'
                >{currencyGet}</Tag>
                Получаете
              </div>
              <span className='app-exchange-get-val'>{exchangeRateCalc(valueInt)}</span>
            </div>
          </div>
        </Form.Item>

        <div className='exchange-rate'>{`1 ${currencyGet} = ${exchangeRate} ${currencyGive}`}</div>

        <Form.Item>
          <Button className='submit-button' onClick={submitForm}>Обмен</Button>
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