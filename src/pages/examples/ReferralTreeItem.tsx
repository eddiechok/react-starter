import React, { useEffect, useState } from 'react';
import { Optional } from 'utility-types';
import useGetTreeList, { TreeListParams } from '../../api/get/useGetTreeList';
import AppTreeItem, { AppTreeItemProps } from '../../components/ui/AppTreeItem';

export type ReferralTreeItemProps = Optional<AppTreeItemProps, 'loadChildren'>;

const ReferralTreeItem = ({ ...props }: ReferralTreeItemProps) => {
  const [nodeChildren, setNodeChildren] = useState<
    Record<string, any>[] | undefined
  >(props.nodeItem.children);

  const [downlineTreeListParams, setDownlineTreeListParams] =
    useState<TreeListParams>({
      inc_down_mem: 1, // should be 0, but api not functioning
      inc_mem: 0
      // level: 1
    });

  // search downline tree list
  const downlineTreeList = useGetTreeList(downlineTreeListParams, {
    enabled: !!downlineTreeListParams.downline_username // dont run if dont have downline_username
  });

  useEffect(() => {
    if (downlineTreeList.data?.downline_list) {
      // setNodeChildren(downlineTreeList.data.downline_list);
      setNodeChildren([
        {
          downline_username: Math.random().toString(),
          children: [],
          children_status: 0
        }
      ]);
    }
  }, [downlineTreeList.data?.downline_list]);

  const loadChildren = () => {
    setDownlineTreeListParams((prev) => ({
      ...prev,
      downline_username: props.nodeItem.downline_username
    }));
  };

  return (
    <AppTreeItem
      loadChildren={loadChildren}
      nodeChildren={nodeChildren}
      isLoading={downlineTreeList.isLoading}
      label={props.nodeItem.downline_username}
      {...props}
    />
  );
};

export default ReferralTreeItem;
