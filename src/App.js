import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram.js'
import { Button, DatePicker, Form, InputNumber, Select, Tag } from 'antd'
import { IconEx } from './iconEx.jsx'
import { useNavigate } from 'react-router-dom'
import { IconExRight } from './iconExRight.jsx'
import { CITIES, CURRENCY_RUB, CURRENCY_USDT } from './constants.js'
// import { getExchangeRate } from './garantex/index.js'
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
  const [ exchangeRate, setExchangeRate ] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

  useEffect(() => {
    (async() => {
      //запускается при каждой смене RUB/USDT
      console.log('запустилось')
      var rate
      try {
        const {data} = await axios.get(`https://excnum.best:8443/api/rates?value=${1000000}`)
        if(data) {
          rate = data
        }
        
      } catch (e) {
        console.log('getRates error', e)
      }
      console.log('rate', rate)
      setExchangeRate(currencyGive === 'RUB' ? Number(rate?.asks.toFixed(2) || 0) : Number(rate?.bids.toFixed(2) || 0))//или наоборот

    })()
  }, [currencyGive])

  const convertCurrency = () => {
    setCurrencyGive(prev => prev === RUB ? USDT : RUB)
    setCurrencyGet(prev => prev === RUB ? USDT : RUB)
  }

  const onChangeValue = (value) => {
      setValueInt(value)
  }

  const exchangeRateCalc = (value) => {
    return (value * exchangeRate).toFixed(2)
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
          //так же нужно добавить breadcrumbs(в идеале кнопку назад в тг))))))
          console.log('success', form.getFieldsValue())
          navigate('/user')
        })
        // eslint-disable-next-line
  }, [form])

  const disabled1WeekDate = (current) => {
    return current && (current < dayjs().startOf('day') || current > dayjs().add(7, 'day').endOf('day'))
  }

  const disabledDateTime = (current) => ({
    disabledHours: () => dayjs(current).get('D') === dayjs().get('D')
      ? range(0, dayjs().get('h') + 1).concat(range(21, 24))
      : range(0, 8).concat(range(21, 24)),
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  });

  const onOk = (value) => {
    console.log('установить в форму значения ', value)
  }

  return (
    <div className="app">
      <Form form={form} name='app' layout='vertical'>
        <Form.Item label="Город" /* required */>
          <Select
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={CITIES}
          />
        </Form.Item>
        <Form.Item label="Дата и время">
          <DatePicker 
            showTime={{
              format:'HH'
            }}
            showNow={false}
            disabledDate={disabled1WeekDate}
            disabledTime={disabledDateTime}
            onChange={(value, dateString) => {
              console.log('Selected Time: ', value);
              console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
          />
        </Form.Item>
        {/* в label закинуть JSX, чтобы справа отображался значок обмена */}
        <Form.Item className='app-exchange-label' label={<div className='app-exchange-title'><span>Обмен</span><IconExRight /></div>}>
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
              <IconEx />
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
    </div>
  )
}

export default App