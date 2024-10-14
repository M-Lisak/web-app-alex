import { Button, Form, Input, InputNumber } from 'antd'
import React, { useCallback, useState } from 'react'
import './UserForm.css'
import { useNavigate } from 'react-router-dom'

export const onPressEnter = (e) => {
    const eventForm = e.target.form
    const index = [...eventForm].indexOf(e.target)
    console.log('index', index)
    eventForm[index + 1].focus()
    e.preventDefault()
}

const UserForm = () => {
    const [form] = Form.useForm()
    const [phone, setPhone] = useState(null)
    const navigate = useNavigate()

    const onChangePhone = (val) => {
        setPhone(val)
    }

    const submitForm = useCallback(async => {
        form.validateFields()
            .then(() => {
              //сохраняем данные, и переходим к другой странице
              //так же нужно добавить breadcrumbs(в идеале кнопку назад в тг))))))
              console.log('success', form.getFieldsValue())
              navigate('/success')
            })
            // eslint-disable-next-line
    }, [form])

    return (
        <div className='form'>
            <div className='user-form-info'>
                <h4>Заявка на обмен</h4>
                <div className='user-form-info-wrapper'>
                    <div className='user-form-info-left'>
                        <div className='user-form-info-sub-item'>
                            <span>{`Отдаете ${'RUB'}`}</span>
                            <b>{'1000'}</b>
                        </div>
                        <div className='user-form-info-sub-item'>
                            <span>{`Получаете ${'USDT'}`}</span>
                            <b>{'123'}</b>
                        </div>
                        <div className='user-form-info-sub-item'>
                            <span>Курс</span>
                            <b>{'0.23'}</b>
                        </div>
                    </div>
                    <div className='user-form-info-right'>
                        <div className='user-form-info-sub-item'>
                            <span>Дата и время</span>
                            <b>{'time'}</b>
                        </div>
                        <div className='user-form-info-sub-item'>
                            <span>Город</span>
                            <b>{'city'}</b>
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
                        placeholder='89123456789'
                        onPressEnter={onPressEnter}
                    />
                </Form.Item>
                <Form.Item label="Адрес колшелька USDT TRC-20">
                    <Input onPressEnter={onPressEnter}/>
                </Form.Item>
                <Form.Item>
                    <Button className='submit-button' onClick={submitForm}>Создать заявку на обмен</Button>
                </Form.Item>
           </Form>

        </div>
    )
}

export default UserForm