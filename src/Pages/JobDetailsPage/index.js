import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { addJobToFavorites, getFavoriteJobs, getJob, removeJobFromFavorites } from "../../service/api";
import { Heart, HeartFill } from 'react-bootstrap-icons';

export default function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState();
    const [isJobFavorited, setIsJobFavorited] = useState();

    const onFavoriteClickHandler = (jobId) => {
      return async () => {
        try {
          await addJobToFavorites(jobId)
          setIsJobFavorited(true);
        } catch (err) {
          console.error(err)
          alert('Failed to add job to favorites. Please try again');
        }
      }
    }

  const onUnfavoriteClickHandler = (jobId) => {
    return async () => {
      try {
        await removeJobFromFavorites(jobId)
        setIsJobFavorited(false);
      } catch (err) {
        console.error(err)
        alert('Failed to remove job from favorites. Please try again');
      }
    }
  }

    useEffect(() => {
      const fetchJob = async () => {
        try {
          const job = await getJob(id)
          const favoriteJobIds = await getFavoriteJobs();
          setJob(job);
          setIsJobFavorited(favoriteJobIds.includes(job._id))
        } catch (err) {
          console.error(err);
        }
      }
      fetchJob();
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
                {
                  isJobFavorited ?
                    <div onClick={onUnfavoriteClickHandler(job._id)}>
                      <HeartFill />
                    </div>
                    :
                    <div onClick={onFavoriteClickHandler(job._id)}>
                      <Heart />
                    </div>
                }
              </div>
            )
          }
        </div>
    )
}