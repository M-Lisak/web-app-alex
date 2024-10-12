import { useEffect, useState } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import { Form, Select } from 'antd'
import SelectCity from './components/ModalSelectCity/SelectCity'
import SelectDate from './components/ModalSelectDate/SelectDate'

//нахуй кнопку назад, она всё равно не будет использоваться, вместо этого сделаем внутреннюю маршрутизацию, по внутренним кнопкам

function App() {
  const {tg} = useTelegram()
  const [ openSelectCity, setOpenSelectCity ] = useState(false)
  const [ openSelectDate, setOpenSelectDate ] = useState(false)
  const [ form ] = Form.useForm()
  const [ city, setCity ] = useState('')
  const [ date, setDate ] = useState('')

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
    // tg.enableClosingConfirmation()
  }, [tg])

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