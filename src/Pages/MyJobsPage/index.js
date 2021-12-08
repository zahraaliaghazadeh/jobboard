import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { getJobs } from "../../service/api";
import JobCard from "../../Components/JobCard";
import { URL_CREATE_JOB, URL_EDIT_JOB_DYNAMIC } from "../../constants/routes";



export default function MyJobsPage() {

  const [myJobs, setMyJobs] = useState([]);
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const jobs = await getJobs();
        setMyJobs(jobs.jobs);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMyJobs();
  }, []);

  const onAddNewJobClick = () => {
    window.location = URL_CREATE_JOB;
  }

  console.log(myJobs);

  return (
    <div>
      <button onClick={onAddNewJobClick}>
        Add new job +
      </button>
      {
        myJobs && myJobs.length > 0 && (
          <div>
            <h2>My Jobs:</h2>
            {
              myJobs.map((job, index) => (
                <a key={index} href={URL_EDIT_JOB_DYNAMIC(job._id)} style={{
                  textDecoration: 'none'
                }}>
                  <JobCard job={job} />
                </a>
              ))
            }
          </div>
        )
      }
    </div>

  )
}