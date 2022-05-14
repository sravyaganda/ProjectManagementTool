import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import Config from '../../Configuration/Config.json';
import axios from '../../middleware/axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import './Form.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '29.5ch',
    },
  },
}));

// New Project Form to create a new Project

export default function NewProjectForm(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();


  /* initial state using useState Hooks*/ 

  const [titleValue, setTitleValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [ownerValue, setOwnerValue] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios.get(Config.users_url).then((res) => {
        setMembers(res.data);
      });
    };
    fetchUsers();
  }, []);


  // set inital state from the props if available
  useEffect(() => {
    setTitleValue(props.title ? props.title : '');
    setDescValue(props.description ? props.description : '');
    setMembers(props.members ? props.members : []);
    setOwnerValue(props.owner ? props.owner : '');
    setSelectedMembers(props.selectedMembers ? props.selectedMembers : '');
  }, []);


  // Action functions
  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescValue(event.target.value);
  };

  const handleMembers = (item) => {
    setSelectedMembers(item);
  };

  const handleSubmitProject = async () => {

    // formdata for payload
    let formData = {
      title: titleValue,
      description: descValue,
      members: selectedMembers.map((i) => {
        let obj = {
          _id: i._id,
          emailId: i.emailId,
          userName: i.userName,
        };
        return obj;
      }),
      owner: props.updateMode ? props.owner : ownerValue,
      ownerName: props.ownerName,
    };


    // Resuable component, check if update or create to identify the request method

    props.updateMode
      ? await axios
          .put(`${Config.projects_url}/${params.slug}/${params.id}`, formData)
          .then((res) => {
            props.handleClose();
          })
          .catch((err) => console.log(err))
      : await axios
          .post(Config.projects_url, formData)
          .then((res) => {
            let projectSlug = res.data.newItem.slug;
            let projectId = res.data.newItem._id;
            console.log(res.data.newItem, 'slksksk');
            navigate(`/projects/${projectSlug}/${projectId}`);
          })
          .catch((err) => console.log(err));
  };

  return (
    <div className='centerAlign'>
      <div className='inputContainer'>
        <form className={classes.root} noValidate autoComplete='off'>
          {!props.updateMode && <h4>Please enter Project Details:</h4>}
          {!props.updateMode && <Divider />}
          <TextField
            required
            placeholder='Enter Title'
            id='standard-required'
            label='Title'
            defaultValue='Hello World'
            value={titleValue}
            onChange={handleTitleChange}
            variant='outlined'
          />
          <Divider />
          <TextField
            id='standard-multiline-static'
            label='Description'
            multiline
            rows={4}
            defaultValue='Default Value'
            placeholder='Enter Description'
            value={descValue}
            onChange={handleDescChange}
            variant='outlined'
          />
          <Divider />
          <Dropdown
            align='center'
            handleMembers={handleMembers}
            members={members}
            selectedMembers={props.selectedMembers}
          />
          <br />
          <div className='centerAlign'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmitProject}
              fullWidth
            >
              Submit
            </Button>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
}
