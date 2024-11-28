import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { formatDate } from '../../util/functions/date';
import useStore from '../../util/store/store';

export interface Column {
  id: 'name' | 'icNo' | 'gender' | 'address' | 'contactNo' | 'action' | 'position' | 'date' | 'remark' | 'queueId' | 'startTime' | 'endTime' | 'appointmentId' | 'details';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const placeHolderFunc = (params) => {}

function DataTable({rows, action, columns, isAppointmentTable = false, isQueueTable = false, isVisitationTable = false, secondaryAction = placeHolderFunc, isCompletedShown = false}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {

                if (row?.isArrival && row?.isConfirmed && !isCompletedShown && !isVisitationTable ){
                  return;
                }

                if (isVisitationTable && row?.reportId){
                  return;
                }

                if(isVisitationTable && !(row?.isArrival&& row?.isConfirmed)){
                  return;
                }
                console.log(row)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column, idx) => {
                      const value = row[column.id];
                      
                      if(isAppointmentTable){
                        if(column.id === 'action'){
                          if(!row?.isArrival && !row?.isConfirmed){
                            return (
                              <TableCell key={idx}>
                                <Button variant="contained" size="small" onClick={()=>secondaryAction(row)}>Confirm</Button>
                              </TableCell>
                            )
                          }else if(!row?.isArrival && row?.isConfirmed){
                            return (
                              <TableCell key={idx}>
                                <Button variant="contained" size="small" onClick={()=>action(row)}>Check In</Button>
                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell key={idx}>
                                <Button variant="contained" size="small" disabled onClick={()=>action(row)}>Completed</Button>
                              </TableCell>
                            )
                          }
                        }
                      }

                      if(isVisitationTable){
                        if(column.id === 'action'){
                          return (
                              <TableCell key={idx}>
                                <Button variant="contained" size="small" onClick={() => action(row)}>
                                  Create Report
                                </Button>
                              </TableCell>
                          )
                        }
                      }


                      if(column.id === 'action'){
                        return (
                          <TableCell key={idx}>
                            <Button variant="contained" size="small" onClick={()=>action(row)}>
                              {isQueueTable ? 'Check In' : 'Edit'}
                            </Button>
                          </TableCell>
                        )
                      }

                      if(column.id === 'date' || column.id === 'endTime' || column.id === 'startTime'){
                        return(
                        <TableCell key={idx}>
                          {formatDate(value)}
                        </TableCell>
                        )
                      }
                    
                      return (
                        <TableCell key={idx}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value }
                        </TableCell>
                      );
                    })}
  
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTable;
