import { Skeleton, TreeItem, TreeItemProps } from '@mui/lab';
import React, { useEffect } from 'react';
import { Optional } from 'utility-types';

export type NodeItem = Record<string, any> & {
  id: string;
  children?: Record<string, any>[];
  children_status: number;
};

export type AppTreeItemProps = Optional<TreeItemProps, 'nodeId'> & {
  nodeItem: NodeItem;
  renderTreeItem: (node: any, rootNode?: boolean) => any;
  rootNode?: boolean;
  loadChildren: () => void;
  nodeChildren?: Record<string, any>[];
  isLoading?: boolean;
};

const AppTreeItem = ({
  nodeItem,
  renderTreeItem,
  rootNode,
  loadChildren,
  nodeChildren,
  isLoading,
  ...props
}: AppTreeItemProps) => {
  useEffect(() => {
    // if children status = 1, but no children, fetch data
    if (
      nodeItem.children_status &&
      (!nodeItem.children || nodeItem.children.length === 0)
    ) {
      loadChildren();
    }
  }, [nodeItem.children, nodeItem.children_status, nodeItem.downline_username]);

  return (
    <TreeItem
      nodeId={nodeItem.id}
      TransitionProps={{
        unmountOnExit: false,
        mountOnEnter: true
      }}
      {...props}
      label={isLoading ? <Skeleton animation="wave" /> : props.label}
      sx={(theme) => {
        const borderColor = theme.palette.primary.main;

        return {
          position: 'relative',
          '&:before': {
            pointerEvents: 'none',
            content: '""',
            position: 'absolute',
            width: 13,
            top: 12,
            left: 15,
            borderBottom:
              // only display if the TreeItem is not root node
              `1px solid ${borderColor}`
            // `1px dashed ${borderColor}`
          },
          '&:after': rootNode
            ? undefined
            : {
                pointerEvents: 'none',
                content: '""',
                position: 'absolute',
                height: '100%',
                top: 0,
                left: 15,
                borderLeft:
                  // only display if the TreeItem is not root node
                  `1px solid ${borderColor}`
              },
          '&:last-child:after': {
            height: 12
          },
          ...props.sx
        };
      }}
    >
      {nodeChildren?.map((node) => renderTreeItem(node, false))}
    </TreeItem>
  );
};

export default AppTreeItem;
