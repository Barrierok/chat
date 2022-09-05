import React, { useCallback } from 'react';
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
import { createChannel, selectAllChannels } from './channelsSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
});

const initialValues = { name: '' };

const AddModal = ({ modal, toggle }) => {
  const channels = useSelector(selectAllChannels);
  const dispatch = useDispatch();

  const onSubmit = useCallback(({ name }, formikBug) => {
    if (channels.some((c) => c.name === name.trim())) {
      formikBug.setFieldError('name', 'Должно быть уникальным');
    } else {
      dispatch(createChannel({ name: name.trim() }));
      toggle();
      formikBug.resetForm();
    }
  }, [toggle]);

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <Label htmlFor="name" className="m-0 h4">Добавить канал</Label>
      </ModalHeader>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Input
            innerRef={(ref) => ref?.focus()}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={Boolean(formik.errors.name)}
          />
          <FormFeedback>
            {formik.errors.name}
          </FormFeedback>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Отменить
          </Button>
          <Button color="primary" type="submit" disabled={!formik.dirty}>
            Отправить
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
