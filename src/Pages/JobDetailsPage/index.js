import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {
  addJobToFavorites,
  getJob,
  removeJobFromFavorites
} from "../../service/api";
import {Heart, HeartFill} from 'react-bootstrap-icons';
import draftToHtml from 'draftjs-to-html';

export default function JobDetails() {
  const {id} = useParams();

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

  const color1 = "#ffd6a5";
  const color2 = "#e0e1dd";




  return (
      <div>
        <div className={"container job-details-post"} style={{
          background: `linear-gradient(90deg, rgba(237,220,210,1) 0%, rgba(255,255,255,1) 48%, rgba(255,214,165,1) 100%)`
          // background: `linear-gradient(90deg, rgba(237,220,210,1) 0%, rgba(224,225,221,1) 48%, rgba(255,214,165,1) 100%)`
          // background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(224,225,221,1) 48%, rgba(255,214,165,1) 100%)`
          // background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`
        }}>
          <div className={"row"}>
            <div className={"col col-md-auto-4"}>
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
                                  // height: '50px',
                                  borderRadius: '50%'
                                }}/>
                            )
                        }
                        <p>{job.companyName}</p>
                        <p>{job.location}</p>
                        {/*<p>{draftToHtml(job.description)}</p>*/}
                        <div dangerouslySetInnerHTML={{
                          __html: draftToHtml(JSON.parse(job.description))
                        }}/>
                        <p>{job.email}</p>
                        <div>{job.timestamp.replace("T", "  at ").replace(RegExp("\.[^.]*$"), "")}</div>

                        {
                          job.isLoggedIn ? (job.isFavorited ?
                              <div onClick={onUnfavoriteClickHandler(job._id)}>
                                <HeartFill/>
                              </div>
                              :
                              <div onClick={onFavoriteClickHandler(job._id)}>
                                <Heart/>
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
          </div>
        </div>
      </div>
  )
}