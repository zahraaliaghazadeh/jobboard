import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { addJobToFavorites, getJob, removeJobFromFavorites } from "../../service/api";
import { Heart, HeartFill } from 'react-bootstrap-icons';
import draftToHtml from 'draftjs-to-html';

export default function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState();

    const onFavoriteClickHandler = (jobId) => {
      return async () => {
        try {
          await addJobToFavorites(jobId, 'NOT_STARTED')
          setJob({
            ...job,
            isFavorited: true
          })
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
        setJob({
          ...job,
          isFavorited: false
        })
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

    return (
        <div>
          {
            job && (
              <div style={{
                margin: '30px'
              }}>
                <h1>{job.title}</h1>
                {
                  job.image && (
                    <img alt="logo" src={job.image} style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '8px'
                    }}/>
                  )
                }
                <p>{job.companyName}</p>
                <p>{job.location}</p>
                {/*<p>{draftToHtml(job.description)}</p>*/}
                <div dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(job.description))}} />
                <p>{job.email}</p>
                <div>{job.timestamp}</div>

                {
                  job.isLoggedIn ? (job.isFavorited ?
                    <div onClick={onUnfavoriteClickHandler(job._id)}>
                      <HeartFill />
                    </div>
                    :
                    <div onClick={onFavoriteClickHandler(job._id)}>
                      <Heart />
                    </div>) : null
                }
                {/*{*/}
                {/*  isJobFavorited ?*/}
                {/*    <div onClick={onUnfavoriteClickHandler(job._id)}>*/}
                {/*      <HeartFill />*/}
                {/*    </div>*/}
                {/*    :*/}
                {/*    <div onClick={onFavoriteClickHandler(job._id)}>*/}
                {/*      <Heart />*/}
                {/*    </div>*/}
                {/*}*/}
              </div>
            )
          }
        </div>
    )
}