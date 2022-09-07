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
import { selectAllChannels, updateChannelTrigger } from './channelsSlice';

const RenameModal = ({
  modal, toggle, name, id,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = useMemo(() => Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.minMax'))
      .max(20, t('validation.minMax')),
  }), [t]);

  const channels = useSelector(selectAllChannels);

  const onSubmit = useCallback((values, formikBug) => {
    if (channels.some((c) => c.name === values.name.trim())) {
      formikBug.setFieldError('name', t('channel.error'));
    } else {
      dispatch(updateChannelTrigger({ id, name: values.name.trim() }));
      toggle();
      formikBug.resetForm();
    }
  }, [channels, t, dispatch, id, toggle]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    onSubmit,
    initialValues: {
      name,
    },
  });

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div className="modal-title h4">
          {t('channel.rename')}
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

RenameModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RenameModal;
