import React, {Fragment} from 'react';
import {Form, Input, Button,} from 'antd';
import {UserOutlined} from '@ant-design/icons';


const Login = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Fragment className="bg-light">
            <div className="row my-auto mx-0 shadow card rounded-lg">
                <div className="col-1"
                     style={{backgroundImage: 'url(https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png)'}}>
                </div>
                <div className="col-11">
                    <div className="m-0 w-100 border-dark mb-5 row">
                        <div className="col-lg-3 col-xs-12 py-lg-5 my-lg-5 py-xs-3 my-xs-3">
                            <h2>Iniciar sesión</h2>
                            <p>Al continuar aceptas nuestro <a href="/">Acuerdo de usuario</a> y <a href="/">Politica de Privacidad</a>.</p>

                            <Form
                                className="mt-5"
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}>

                                <Form.Item className="mb-3" name="username"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Por favor ingresa tu usuario',
                                               },
                                           ]}>
                                    <Input size="large" placeholder="NOMBRE DE USUARIO" suffix={<UserOutlined/>}/>
                                </Form.Item>

                                <Form.Item className="mb-3" name="password"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Por favor ingresa tu contraseña!',
                                               },
                                           ]}>
                                    <Input.Password size="large" placeholder="CONTRASEÑA"/>
                                </Form.Item>

                                <Form.Item  className="mb-3">
                                    <Button type="primary" block htmlType="submit">
                                        ENTRAR
                                    </Button>
                                </Form.Item>

                                <p className="mt-0">¿Olvidaste tu <a href="/">nombre de usuario</a> o <a href="/">contraseña</a>?</p>
                                <p className="mt-4">Nuevo en React Reddit? <a href="/">REGISTRATE</a></p>

                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Login;