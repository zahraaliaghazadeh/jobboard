const URL_PREFIX = 'http://localhost:8000/api/jobboard';

const PATH_JOB_ID = '/job/id';
const PATH_JOB_SEARCH = '/job/search';
const PATH_JOB_FAVORITES = '/job/favorite';

const QUERY_PARAM_SEARCH = 'query';

const axios = require('axios').default;


export const getJob = async (id) => {
  const path = `${URL_PREFIX}${PATH_JOB_ID}/${id}`

  const res = await axios.get(path);
  return res.data;
}

export const queryJobs = async (searchQuery) => {
  const path = `${URL_PREFIX}${PATH_JOB_SEARCH}?${QUERY_PARAM_SEARCH}=${encodeURIComponent(searchQuery)}`

  const res = await axios.get(path);
  return res.data;
}

export const getFavoriteJobs = async () => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}`

  const res = await axios.get(path);
  return res.data.favoriteJobIds;
}

export const addJobToFavorites = async (jobId) => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}`

  const res = await axios.post(path, {
    jobId: jobId
  });
  return res;
}

export const removeJobFromFavorites = async (jobId) => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}/${jobId}`

  const res = await axios.delete(path);
  return res;
}