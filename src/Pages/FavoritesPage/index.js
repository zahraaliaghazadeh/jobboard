import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {getFavoriteJobs, updateJobFavorites} from "../../service/api";
import JobCard from "../../Components/JobCard";
import {URL_JOB_DETAILS_DYNAMIC, URL_ROOT} from "../../constants/routes";
import Select from "react-select";

const JOB_STATUS_OPTIONS = [
  {value: 'NOT_STARTED', label: 'Not Started'},
  {value: 'APPLIED', label: 'Applied'},
  {value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled'},
  {value: 'ACCEPTED', label: 'Accepted'},
  {value: 'REJECTED', label: 'Rejected'}
]

export default function FavoritesPage() {

  const [favoriteJobs, setFavoriteJobs] = useState([]);
  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      try {
        const res = await getFavoriteJobs();
        setFavoriteJobs(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFavoriteJobs();
  }, []);

  const onJobStatusChange = (jobId) => {
    return async (statusOption) => {
      try {
        await updateJobFavorites(jobId, statusOption.value);
        const jobIndex = favoriteJobs.findIndex((el) => (el._id === jobId))
        setFavoriteJobs([
          ...favoriteJobs.slice(0, jobIndex),
          {
            ...favoriteJobs[jobIndex],
            status: statusOption.value
          },
          ...favoriteJobs.slice(jobIndex + 1, favoriteJobs.length)
        ])
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col col-md-auto-12"}>
            {
                favoriteJobs && favoriteJobs.length === 0 && (
                    <div>
                      <h2>You don't have any favorite jobs yet. Search for jobs <a
                          href={URL_ROOT}>here</a></h2>
                    </div>
                )
            }
            {
                favoriteJobs && favoriteJobs.length > 0 && (
                    <div>
                      <h2 className={"favorite-jobs-main-title"}>Favorited Jobs:</h2>
                      {
                        favoriteJobs.map((job, index) => (
                            <div key={index}>
                              <a href={URL_JOB_DETAILS_DYNAMIC(job._id)} style={{
                                textDecoration: 'none'
                              }}>
                                <JobCard key={index} job={job}/>
                              </a>
                              <Select
                                  value={job.status && JOB_STATUS_OPTIONS.filter(
                                      (s) => (s.value === job.status))}
                                  onChange={onJobStatusChange(job._id)}
                                  options={JOB_STATUS_OPTIONS}
                              />
                            </div>
                        ))
                      }
                    </div>
                )
            }
          </div>
        </div>

      </div>
  )
}