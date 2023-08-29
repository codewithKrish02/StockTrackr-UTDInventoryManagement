import * as React from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import "./Add_book.css";
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
class Add_books extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSuccessMessageVisible: false
        };
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ isSuccessMessageVisible: false });
        this.clearFormFields();
    }
    clearFormFields() {
        // Clear the form fields by setting their values to empty strings
        document.getElementById("bookID").value = "";
        document.getElementById("authorName").value = "";
        document.getElementById("bookName").value = "";
    }

    
    submitForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const bookID = form.querySelector("#bookID").value;
        const authorName = form.querySelector("#authorName").value;
        const bookName = form.querySelector("#bookName").value;
        const url = ' https://ujz3cogbq0.execute-api.us-east-2.amazonaws.com/Testingapi/addbook';

        try{
            const response = await axios.post(url, {
                bookID: bookID,
                authorName: authorName,
                book_Name: bookName,
            });

            if (response.status === 200){
                console.log('Book added to inventory');
                this.setState({ isSuccessMessageVisible: true });
            }
            else{
                console.log('Error adding the book information');
            }
        } catch(error){
            console.log('API Request error:', error);
        }
    };

    render() {
        const { isSuccessMessageVisible } = this.state;
    
        return (
            <div className="center-container">
                <form onSubmit={this.submitForm}>
                    <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
                        <CardContent>
                            <Typography gutterBottom variant='h5' align='center'>Add Books</Typography>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <TextField id="bookID" label="Book ID" placeholder='Enter the Book ID B####' variant='outlined' fullWidth required />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField id="authorName" label="Author Name" placeholder='Enter the Author Name' variant='outlined' fullWidth required />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField id="bookName" label="Book Name" placeholder='Enter the Book Name' variant='outlined' fullWidth required />
                                </Grid>
                                <Grid xs={12} item>
                                    <Button type="submit" variant='contained' color='primary' fullWidth>Submit</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
                <Dialog
                    open={isSuccessMessageVisible}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Book Added Successfully!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The book has been added to the inventory.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}
export default Add_books;