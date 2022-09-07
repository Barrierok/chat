import React, { useCallback, useMemo } from 'react';
import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createChannel, selectAllChannels } from './channelsSlice';

const initialValues = { name: '' };

const AddModal = ({ modal, toggle }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.minMax'))
      .max(20, t('validation.minMax')),
  }), [t]);

  const channels = useSelector(selectAllChannels);

  const onSubmit = useCallback(({ name }, formikBug) => {
    if (channels.some((c) => c.name === name.trim())) {
      formikBug.setFieldError('name', t('channel.error'));
    } else {
      dispatch(createChannel({ name: name.trim() }));
      toggle();
      formikBug.resetForm();
    }
  }, [channels, dispatch, t, toggle]);

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div className="modal-title h4">
          {t('channel.add')}
        </div>
      </ModalHeader>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={Boolean(formik.touched.name && formik.errors.name)}
          />
          <Label className="visually-hidden" htmlFor="name">
            {t('channel.name')}
          </Label>
          <FormFeedback>
            {formik.touched.name && formik.errors.name}
          </FormFeedback>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            {t('common.cancel')}
          </Button>
          <Button color="primary" type="submit" disabled={!formik.dirty}>
            {t('common.send')}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

AddModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default AddModal;
