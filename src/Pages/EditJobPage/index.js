import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {deleteJob, getJob, updateJob} from "../../service/api";
import {URL_MY_JOBS} from "../../constants/routes";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import ImageUploader from "react-images-upload";
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EditJobPage() {
  const {id} = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isInvalidJob, setIsInvalidJob] = useState(false);

  const validateJob = (job) => {
    return job.title.length > 0 && job.companyName.length > 0
        && job.location.length > 0 && job.description.length > 0
        && job.email.length > 0
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const job = await getJob(id)
        // const favorites = await getFavoriteJobs();
        setJob(job);
        if (job.description) {
          setEditorState(EditorState.createWithContent(
              convertFromRaw(JSON.parse(job.description))))
        }
        // setIsJobFavorited(favorites.favoriteJobIds.includes(job._id))
      } catch (err) {
        console.error(err);
      }
    }
    fetchJob();
    // eslint-disable-next-line
  }, []);

  const onImageChange = (e, pictures) => {
    const pic = pictures[0] || '';
    setJob({
      ...job,
      image: pic
    })
  }

  const onUpdateClick = async () => {
    setIsInvalidJob(false);
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

  const onDescriptionEditorChange = (editorState) => {
    setEditorState(editorState);
    const raw = convertToRaw(editorState.getCurrentContent())
    setJob({
      ...job,
      description: JSON.stringify(raw)
    })
  }

  return (
      <div>
        {
            job && (
                <div className={"container edit-job-posting"}>
                  <div className={"row"}>
                    <div className={"col col-md-auto-12"}>
                      <form>
                        <div className={"form-group"}>
                          <input className={"form-control"} type="text" name="title"
                                 placeholder="title"
                                 value={job.title} onChange={(e) => {
                            setJob({
                              ...job,
                              title: e.target.value
                            })
                          }}/>
                          <input className={"form-control"} type="text"
                                 name="companyName"
                                 placeholder="Company Name"
                                 value={job.companyName}
                                 onChange={(e) => {
                                   setJob({
                                     ...job,
                                     companyName: e.target.value
                                   })
                                 }}/>
                          <input className={"form-control"} type="text"
                                 name="location"
                                 placeholder="location"
                                 value={job.location} onChange={(e) => {
                            setJob({
                              ...job,
                              location: e.target.value
                            })
                          }}/>
                          {/*<input type="text" name="description" placeholder="description" value={job.description} onChange={(e) => {*/}
                          {/*  setJob({*/}
                          {/*    ...job,*/}
                          {/*    description: e.target.value*/}
                          {/*  })*/}
                          {/*}}/>*/}
                          <input className={"form-control"} type="text" name="email"
                                 placeholder="email"
                                 value={job.email} onChange={(e) => {
                            setJob({
                              ...job,
                              email: e.target.value
                            })
                          }}/>
                          <input className={"form-control"} type="text" name="url"
                                 placeholder="url"
                                 value={job.url} onChange={(e) => {
                            setJob({
                              ...job,
                              url: e.target.value
                            })
                          }}/>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={"row"}>
                    <div className={"col col-md-auto-12"}>
                      <Editor
                          editorState={editorState}
                          // editorState={() => (job.description && convertFromRaw(job.description))}
                          onEditorStateChange={onDescriptionEditorChange}
                      />
                      {
                          job.image && (
                              <img alt="Logo" src={job.image} style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px'
                              }}/>
                          )
                      }
                      <ImageUploader
                          withIcon={false}
                          singleImage={true}
                          buttonText='Choose images'
                          onChange={onImageChange}
                          imgExtension={['.jpg', '.jpeg', '.gif', '.png',
                            '.gif']}
                          maxFileSize={80000}
                          label={'Max file size: 80kb'}
                          withLabel={true}
                      />
                      <button className={"btn btn-warning"}
                              onClick={onUpdateClick}>Update
                      </button>
                      <button className={"btn btn-warning"}
                              onClick={onDeleteClick}>Delete
                      </button>
                      {isInvalidJob && <p className="text-danger">Please correct
                        all
                        fields</p>}
                    </div>
                  </div>

                </div>
            )
        }
      </div>
  )
}
