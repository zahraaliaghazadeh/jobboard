import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {createJob} from "../../service/api";
import {URL_MY_JOBS} from "../../constants/routes";
import {useNavigate} from "react-router-dom";
import ImageUploader from 'react-images-upload';
import {convertToRaw} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: '',
    location: '',
    description: '',
    email: '',
    url: '',
    image: ''
  })
  const [isInvalidJob, setIsInvalidJob] = useState(false);

  const validateJob = (job) => {
    return job.title.length > 0 && job.companyName.length > 0
        && job.location.length > 0 && job.description.length > 0
        && job.email.length > 0
  }

  const onCreateClick = async () => {
    if (!validateJob(newJob)) {
      setIsInvalidJob(true)
      return;
    }
    setIsInvalidJob(false)
    try {
      await createJob(newJob)
      navigate(URL_MY_JOBS);
    } catch (err) {
      console.error(err)
    }
  }

  const onImageChange = (e, pictures) => {
    const pic = pictures[0] || '';
    setNewJob({
      ...newJob,
      image: pic
    })
  }

  const onDescriptionEditorChange = (editorState) => {
    const raw = convertToRaw(editorState.getCurrentContent())
    setNewJob({
      ...newJob,
      description: JSON.stringify(raw)
    })
  }

  return (
      <div className={"container create-job-posting"}>
        <div className={"row"}>
          <div className={"col col-md-auto-12"}>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" name="title"
                       placeholder="title"
                       value={newJob.title} onChange={(e) => {
                  setNewJob({
                    ...newJob,
                    title: e.target.value
                  })
                }}/>
              </div>
              <div className={"form-group"}>
                <input className="form-control" type="text" name="companyName" placeholder="Company Name"
                       value={newJob.companyName} onChange={(e) => {
                  setNewJob({
                    ...newJob,
                    companyName: e.target.value
                  })
                }}/>
              </div>
              <div className={"form-group"}>

                <input className="form-control" type="text" name="location" placeholder="location"
                       value={newJob.location} onChange={(e) => {
                  setNewJob({
                    ...newJob,
                    location: e.target.value
                  })
                }}/>

              </div>
              <div className={"form-group"}>
                <input className="form-control" type="text" name="email" placeholder="email"
                       value={newJob.email} onChange={(e) => {
                  setNewJob({
                    ...newJob,
                    email: e.target.value
                  })
                }}/>
              </div>
              <div className={"form-group"}>
                <input className="form-control" type="text" name="url" placeholder="url"
                       value={newJob.url}
                       onChange={(e) => {
                         setNewJob({
                           ...newJob,
                           url: e.target.value
                         })
                       }}/>
              </div>
            </form>
            <div className={"row"}>
              <div className={"col col-md-auto-12"}>


                <Editor
                    // editorState={editorState}
                    // initialEditorState={}
                    onEditorStateChange={onDescriptionEditorChange}
                />
                {
                    newJob.image && (
                        <img alt="Logo" src={newJob.image} style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '8px'
                        }}/>
                    )
                }
                <ImageUploader
                    withIcon={false}
                    // withPreview={true}
                    singleImage={true}
                    buttonText='Choose images'
                    onChange={onImageChange}
                    imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                    maxFileSize={80000}
                    label={'Max file size: 80kb'}
                    withLabel={true}
                />
              </div>
              <div className={"row"}>
                <div className={"col col-md-auto-12"}>
                  <button className={"btn btn-warning"} onClick={onCreateClick}>Create</button>
                  {isInvalidJob && <p className="text-danger">Please fill all
                    fields</p>}
                </div>
              </div>


            </div>
          </div>

        </div>

      </div>

  )
}
