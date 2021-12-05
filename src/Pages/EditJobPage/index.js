import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { deleteJob, getJob, updateJob } from "../../service/api";
import { URL_MY_JOBS } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

export default function EditJobPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState();
  const [isInvalidJob, setIsInvalidJob] = useState(false);

  const validateJob = (job) => {
    return job.title.length > 0 && job.companyName.length > 0 && job.location.length > 0 && job.description.length > 0 && job.email.length > 0
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const job = await getJob(id)
        // const favorites = await getFavoriteJobs();
        setJob(job);
        // setIsJobFavorited(favorites.favoriteJobIds.includes(job._id))
      } catch (err) {
        console.error(err);
      }
    }
    fetchJob();
    // eslint-disable-next-line
  }, []);

  const onUpdateClick = async () => {
    if (!validateJob(job)) {
      setIsInvalidJob(true)
      return;
    }
    setIsInvalidJob(false)
    try {
      await updateJob(id, job);
      navigate(URL_MY_JOBS);
    } catch (err) {
      console.error(err)
    }
  }

  const onDeleteClick = async () => {
    try {
      await deleteJob(id);
      navigate(URL_MY_JOBS);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {
        job && (
          <div>
            <input type="text" name="title" placeholder="title" value={job.title} onChange={(e) => {
              setJob({
                ...job,
                title: e.target.value
              })
            }}/>
            <input type="text" name="companyName" placeholder="Company Name" value={job.companyName} onChange={(e) => {
              setJob({
                ...job,
                companyName: e.target.value
              })
            }}/>
            <input type="text" name="location" placeholder="location" value={job.location} onChange={(e) => {
              setJob({
                ...job,
                location: e.target.value
              })
            }}/>
            <input type="text" name="description" placeholder="description" value={job.description} onChange={(e) => {
              setJob({
                ...job,
                description: e.target.value
              })
            }}/>
            <input type="text" name="email" placeholder="email" value={job.email} onChange={(e) => {
              setJob({
                ...job,
                email: e.target.value
              })
            }}/>
            <input type="text" name="url" placeholder="url" value={job.url} onChange={(e) => {
              setJob({
                ...job,
                url: e.target.value
              })
            }}/>
            <button onClick={onUpdateClick}>Update</button>
            <button onClick={onDeleteClick}>Delete</button>
            {isInvalidJob && <p className="text-danger">Please correct all fields</p>}
          </div>
        )
      }
    </div>
  )
}
