
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Loading from '../Loading';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}));

function AllProfile(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { vehicles, deleteVehicle, setValue, selectVehicle } = props;
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, vehicles.data.length - page * rowsPerPage);
  const [key, changeKey] = React.useState('');
  const handleChange = e => {
    changeKey(e.target.value);
  };

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const Vehicle = (row, index) => {
    return (
      <StyledTableRow key={index}>
        <StyledTableCell component="th" align="center" scope="row">
          {index + 1}
        </StyledTableCell>
        <StyledTableCell align="center">{row.brand}</StyledTableCell>
        <StyledTableCell align="center">{row.type}</StyledTableCell>
        <StyledTableCell align="center">{row.fuel}</StyledTableCell>
        <StyledTableCell align="center">{row.number}</StyledTableCell>
        <StyledTableCell align="center">{row.date}</StyledTableCell>
        <StyledTableCell align="center">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={() => {
              selectVehicle(row);
              setValue(0);
              setValue(1);
            }}
          >
            Xem và Sửa
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={() => {
              deleteVehicle(row._id);
            }}
          >
            Xóa
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    );
  };
  const filterVehicles = vehicles => {
    return vehicles
      .filter(vehicle => {
        return (
          vehicle.brand.indexOf(key) !== -1 ||
          vehicle.type.indexOf(key) !== -1 ||
          vehicle.number.indexOf(key) !== -1 ||
          vehicle.fuel == key
        );
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((vehicle, index) => {
        return Vehicle(vehicle, index);
      });
  };
  const value = vehicles.data.filter(vehicle => {
    return (
      vehicle.brand.indexOf(key) !== -1 ||
      vehicle.type.indexOf(key) !== -1 ||
      vehicle.number.indexOf(key) !== -1 ||
      vehicle.fuel == key
    );
  }).length;
  useEffect(() => {
    if (value < 6 || value == 6) {
      setRowsPerPage(value);
    }else{
      setRowsPerPage(6)
    }
  }, [value]);
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Typography style={{ textAlign: 'center' }} variant="h4">
          Lí lịch phương tiện
        </Typography>
        <div>
          <form>
            <TextField
              style={{ margin: 16 }}
              placeholder="Tìm kiếm"
              name="keyword"
              onChange={handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Nhiên liệu</InputLabel>
              <Select native onChange={handleChange}>
                <option value="" />
                <option value="Xăng">Xăng</option>
                <option value="Dầu Diezen">Dầu Diezen</option>
              </Select>
            </FormControl>
          </form>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{ background: '#3f51b5' }}>
              <StyledTableCell align="center" style={{ background: '#3f51b5' }}>
                STT
              </StyledTableCell>
              <StyledTableCell align="center" style={{ background: '#3f51b5' }}>
                Nhãn xe chuyên dùng
              </StyledTableCell>
              <StyledTableCell align="center" style={{ background: '#3f51b5' }}>
                Loại phương tiện
              </StyledTableCell>
              <StyledTableCell align="center" style={{ background: '#3f51b5' }}>
                Nhiên liệu sử dụng
              </StyledTableCell>
              <StyledTableCell align="center" style={{ background: '#3f51b5' }}>
                Số đăng kí
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ background: '#3f51b5' }}
                align="center"
              >
                Thời gian đăng kí
              </StyledTableCell>

              <StyledTableCell align="center" style={{ background: '#3f51b5' }}>
                Thao tác
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filterVehicles(vehicles.data)}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>

        {vehicles.isUpdate ? <Loading /> : null}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          style={{ float: 'right' }}
          colSpan={3}
          count={value}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'Số hàng trong trang' },
            native: false
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </Paper>
  );
}
export default AllProfile;
