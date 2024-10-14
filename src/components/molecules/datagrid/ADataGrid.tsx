import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

type ADataGridProps = {
  rows: any[];
  columns: GridColDef[];
  title?: string;
  height?: number | string;
  width?: number | string;
};

const ADataGrid = ({ rows, columns, title, height = 'auto', width = '100%' }: ADataGridProps) => {
  return (
    <Box sx={{ width }}>
      {title && <h2>{title}</h2>}
      <Box sx={{ height: height === 'auto' ? 'auto' : height, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
          autoHeight={height === 'auto'}
          hideFooterPagination={rows.length <= 100}
          hideFooter={rows.length <= 100}
        />
      </Box>
    </Box>
  );
};

export default ADataGrid;
