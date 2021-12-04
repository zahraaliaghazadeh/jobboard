import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useLocation } from "react-router-dom";
import { queryJobs } from "../../service/api";
import { parse } from 'query-string';
import JobCard from "../../Components/JobCard";


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
    // eslint-disable-next-line
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
          <JobCard key={index} job={job} />
        ))
      }
    </div>
  )
}