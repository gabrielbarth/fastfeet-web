import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { IconButton } from '~/components/Button';
import { SearchInput } from '~/components/Form';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import history from '~/services/history';

import RecipientItem from './RecipientItem';
import { Container, Content, Grid, Button } from './styles';

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [recipients, setRecipients] = useState([]);

  async function loadRecipients() {
    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients();
	}, [page]); // eslint-disable-line

  async function handleSearchRecipient(e) {
    setPage(1);

    const response = await api.get('/recipients', {
      params: {
        q: e.target.value,
        page,
      },
    });

    setRecipients(response.data);
  }

  return (
    <Container>
      <Content>
        <HeaderList title="Recipients management">
          <SearchInput
            onChange={handleSearchRecipient}
            type="text"
            placeholder="Search recipient"
          />
          <IconButton
            Icon={MdAdd}
            title="ADD"
            action={() => history.push('/recipients/form')}
            type="button"
          />
        </HeaderList>
        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Name</strong>
            <strong>Address</strong>
            <strong>Options</strong>
          </section>
          {recipients.map((recipient) => (
            <RecipientItem
              updateRecipients={loadRecipients}
              key={recipient.id}
              data={recipient}
            />
          ))}
        </Grid>
        <section>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            previous
          </Button>
          <Button
            disabled={recipients.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            next
          </Button>
        </section>
      </Content>
    </Container>
  );
}
