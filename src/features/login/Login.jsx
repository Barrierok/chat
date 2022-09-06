import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  FormFeedback,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import Template from '../../common/components/template/Template';
import img from './img.png';
import client from '../../common/client';
import AuthContext from '../auth/authContext';

const initialValues = {
  username: '',
  password: '',
};

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = useCallback(async (values, formik) => {
    try {
      const { data } = await client.post('login', values);

      loginUser(data);
    } catch (err) {
      formik.setErrors({
        username: 'Неверные имя пользователя или пароль',
        password: 'Неверные имя пользователя или пароль',
      });
    }
  }, [loginUser]);

  return (
    <Template containerFluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <CardBody className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={img} alt="Войти" className="rounded-circle"/>
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-mb-0">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ errors }) => (
                    <Form>
                      <h1 className="text-center mb-4">Войти</h1>
                      <FormGroup floating>
                        <Input
                          invalid={Boolean(errors.username)}
                          tag={Field}
                          name="username"
                          id="username"
                          placeholder="Ваш ник"
                          autoComplete="true"
                          required
                        />
                        <Label for="username">Ваш ник</Label>
                      </FormGroup>
                      <FormGroup floating className="mb-4 position-relative">
                        <Input
                          invalid={Boolean(errors.password)}
                          tag={Field}
                          name="password"
                          id="password"
                          placeholder="Пароль"
                          autoComplete="current-password"
                          required
                          type="password"
                        />
                        <Label for="password">Пароль</Label>
                        <FormFeedback tooltip>
                          {errors.password}
                        </FormFeedback>
                      </FormGroup>
                      <Button type="submit" color="primary" outline block>
                        Войти
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </CardBody>
            <CardFooter className="p-4">
              <div className="text-center">
                <span className="">Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Template>
  );
};

export default Login;
