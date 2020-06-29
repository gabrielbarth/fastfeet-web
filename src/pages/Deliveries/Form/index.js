import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/Button';
import { AsyncSelectInput, SimpleInput } from '~/components/Form';
import HeaderForm from '~/components/HeaderForm';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function DeliveryForm({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  console.tron.log(match);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      if (id) {
        const response = await api.get(`/deliveries/${deliveryId}`);

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('recipient_id', {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        });
      }
    }
    loadInitialData(id);
  }, [id]);

  const customStylesSelectInput = {
    control: (provided) => ({
      ...provided,
      height: 45,
    }),
  };

  async function loadRecipientOptions(inputValue, callback) {
    const response = await api.get('/recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(data);
  }

  async function loadDeliverymanOptions(inputValue, callback) {
    const response = await api.get('/deliverymen', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map((deliveryman) => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    callback(data);
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('Product name is required.'),
        recipient_id: Yup.string().required('Recipient is required.'),
        deliveryman_id: Yup.string().required('Deliveryman is required.'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/deliveries/${id}`, {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });
        history.push('/deliveries');
        toast.success('Delivery updated successful!');
      } else {
        await api.post('/deliveries', {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });
        toast.success('Delivery created successful!');
      }

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm title="Deliveries Registration">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <section>
            <AsyncSelectInput
              type="text"
              label="Recipient"
              name="recipient_id"
              placeholder="Recipients"
              noOptionsMessage={() => 'No recipients found'}
              loadOptions={loadRecipientOptions}
              styles={customStylesSelectInput}
            />
            <AsyncSelectInput
              type="text"
              label="Deliveryman"
              name="deliveryman_id"
              placeholder="Deliveryman"
              noOptionsMessage={() => 'No deliveryman found'}
              loadOptions={loadDeliverymanOptions}
              styles={customStylesSelectInput}
            />
          </section>
          <SimpleInput
            label="Product name"
            name="product"
            type="text"
            placeholder="Product name"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </UnForm>
      </Content>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
