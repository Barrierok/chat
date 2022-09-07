import React, { useCallback, useContext, useMemo } from 'react';
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
import { useTranslation } from 'react-i18next';
import Template from '../../common/components/template/Template';
import img from './img.png';
import client from '../../common/client';
import AuthContext from '../auth/authContext';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const { t } = useTranslation();

  const validationSchema = useMemo(() => Yup.object().shape({
    username: Yup.string()
      .min(3, t('validation.minMax'))
      .max(20, t('validation.minMax'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.minSix'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.samePassword')),
  }), [t]);

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = useCallback(async ({ username, password }, formik) => {
    try {
      const { data } = await client.post('signup', { username, password });

      loginUser(data);
    } catch (err) {
      formik.setErrors({ username: t('validation.error') });
    }
  }, [loginUser]);

  return (
    <Template containerFluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <CardBody className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={img} alt={t('signupPage.signup')} className="rounded-circle" />
              </div>
              <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
              >
                {({ errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">
                      {t('signupPage.signup')}
                    </h1>
                    <FormGroup floating>
                      <Input
                        invalid={Boolean(touched.username && errors.username)}
                        tag={Field}
                        name="username"
                        id="username"
                        placeholder={t('signupPage.username')}
                        autoComplete="true"
                        required
                      />
                      <Label for="username">
                        {t('signupPage.username')}
                      </Label>
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
                        placeholder={t('signupPage.password')}
                        autoComplete="new-password"
                        required
                        type="password"
                      />
                      <Label for="password">
                        {t('signupPage.password')}
                      </Label>
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
                        placeholder={t('signupPage.confirmPassword')}
                        autoComplete="confirm-password"
                        required
                        type="password"
                      />
                      <Label for="password">
                        {t('signupPage.confirmPassword')}
                      </Label>
                      <FormFeedback tooltip>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormFeedback>
                    </FormGroup>
                    <Button type="submit" color="primary" outline block>
                      {t('signupPage.action')}
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
