import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useLocation } from "react-router-dom";
import { queryJobs } from "../../service/api";
import { parse } from 'query-string';
import { Link } from 'react-router-dom';
import { URL_JOB_DETAILS_DYNAMIC } from "../../constants/routes";


export default function SearchPage() {
  const location = useLocation();
  const query = parse(location.search).q;
  const [jobs, setJobs] = useState();

  useEffect(() => {
    const getQueryJobs = async () => {
      try {
        const jobs = await queryJobs(query);
        setJobs(jobs);
      } catch (err) {
        console.error(err);
      }
    }
    getQueryJobs();
  }, []);

  console.log(jobs);
  return (
    <div>
      {
        jobs && jobs.length === 0 && (
          <div>
            <h2>No jobs found for: {query}</h2>
          </div>
        )
      }
      {
        jobs && jobs.map((job, index) => (
          <Link to={URL_JOB_DETAILS_DYNAMIC(job._id)} style={{
            textDecoration: 'none'
          }}>
            <div key={index} style={{
              color: 'black',
              margin: '10px 20px',
              border: 'solid',
              borderRadius: '10px',
              padding: '10px'
            }}>
              <h1>{job.title}</h1>
              <p>{job.companyName}</p>
              <p>{job.location}</p>
              <p><a href={`mailto:${job.email}`}>{job.email}</a></p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}