import React from "react";

const JobCard = (props) => {
  const { job } = props;
  return (
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
      <img
        alt="logo"
        src={job.image}
        style={{
          height: '50px',
        }}
      />
    </div>
  )
}

export default JobCard;