import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { createJob } from "../../service/api";
import { URL_MY_JOBS } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: '',
    location: '',
    description: '',
    email: '',
    url: ''
  })
  const [isInvalidJob, setIsInvalidJob] = useState(false);

  const validateJob = (job) => {
    return job.title.length > 0 && job.companyName.length > 0 && job.location.length > 0 && job.description.length > 0 && job.email.length > 0
  }

  const onCreateClick = async () => {
    if (!validateJob(newJob)) {
      setIsInvalidJob(true)
      return;
    }
    setIsInvalidJob(false)
    try {
      await createJob(newJob)
      // setGlobalUsername(username);
      navigate(URL_MY_JOBS);
    } catch (err) {
      console.error(err)
      // if (err.response.data.errorCode === 'INVALID_CREDENTIALS') {
      //   setIsInvalidCredentials(true);
      // }
    }
  }

  return (
    <div>
      <input type="text" name="title" placeholder="title" value={newJob.title} onChange={(e) => {
        setNewJob({
          ...newJob,
          title: e.target.value
        })
      }}/>
      <input type="text" name="companyName" placeholder="Company Name" value={newJob.companyName} onChange={(e) => {
        setNewJob({
          ...newJob,
          companyName: e.target.value
        })
      }}/>
      <input type="text" name="location" placeholder="location" value={newJob.location} onChange={(e) => {
        setNewJob({
          ...newJob,
          location: e.target.value
        })
      }}/>
      <input type="text" name="description" placeholder="description" value={newJob.description} onChange={(e) => {
        setNewJob({
          ...newJob,
          description: e.target.value
        })
      }}/>
      <input type="text" name="email" placeholder="email" value={newJob.email} onChange={(e) => {
        setNewJob({
          ...newJob,
          email: e.target.value
        })
      }}/>
      <input type="text" name="url" placeholder="url" value={newJob.url} onChange={(e) => {
        setNewJob({
          ...newJob,
          url: e.target.value
        })
      }}/>
      <button onClick={onCreateClick}>Create</button>
      {isInvalidJob && <p className="text-danger">Please fill all fields</p>}
    </div>
  )
}
