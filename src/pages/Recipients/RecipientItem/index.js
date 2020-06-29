import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/MorePopUp';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MoreConainer } from './styles';

export default function RecipientItem({ data, updateRecipients }) {
  async function handleDelete() {
    const confirm = window.confirm('Are you sure about it?');

    if (!confirm) {
      toast.error('Recipient not removed');
      return;
    }

    try {
      await api.delete(`/recipients/${data.id}`);
      updateRecipients();
      toast.success('Recipient removed successful!');
    } catch (err) {
      toast.error(
        'This recipient can not be removed. There is a delivery for him/her!'
      );
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.name}</small>
      <small>
        {data.street}, {data.number}, {data.city} - {data.state}
      </small>
      <More>
        <MoreConainer>
          <div>
            <button
              onClick={() => history.push(`/recipients/form/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

RecipientItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  updateRecipients: PropTypes.func.isRequired,
};
