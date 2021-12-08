// const URL_PREFIX = 'http://localhost:8000/api/jobboard';
const URL_PREFIX = '/api/jobboard';

const PATH_USERNAME = '/username';
const PATH_LOGIN = '/login';
const PATH_LOGOUT = '/logout';
const PATH_REGISTER = '/register';
const PATH_JOB_ID = '/job/id';
const PATH_JOB = '/job';
const PATH_JOB_SEARCH = '/job/search';
const PATH_JOB_FAVORITES = '/job/favorite';

const QUERY_PARAM_SEARCH = 'query';

const axios = require('axios').default;


export const login = async (username, password) => {
  const path = `${URL_PREFIX}${PATH_LOGIN}`

  const res = await axios.post(path, {
    username: username,
    password: password
  }, {
    withCredentials: true
  });
  return res.data;
}

export const logout = async () => {
  const path = `${URL_PREFIX}${PATH_LOGOUT}`

  const res = await axios.get(path, {
    withCredentials: true
  });
  return res.data;
}

export const register = async (username, password) => {
  const path = `${URL_PREFIX}${PATH_REGISTER}`

  const res = await axios.post(path, {
    username: username,
    password: password
  }, {
    withCredentials: true
  });
  return res.data;
}

export const getUsername = async () => {
  const path = `${URL_PREFIX}${PATH_USERNAME}`

  const res = await axios.get(path, {
    withCredentials: true
  });
  return res.data.username;
}

export const getJob = async (id) => {
  const path = `${URL_PREFIX}${PATH_JOB_ID}/${id}`

  const res = await axios.get(path, {
    withCredentials: true
  });
  return res.data;
}

export const queryJobs = async (searchQuery) => {
  const path = `${URL_PREFIX}${PATH_JOB_SEARCH}?${QUERY_PARAM_SEARCH}=${encodeURIComponent(searchQuery)}`


  const res = await axios.get(path, {
    withCredentials: true
  });
  return res.data;
}

export const createJob = async (job) => {
  const path = `${URL_PREFIX}${PATH_JOB}`


  const res = await axios.post(path, {
    job: job
  }, {
    withCredentials: true
  });
  return res;
}

export const updateJob = async (jobId, job) => {
  const path = `${URL_PREFIX}${PATH_JOB}/${jobId}`


  const res = await axios.put(path, {
    job: job
  }, {
    withCredentials: true
  });
  return res;
}

export const deleteJob = async (jobId) => {
  const path = `${URL_PREFIX}${PATH_JOB}/${jobId}`


  const res = await axios.delete(path, {
    withCredentials: true
  });
  return res;
}

export const getJobs = async () => {
  const path = `${URL_PREFIX}${PATH_JOB}`


  const res = await axios.get(path, {
    withCredentials: true
  });
  return res.data;
}

export const getFavoriteJobs = async () => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}`


  const res = await axios.get(path, {
    withCredentials: true
  });
  // return res.data.favoriteJobs.map((j) => (j._doc));
  return res.data.favoriteJobs;
}

export const addJobToFavorites = async (jobId, jobStatus) => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}`


  const res = await axios.post(path, {
    id: jobId,
    status: jobStatus
  }, {
    withCredentials: true
  });
  return res;
}

export const updateJobFavorites = async (jobId, jobStatus) => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}/${jobId}`


  const res = await axios.put(path, {
    id: jobId,
    status: jobStatus
  }, {
    withCredentials: true
  });
  return res;
}


export const removeJobFromFavorites = async (jobId) => {
  const path = `${URL_PREFIX}${PATH_JOB_FAVORITES}/${jobId}`


  const res = await axios.delete(path, {
    withCredentials: true
  });
  return res;
}
