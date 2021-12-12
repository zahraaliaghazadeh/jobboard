import React from "react";

const JobCard = (props) => {
  const { job } = props;
  const color1 = "#ffd6a5";
  const color2 = "#e0e1dd";

  return (
    <div style={{
      color: "#2b2d42",
      margin: '10px 20px',
      border: 'solid 2px',
      borderRadius: '10px',
      padding: '10px',
      background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`
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
          borderRadius: '50%'
        }}
      />
    </div>
  )
}

export default JobCard;