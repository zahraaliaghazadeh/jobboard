import { URL_JOB_DETAILS_DYNAMIC } from "../../constants/routes";
import { Link } from "react-router-dom";
import React from "react";

const JobCard = (props) => {
  const { job } = props;
  return (
    <Link to={URL_JOB_DETAILS_DYNAMIC(job._id)} style={{
      textDecoration: 'none'
    }}>
      <div style={{
        color: 'black',
        margin: '10px 20px',
        border: 'solid',
        borderRadius: '10px',
        padding: '10px'
      }}>
        <h1>{job.title}</h1>
        <p>{job.companyName}</p>
        <p>{job.location}</p>
        <p>{job.email}</p>
      </div>
    </Link>
  )
}

export default JobCard;