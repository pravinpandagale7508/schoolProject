import { useState } from 'react';
import { TableCell, TableRow, Typography, Box, Button } from '@mui/material';
import AddAdmin from './AddAdmin';
import { Dialog } from '../../style-guide';
import { useSelector } from 'react-redux';

const AdminRow = ({ data }) => {
  const { roles } = useSelector(state => state.admin);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const onHandleOpenModal = () => setOpenOrderModal(true);
  const onHandleCancelModal = () => setOpenOrderModal(false);
  function getRoles(data){
    return data?.roles[0]
  }
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell />
      <TableCell>
        <Typography variant='body1' component='span'>
                  {data.username || '-'}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body1' component='span'>
                  {data.email || '-'}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body1' component='span'>
       {data?.roles[0]?.name}
        </Typography>
      </TableCell>
      
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button onClick={onHandleOpenModal} variant='outlined'>
            Edit
          </Button>
          {openOrderModal && (
            <Dialog open={openOrderModal} title={'User'} onHandleCancel={onHandleCancelModal}>
                <AddAdmin data={data} onHandleCancel={onHandleCancelModal} id={null} />
            </Dialog>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default AdminRow;
