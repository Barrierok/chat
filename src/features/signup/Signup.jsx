import React, { useCallback, useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Template from '../../common/components/template/Template';
import img from './img.png';
import client from '../../common/client';
import AuthContext from '../auth/authContext';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

const Signup = () => {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = useCallback(async ({ username, password }, formik) => {
    try {
      const { data } = await client.post('signup', { username, password });

      loginUser(data);
    } catch (err) {
      formik.setErrors({
        username: 'Такой пользователь уже существует',
      });
    }
  }, [loginUser]);

  return (
    <Template containerFluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <CardBody className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={img} alt="Регистрация" className="rounded-circle" />
              </div>
              <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
              >
                {({ errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <FormGroup floating>
                      <Input
                        invalid={Boolean(touched.username && errors.username)}
                        tag={Field}
                        name="username"
                        id="username"
                        placeholder="Имя пользователя"
                        autoComplete="true"
                        required
                      />
                      <Label for="username">Имя пользователя</Label>
                      <FormFeedback tooltip>
                        {touched.username && errors.username}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup floating>
                      <Input
                        invalid={Boolean(touched.password && errors.password)}
                        tag={Field}
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        autoComplete="new-password"
                        required
                        type="password"
                      />
                      <Label for="password">Пароль</Label>
                      <FormFeedback tooltip>
                        {touched.password && errors.password}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup floating>
                      <Input
                        invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        tag={Field}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Подвердите пароль"
                        autoComplete="confirm-password"
                        required
                        type="password"
                      />
                      <Label for="password">Подвердите пароль</Label>
                      <FormFeedback tooltip>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormFeedback>
                    </FormGroup>
                    <Button type="submit" color="primary" outline block>
                      Зарегистрироваться
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Template>
  );
};

export default Signup;
