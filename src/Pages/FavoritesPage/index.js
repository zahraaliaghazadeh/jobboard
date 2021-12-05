import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { getFavoriteJobs } from "../../service/api";
import JobCard from "../../Components/JobCard";
import { URL_JOB_DETAILS_DYNAMIC, URL_ROOT } from "../../constants/routes";
import { Link } from "react-bootstrap-icons";



export default function FavoritesPage() {

  const [favoriteJobs, setFavoriteJobs] = useState([]);
  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      try {
        const favorites = await getFavoriteJobs();
        const favoriteJobs = favorites.favoriteJobs;
        setFavoriteJobs(favoriteJobs);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFavoriteJobs();
  }, []);

  return (
    <div>
      {
        favoriteJobs && favoriteJobs.length === 0 && (
          <div>
            <h2>You don't have any favorite jobs yet. Search for jobs <a href={URL_ROOT}>here</a></h2>
          </div>
        )
      }
      {
        favoriteJobs && favoriteJobs.length > 0 && (
          <div>
            <h2>Favorited Jobs:</h2>
            {
              favoriteJobs.map((job, index) => (
                <a key={index} href={URL_JOB_DETAILS_DYNAMIC(job._id)} style={{
                  textDecoration: 'none'
                }}>
                  <JobCard key={index} job={job} />
                </a>
              ))
            }
          </div>
        )
      }
    </div>

  )
}