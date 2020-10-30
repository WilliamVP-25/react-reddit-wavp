import React, {useState} from "react";
import {Alert, Button, Form, Input, Modal} from "antd";
import {MailOutlined, SaveOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {changeEmailUserAction, getAuthUserAction} from "../../actions/authActions";

const UseChangeEmail = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const submit = user => dispatch(changeEmailUserAction(user));

    const [visibleModalEmail, setVisibleModalEmail] = useState(false);
    const [formEmail, setFormEmail] = useState({
        newEmail: '',
        password1: '',
        disabled1: false
    });

    const {newEmail, password1, disabled1} = formEmail;

    const onChangeFormEmail = e => {
        const field = e.target.name;
        const value = e.target.value;
        setFormEmail({
            ...formEmail, [field]: value
        })
    }

    const handleSubmit = () => {
        const user = {
            newEmail, password: password1
        }
        submit(user);
        setVisibleModalEmail(false)
    }
    const modalChangeEmail = () => {
        return <Modal footer={null}
                      onCancel={() => setVisibleModalEmail(false)}
                      centered visible={visibleModalEmail}>
            <Form
                className="mt-5 p-3 pt-0"
                name="basic"
                initialValues={{
                    newEmail
                }}
                onFinish={handleSubmit}>

                <h2><MailOutlined/> Modificar correo electrónico</h2>
                <p>Actualice su correo electrónico a continuación.
                    Se enviará un nuevo correo electrónico de verificación que deberá usar para verificar este nuevo
                    correo electrónico.</p>

                <Form.Item
                    className="mb-3"
                    name="password1"
                    rules={[{
                        required: true,
                        message: 'Por favor ingresa tu contraseña actual',
                    },]}>
                    <Input.Password
                        name="password1"
                        onChange={onChangeFormEmail}
                        value={password1}
                        allowClear
                        size="large"
                        placeholder="ACTUAL CONTRASEÑA"/>
                </Form.Item>

                <Form.Item
                    value={newEmail}
                    name="newEmail"
                    className="mb-3"
                    rules={[{
                        required: true,
                        message: 'Por favor ingresa un correo válido',
                        type: "email"
                    },]}>
                    <Input
                        name="newEmail"
                        onChange={onChangeFormEmail}
                        allowClear
                        value={newEmail}
                        size="large"
                        placeholder="NUEVO CORREO ELECTRÓNICO"
                        suffix={<MailOutlined/>}/>
                </Form.Item>
                {newEmail.toLowerCase().trim() === user.email.toLowerCase().trim() &&
                <Alert className="mb-2"
                       message="El correo ingresado es debe ser diferente al email actual" type="error"
                       showIcon/>
                }

                {newEmail.toLowerCase().trim() !== user.email.toLowerCase().trim() &&
                <div className="text-right mt-3">
                    <Button
                        disabled={disabled1}
                        size="large"
                        icon={<SaveOutlined/>}
                        type="primary" htmlType="submit">
                        GUARDAR EMAIL
                    </Button>
                </div>
                }


            </Form>
        </Modal>
    }

    const openModal = () => {
        setVisibleModalEmail(true)
    }

    return {
        modalChangeEmail, openModal,
    }
};
export default UseChangeEmail;