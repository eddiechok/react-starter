import { yupResolver } from '@hookform/resolvers/yup';
import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SchemaOf } from 'yup';
import useGetTreeList, {
  DownlineList,
  TreeListParams
} from '../../api/get/useGetTreeList';
import DataWrapper from '../../components/DataWrapper';
import Form from '../../components/hook-form/Form';
import FormTextField from '../../components/hook-form/FormTextField';
import Header from '../../components/layout/Header';
import AppContainer from '../../components/ui/AppContainer';
import { NodeItem } from '../../components/ui/AppTreeItem';
import AppTreeView from '../../components/ui/AppTreeView';
import { Yup } from '../../shared/constants';
import commonLabel from '../../translation/commonLabel';
import ReferralTreeItem from './ReferralTreeItem';

type FormValues = {
  downline_username?: string;
};

const data: NodeItem[] = [
  {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
        children_status: 0
      },
      {
        id: '3',
        name: 'Child - 3',
        children_status: 1,
        children: [
          {
            id: '4',
            name: 'Child - 4',
            children_status: 1
          }
        ]
      }
    ],
    children_status: 1
  }
];

const fetchMoreData = () => {
  // a fake async api call like which sends
  // 20 more records in .5 secs
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: (Math.random() * 100).toString(),
          name: 'Child - 3',
          children: [
            {
              id: (Math.random() * 100).toString(),
              name: 'Child - 4',
              children_status: 1,
              children: []
            }
          ],
          children_status: 1
        }
      ]);
    }, 500);
  });
};

const schema: SchemaOf<FormValues> = Yup.object({
  downline_username: Yup.string().username()
});

const TreeListPage = () => {
  const { t } = useTranslation();

  const [treeListParams, setTreeListParams] = useState<TreeListParams>({
    inc_mem: 1
    // level: 1
  });

  // get the first level
  const treeList = useGetTreeList(treeListParams);

  const renderTreeItem = (node: DownlineList, rootNode = false) => {
    return (
      <ReferralTreeItem
        key={node.downline_username}
        rootNode={rootNode}
        nodeItem={{
          id: node.downline_username,
          ...node
        }}
        renderTreeItem={renderTreeItem}
      />
    );
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: FormValues) => {
    setTreeListParams({
      inc_down_mem: 1,
      inc_mem: 0,
      downline_username: values.downline_username
    });
  };

  return (
    <>
      <Header title="Tree List" />
      <AppContainer maxWidth="lg" onRefresh={treeList.refetch}>
        <DataWrapper
          isLoading={treeList.isLoading}
          haveData={!!treeList.data?.downline_list}
        >
          <Form methods={methods} onSubmit={onSubmit}>
            <FormTextField
              name="downline_username"
              msgLabel={t(commonLabel.username)}
              placeholder="Search Username"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 4 }}
            />
          </Form>
          <AppTreeView
            nodeItems={treeList.data?.downline_list}
            renderTreeItem={renderTreeItem}
          />
        </DataWrapper>
      </AppContainer>
    </>
  );
};

export default TreeListPage;
