import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Template from '../../common/components/template/Template';
import img from './img.svg';

const NoMatch = () => {
  const { t } = useTranslation();

  return (
    <Template containerFluid>
      <Row className="align-items-center justify-content-center h-100">
        <Col xs={12} className="d-flex flex-column align-items-center justify-content-center">
          <img src={img} alt="Страница не найдена" className="h-25 w-25" />
          <h1 className="h4 text-muted">{t('noMatchPage.pageNotFound')}</h1>
          <p className="text-muted">
            {t('noMatchPage.butYouCan')}
            {' '}
            <Link to="/">{t('noMatchPage.toMainPage')}</Link>
          </p>
        </Col>
      </Row>
    </Template>
  );
};

export default NoMatch;
