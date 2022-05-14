import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '4%',
        borderLeft: 'solid',
        color: 'green'
    },
    bullet: {
        display: 'inline-block',
        margin: '10px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

    /**
     * 
     * Material UI Cards Implementation
     */

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { item } = props


    /**
     * 
     * Function to Update the Status Details
     */
    const updateStatusDetails = (e, value) => {
        let bodyData = {
            status: value.title
        }
        axios.put(`${Config.userStories_url}/${item._id}`, bodyData)
            .then(response => {
                props.fetchStatusDetails(item.projectID);
            })
            .catch(error => {
                console.log(error)
            })
    }



    /**
     * 
     * Function to Delete
     */
    const deleteHandler = (x) => {
        axios.delete(`${Config.userStories_url}/${x._id}`)
          .then((res) => props.fetchStatusDetails(x.projectID))
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    return item && (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {item.assignee.map(i =>  `${i.userName}, `)}
                    <div>
                        <Button component={RouterLink} to={`/workItems/${item._id}`} >
                            <EditIcon align="right"></EditIcon>
                        </Button>
                        <Button onClick={() => deleteHandler(item)}>
                            <DeleteForeverIcon align="right" ></DeleteForeverIcon>
                        </Button></div>
                </Typography>
                <Typography className={classes.pos} color="textPrimary">
                    Title: {item.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Description: {item.description}
                </Typography>
                <Autocomplete
                    id="combo-box-demo"
                    options={List}
                    getOptionLabel={(option) => option.title}
                    disableClearable={true}
                    onChange={updateStatusDetails}
                    style={{ width: 150, paddingBottom: 10, paddingTop: 10 }}
                    renderInput={(params) => <TextField {...params} label="Completed" variant="outlined" />}
                />
                <Typography className={classes.pos} color="textSecondary">
                    Label: {item.labels}
                </Typography>
            </CardContent>
        </Card>)
}
const List = [
    { title: 'To do' },
    { title: 'In Progress' },
    { title: 'Completed' },
];