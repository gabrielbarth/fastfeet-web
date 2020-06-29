import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import More from '~/components/MorePopUp';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, MoreConainer, ModalContainer } from './styles';

export default function ProblemItem({ data, updateProblems }) {
  async function handleCancel() {
    const confirm = window.confirm('Are you sure about it?');

    if (!confirm) {
      toast.error('Delivery not canceled!');
      return;
    }

    try {
      await api.delete(`/problem/${data.id}/cancel-delivery`);
      updateProblems();
      toast.success('Delivery canceled successful!');
    } catch (err) {
      toast.error('This delivery can not be canceled!');
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.description}</small>
      <More
        contentStyle={{
          width: '200px',
          borderRadius: '4px',
        }}
      >
        <MoreConainer>
          <div>
            <Modal>
              <ModalContainer>
                <strong>VIEW ISSUE</strong>
                <p>{data.description}</p>
              </ModalContainer>
            </Modal>
          </div>
          <div>
            <button onClick={handleCancel} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Cancel delivery</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

ProblemItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateProblems: PropTypes.func.isRequired,
};
