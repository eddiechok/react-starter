import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { TreeView, TreeViewProps } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';

export type AppTreeViewProps = TreeViewProps & {
  nodeItems?: Record<string, any>[];
  renderTreeItem: (node: any, rootNode?: boolean) => any;
};

const AppTreeView = ({
  nodeItems,
  renderTreeItem,
  ...props
}: AppTreeViewProps) => {
  return (
    <TreeView
      defaultCollapseIcon={
        <Box
          sx={{
            background: 'white',
            zIndex: 1,
            display: 'flex',
            borderRadius: '50%'
          }}
        >
          <RemoveCircle color="primary" />
        </Box>
      }
      defaultExpandIcon={
        <Box
          sx={{
            background: 'white',
            zIndex: 1,
            display: 'flex',
            borderRadius: '50%'
          }}
        >
          <AddCircle color="primary" />
        </Box>
      }
      {...props}
      sx={{
        ...props.sx
      }}
    >
      {nodeItems?.map((node) => renderTreeItem(node, true))}
    </TreeView>
  );
};

export default AppTreeView;
