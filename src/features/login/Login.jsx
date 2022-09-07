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
import { useTranslation } from 'react-i18next';
import Template from '../../common/components/template/Template';
import img from './img.png';
import client from '../../common/client';
import AuthContext from '../auth/authContext';

const initialValues = {
  username: '',
  password: '',
};

const Login = () => {
  const { t } = useTranslation();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = useCallback(async (values, formik) => {
    try {
      const { data } = await client.post('login', values);

      loginUser(data);
    } catch (err) {
      formik.setErrors({
        username: t('loginPage.error'),
        password: t('loginPage.error'),
      });
    }
  }, [loginUser, t]);

  return (
    <Template containerFluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <CardBody className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={img} alt="Войти" className="rounded-circle" />
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
                          placeholder={t('loginPage.username')}
                          autoComplete="true"
                          required
                        />
                        <Label for="username">
                          {t('loginPage.username')}
                        </Label>
                      </FormGroup>
                      <FormGroup floating className="mb-4 position-relative">
                        <Input
                          invalid={Boolean(errors.password)}
                          tag={Field}
                          name="password"
                          id="password"
                          placeholder={t('loginPage.password')}
                          autoComplete="current-password"
                          required
                          type="password"
                        />
                        <Label for="password">
                          {t('loginPage.password')}
                        </Label>
                        <FormFeedback tooltip>
                          {errors.password}
                        </FormFeedback>
                      </FormGroup>
                      <Button type="submit" color="primary" outline block>
                        {t('loginPage.login')}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </CardBody>
            <CardFooter className="p-4">
              <div className="text-center">
                <span className="">
                  {t('loginPage.noAcc')}
                  {' '}
                </span>
                <Link to="/signup">{t('loginPage.signup')}</Link>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Template>
  );
};

export default Login;
