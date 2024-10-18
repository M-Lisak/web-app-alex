import { Button, Form, Input, InputNumber } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CITIES, CURRENCY_RUB, CURRENCY_USDT } from '../../constants'
import './UserForm.css'

export const onPressEnter = (e) => {
    const eventForm = e.target.form
    const index = [...eventForm].indexOf(e.target)
    console.log('index', index)
    eventForm[index + 1].focus()
    e.preventDefault()
}

const UserForm = () => {
    const ref = useRef()
    const [form] = Form.useForm()
    const [phone, setPhone] = useState(null)
    const [height, setHeight] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    const state = location?.state

    const onChangePhone = (val) => {
        setPhone(val)
    }

    const submitForm = useCallback(async => {
        form.validateFields()
            .then(() => {
              //сохраняем данные, и переходим к другой странице
              //так же нужно добавить breadcrumbs(в идеале кнопку назад в тг))))))
            //   console.log('success', form.getFieldsValue())
              navigate('/success')
            })
            // eslint-disable-next-line
    }, [form])

    const onFocus = (e) => {
        const currentHeight = ref.current.clientHeight
        setHeight(currentHeight + 300)//хз сколько нужно добавлять(клавиатуры могут быть разные)
        e?.target?.scrollIntoView({behavior: 'smooth' , block: 'end'})
    }

    return (
        <div className='form' ref={ref} style={{height: height ? height : '100vh'}}>
            <div className='user-form-info'>
                <h4>Заявка на обмен</h4>
                <div className='user-form-info-wrapper'>
                    <div className='user-form-info-left'>
                        <div className='user-form-info-sub-item'>
                            <span>{`Отдаете ${state.currency || ''}`}</span>
                            <b>{state?.value || ''}</b>
                        </div>
                        <div className='user-form-info-sub-item'>
                            <span>{`Получаете ${state.currency === CURRENCY_RUB ? CURRENCY_USDT : CURRENCY_RUB}`}</span>
                            <b>{state?.valueConv || ''}</b>
                        </div>
                        <div className='user-form-info-sub-item'>
                            <span>Курс</span>
                            <b>{state?.rates || ''}</b>
                        </div>
                    </div>
                    <div className='user-form-info-right'>
                        <div className='user-form-info-sub-item'>
                            <span>Дата и время</span>
                            <b>{state?.date || ''}</b>
                        </div>
                        <div className='user-form-info-sub-item'>
                            <span>Город</span>
                            <b>{CITIES.find(el => el.value === state?.city)?.label || ''}</b>
                        </div>
                    </div>
                </div>
            </div>
           <Form form={form} name='user' layout='vertical'>
                <Form.Item label="Фамилия" name="lastName">
                    <Input onPressEnter={onPressEnter}/>
                </Form.Item>
                <Form.Item label="Имя">
                    <Input onPressEnter={onPressEnter}/>
                </Form.Item>
                <Form.Item label="Отчество">
                    <Input onPressEnter={onPressEnter}/>
                </Form.Item>
                <Form.Item label="Номер телефона">
                    <InputNumber
                        controls={false}
                        value={phone}
                        onChange={onChangePhone}
                        onFocus={onFocus}
                        onBlur={() => setHeight(0)}
                        onPressEnter={onPressEnter}
                    />
                </Form.Item>
                <Form.Item label="Адрес колшелька USDT TRC-20">
                    <Input onPressEnter={(e) => e?.target?.blur()} onFocus={onFocus} onBlur={() => setHeight(0)}/>
                </Form.Item>
                <Form.Item>
                    <Button
                        className='submit-button'
                        onClick={submitForm}
                    >
                        Создать заявку на обмен
                    </Button>
                </Form.Item>
           </Form>
           <div className='footer-rules'>Я прочитал&nbsp;<Link>правила</Link>&nbsp;и принимаю условия сервиса</div>
        </div>
    )
}

export default UserForm