import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://ujz3cogbq0.execute-api.us-east-2.amazonaws.com/Testingapi/getbook')
      .then((response) => response.json())
      .then((data) => {
        const booksData = JSON.parse(data.body);
        setRows(booksData);
      })
      .catch((error) => console.error('Error fetching book data:', error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><h3>Book Name</h3></TableCell>
            <TableCell><h3>Author Name</h3></TableCell>
            <TableCell><h3>Book ID</h3></TableCell>
            <TableCell><h3>Stock</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((bookRow) => (
            <Row key={bookRow.Book_id} bookRow={bookRow} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const { bookRow } = props;
  const [open, setOpen] = useState(false);
  const [readerData, setReaderData] = useState([]);

  const fetchReaderData = (bookId) => {
    fetch(`https://ujz3cogbq0.execute-api.us-east-2.amazonaws.com/Testingapi/getreaders`)
      .then((response) => response.json())
      .then((data) => {
        const readerData = JSON.parse(data.body);
        const readersForBook = readerData[bookId] || []; // Extract readers for the specific book
        setReaderData(readersForBook);
      })
      .catch((error) => console.error('Error fetching reader data:', error));
  };

  return (
    <React.Fragment>
      <TableRow sx={{
          '& > *': { borderBottom: 'unset' },
          backgroundColor: bookRow.Stock < 5 ? 'red' : 'white', // Set background color
        }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              if (open) {
                setReaderData([]);
              } else {
                fetchReaderData(bookRow.Book_id);
              }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{bookRow.Book_name}</TableCell>
        <TableCell>{bookRow.Author_name}</TableCell>
        <TableCell>{bookRow.Book_id}</TableCell>
        <TableCell>{bookRow.Stock}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Reader Information
              </Typography>
              <Table size="small" aria-label="reader-info">
                <TableHead>
                  <TableRow>
                    <TableCell>Reader ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Time In</TableCell>
                    <TableCell>Time Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {readerData.map((readerRow) => (
                    <TableRow key={readerRow.Reader_id}>
                      <TableCell>{readerRow.Reader_id}</TableCell>
                      <TableCell>{readerRow.Status}</TableCell>
                      <TableCell>{readerRow.Time_in}</TableCell>
                      <TableCell>{readerRow.Time_out}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}