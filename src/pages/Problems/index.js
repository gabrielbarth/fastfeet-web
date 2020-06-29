import React, { useState, useEffect } from 'react';

import HeaderList from '~/components/HeaderList';
import api from '~/services/api';

import ProblemItem from './ProblemItem';
import { Container, Content, Grid, Button } from './styles';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);

  async function loadProblems() {
    const response = await api.get('/delivery/problems', {
      params: {
        page,
      },
    });

    setProblems(response.data);
  }
  useEffect(() => {
    loadProblems();
	}, [page]); //eslint-disable-line

  return (
    <Container>
      <Content>
        <HeaderList title="Delivery issues" />
        <Grid>
          <section>
            <strong>Delivery</strong>
            <strong>Issue description</strong>
            <strong>Options</strong>
          </section>
          {problems.map((problem) => (
            <ProblemItem
              updateProblems={loadProblems}
              key={problem.id}
              data={problem}
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
            disabled={problems.length < 5}
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
