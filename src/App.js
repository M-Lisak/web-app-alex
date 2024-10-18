import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram.js'
import { Button, DatePicker, Form, InputNumber, Select, Tag } from 'antd'
import { IconEx } from './iconEx.jsx'
import { useNavigate } from 'react-router-dom'
import { IconExRight } from './iconExRight.jsx'
import { CITIES, CURRENCY_RUB, CURRENCY_USDT } from './constants.js'
import axios from 'axios'
import dayjs from 'dayjs'

//нахуй кнопку назад, она всё равно не будет использоваться, вместо этого сделаем внутреннюю маршрутизацию, по внутренним кнопкам

function App() {
  const RUB = CURRENCY_RUB
  const USDT = CURRENCY_USDT
  const {tg} = useTelegram()
  const [ form ] = Form.useForm()
  const [ currencyGive, setCurrencyGive ] = useState(RUB)
  const [ currencyGet, setCurrencyGet ] = useState(USDT)
  const [ valueInt, setValueInt ] = useState(null)
  const [ valueConv, setValueConv ] = useState(0)
  const [ asks, setAsks ] = useState(0)
  const [ bids, setBids ] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

  useEffect(() => {
    (async() => {
      var rate = null
      try {
        const {data} = await axios.get(`https://excnum.best:8443/api/rates?value=${1000000}`)
        if(data) {
          rate = data
        }
        
      } catch (e) {
        console.log('getRates error', e)
        rate = {asks: 101, bids: 102}
      }

      setAsks(rate.asks)
      setBids(rate.bids)
    })()
    // eslint-disable-next-line
  }, [])

  const convertCurrency = () => {
    setCurrencyGive(prev => prev === RUB ? USDT : RUB)
    setCurrencyGet(prev => prev === RUB ? USDT : RUB)
    //меняем местами
    setValueInt(valueConv || 0)
    setValueConv(currencyGive === RUB ? (valueInt / asks).toFixed() : (valueInt * bids).toFixed(2))
  }

  const onChangeValue = (value) => {
      setValueInt(value)
      setValueConv(currencyGive === RUB ? (value / asks).toFixed(2) : (value * bids).toFixed(2))
  }

  const range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  const submitForm = useCallback(async => {
    form.validateFields()
        .then(() => {
          //сохраняем данные, и переходим к другой странице
          //так же нужно добавить breadcrumbs(в идеале кнопку назад в тг)
          navigate('/user', { state: {
            city: form.getFieldValue('city'),
            date: dayjs(form.getFieldValue('date')).format('DD.MM.YYYY в HH'),
            value: form.getFieldValue('inputValue'),
            valueConv: valueConv,
            rates: currencyGive === "RUB" ? asks : bids,
            currency: currencyGive
          }})
        })
        .catch((e) => {
          console.log('e', e)
        })
        // eslint-disable-next-line
  }, [form, valueConv, currencyGive, asks, bids])

  const disabled1WeekDate = (current) => {
    return current && (current < dayjs().startOf('day') || current > dayjs().add(7, 'day').endOf('day'))
  }

  const disabledDateTime = (current) => ({
    disabledHours: () => dayjs(current).get('D') === dayjs().get('D')
      ? range(0, dayjs().get('h') + 1).concat(range(21, 24))
      : range(0, 8).concat(range(21, 24)),
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  })

  const goToHelp = () => {
    navigate('/help')
  }

  const goToFAQ = () => {
    navigate('faq')
  }

  return (
    <div className="app">
      <Form form={form} name='app' layout='vertical'>
        <Form.Item label="Город" name='city' rules={[{required: true, message: 'Поле обязательно для заполнения'}]}>
          <Select
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={CITIES}
          />
        </Form.Item>
        <Form.Item label="Дата и время" name='date' rules={[{required: true, message: 'Поле обязательно для заполнения'}]}>
          <DatePicker 
            showTime={{
              format:'HH'
            }}
            showNow={false}
            disabledDate={disabled1WeekDate}
            disabledTime={disabledDateTime}
            // onOk={onOk}
          />
        </Form.Item>
        {/* в label закинуть JSX, чтобы справа отображался значок обмена */}
        <Form.Item
          name="inputValue"
          className='app-exchange-label'
          label={<div className='app-exchange-title'><span>Обмен</span><IconExRight /></div>}
          rules={[{required: true, message: 'Поле обязательно для заполнения'}]}
        >
          <div className='app-exchange'>
            <div className='app-exchange-give'>
              <div className='app-exchange-left'>
                <Tag
                  className='app-exchange-tag'
                >{currencyGive}</Tag>
                Отдаёте
              </div>
              <InputNumber
                min={currencyGive === RUB ? 1000000 : 10000}//в зависимости от валюты берем значение
                max={currencyGive === RUB ? 5000000 : 50000}//в зависимости от валюты берем значение
                className='app-exchange-input'
                controls={false}
                value={valueInt}
                onChange={onChangeValue}
                onPressEnter={(e) => e?.target?.blur()}
              />
            </div>
            <div className='app-exchange-icon' onClick={convertCurrency}>
              <IconEx />
            </div>
            <div className='app-exchange-get'>
              <div className='app-exchange-left'>
                <Tag
                  className='app-exchange-tag'
                >{currencyGet}</Tag>
                Получаете
              </div>
              <span className='app-exchange-get-val'>{valueConv}</span>
            </div>
          </div>
        </Form.Item>

        <div className='exchange-rate'>{`1 USDT = ${(currencyGive === RUB ? asks : bids).toFixed(2)} RUB`}</div>

        <Form.Item>
          <Button className='submit-button' onClick={submitForm}>Обмен</Button>
        </Form.Item>

      </Form>

      <div className='footer-help'><span onClick={goToHelp}>Поддержка в Telegram</span></div>
      <div className='faq'><span onClick={goToFAQ}>О нас</span></div>

    </div>
  )
}

export default App