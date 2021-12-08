import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { URL_JOB_DETAILS_DYNAMIC, URL_SEARCH } from "../../constants/routes";
import { queryJobs } from "../../service/api";
import JobCard from "../../Components/JobCard";


export default function LandingPage() {
  const [jobs, setJobs] = useState();

  useEffect(() => {
    const getQueryJobs = async () => {
      try {
        const jobs = await queryJobs('');
        setJobs(jobs);
      } catch (err) {
        console.error(err);
      }
    }
    getQueryJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="landing-page" style={{
      // backgroundImage: process.env.PUBLIC_URL + 'bg01.jpg'
      // backgroundImage: 'public/bg01.jpg'
      // backgroundImage: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg'
    }}>
      <div className="container">
        <div className="row margin-top-xl">
          <div className="col-md-auto welcome-container">
            <h3 className="welcome-message">Welcome!</h3>
          </div>
        </div>
        <div className="row margin-top-s">
          <form action={URL_SEARCH} method={"get"}>
            <div className="col-md-auto">
              <input
                type="text"
                name="q"
                placeholder="Search jobs"
                aria-label="Search"
                className="search-job-input"
              />
            </div>
            <div className="col-md-auto">
              <button type="submit" className="btn btn-warning search-button">Search</button>
            </div>
          </form>
        </div>
        {
          jobs && jobs.map((job, index) => (
            <a key={index} href={URL_JOB_DETAILS_DYNAMIC(job._id)} style={{
              textDecoration: 'none'
            }}>
              <JobCard key={index} job={job} />
            </a>
          ))
        }
      </div>

    </div>


  )
}
