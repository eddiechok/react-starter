import { Container } from '@mui/material';
//@ts-ignore
import React, { useState } from 'react';
import DataLoader from '../../components/DataLoader';
import DataWrapper from '../../components/DataWrapper';
import Header from '../../components/layout/Header';

const InfiniteScrollPage = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 200) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems((items) => items.concat(Array.from({ length: 20 })));
    }, 500);
  };

  return (
    <>
      <Header title="Infinite Scroll" />
      <Container maxWidth="sm">
        <DataWrapper isLoading={false} haveData={true}>
          {items.map((_, i) => (
            <div key={i}>div - #{i}</div>
          ))}
          <DataLoader hasNextPage={hasMore} onScroll={fetchMoreData} />
        </DataWrapper>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;