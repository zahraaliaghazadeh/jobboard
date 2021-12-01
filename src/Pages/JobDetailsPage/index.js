import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const URL_PREFIX = 'http://localhost:8000/api/jobboard/job/id/';

export default function JobDetails() {
    const { id } = useParams();
    const axios = require('axios').default;

    const [job, setJob] = useState();

    useEffect(() => {
      axios.get(`${URL_PREFIX}${id}`)
        .then((res) => {
          setJob(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
    }, []);

    return (
        <div>
          {
            job && (
              <div>
                <h1>{job.title}</h1>
                <p>{job.companyName}</p>
                <p>{job.location}</p>
                <p>{job.description}</p>
                <p>{job.email}</p>
              </div>
            )
          }
        </div>
    )
}