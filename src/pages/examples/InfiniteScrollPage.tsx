import { List, ListItem, ListItemText } from '@mui/material';
//@ts-ignore
import React, { useState } from 'react';
import DataLoader from '../../components/DataLoader';
import DataWrapper from '../../components/DataWrapper';
import AppContainer from '../../layout/AppContainer';

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
      <AppContainer maxWidth="sm">
        <DataWrapper isLoading={false} haveData={true}>
          <List>
            {items.map((_, i) => (
              <ListItem key={i} divider>
                <ListItemText primary={`#${i}`} />
              </ListItem>
            ))}
          </List>
          <DataLoader hasNextPage={hasMore} onScroll={fetchMoreData} />
        </DataWrapper>
      </AppContainer>
    </>
  );
};

export default InfiniteScrollPage;
