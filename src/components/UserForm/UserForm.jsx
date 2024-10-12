import { Form, Input } from 'antd'
import React from 'react'
import './UserForm.css'

const UserForm = () => {
    const [form] = Form.useForm()
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
                <Form.Item label="Фамилия">
                    <Input />
                </Form.Item>
                <Form.Item label="Имя">
                    <Input />
                </Form.Item>
           </Form>

        </div>
    )
}

export default UserForm