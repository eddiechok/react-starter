import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow
} from '@mui/material';
import React from 'react';
import { TableHeader, TableSummary } from '../../http/http.model';

export type AppTableProps = TableProps & {
  uniqueKey?: string;
  data?: Record<string, string | number>[];
  header?: TableHeader[];
  summaryData?: TableSummary[];
};

const AppTable = ({
  data,
  header,
  summaryData,
  uniqueKey = 'id',
  ...props
}: AppTableProps) => {
  return (
    <Table {...props}>
      <TableHead>
        {summaryData && summaryData.length > 0 && (
          <TableRow className="table-summary">
            {header?.map((head) => (
              <TableCell key={'summary-' + head.param_name}>
                {
                  summaryData.find(
                    (summary) => summary.label === head.param_name
                  )?.value
                }
              </TableCell>
            ))}
          </TableRow>
        )}
        <TableRow>
          {header?.map((head) => (
            <TableCell key={head.param_name}>{head.label_name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item[uniqueKey]}>
            {header?.map((head) => (
              <TableCell
                sx={{
                  color:
                    head.param_name === 'status'
                      ? `${item.status_color_code} !important`
                      : undefined
                }}
                key={head.param_name + '-' + item.id}
              >
                {item[head.param_name]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppTable;
