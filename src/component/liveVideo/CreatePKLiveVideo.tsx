import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import Selector from "../../extra/Selector";
import Input from "../../extra/Input";
import Button from "../../extra/Button";
import { useSelector } from "react-redux";
import { allUsers } from "../../store/userSlice";
import { closeDialog } from "../../store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { projectName } from "@/util/config";
import {
  addLiveVideo,
  addPKLiveVideo,
  updateLiveVideo,
} from "@/store/liveVideoSlice";
import { uploadFile } from "@/store/adminSlice";
import { uploadMultipleFiles } from "@/store/postSlice";


interface CreateFakeVideoProps { }

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "background.paper",
  borderRadius: "5px",
  border: "1px solid #C9C9C9",
  boxShadow: "24px",
};

const CreatePKLiveVideo: React.FC<CreateFakeVideoProps> = () => {
  const { dialogue, dialogueType, dialogueData } = useSelector(
    (state: any) => state.dialogue
  );

  const { fakeUserData } = useSelector((state: RootStore) => state.user);
  const [mongoId, setMongoId] = useState<string>("");
  const [addVideoOpen, setAddVideoOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [videoTime, setVideoTime] = useState<number>();
  const [fakePostDataGet, setFakeUserDataGet] = useState<any[]>([]);
  const [video, setVideo] = useState<{
    file: string | null;
    thumbnailBlob: File | null;
  }>({
    file: null,
    thumbnailBlob: null,
  });
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<any>();
  const [thumbnailKey, setThumbnailKey] = useState<number>(0);
  const [fileData, setFileData] = useState<any>([]);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<any>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<any>([]);
  const [previewImageFile, setPreviewImageFile] = useState<any>([]);
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);
  const [thumbnailType, setThumbnailType] = useState<any>(2);
  const [mediaSourceKind, setMediaSourceKind] = useState<any>(2);
  // video urls
  const [videoUrl1, setVideoUrl1] = useState<any>();
  const [videoUrl2, setVideoUrl2] = useState<any>();
  const [newVideoFile1, setNewVideoFile1] = useState<File | null>(null);
  const [newVideoFile2, setNewVideoFile2] = useState<File | null>(null);

  // video thumbnail urls
  const [videoThumbUrl1, setVideoThumbUrl1] = useState<any>();
  const [videoThumbUrl2, setVideoThumbUrl2] = useState<any>();
  const [newThumbFile1, setNewThumbFile1] = useState<File | null>(null);
  const [newThumbFile2, setNewThumbFile2] = useState<File | null>(null);

  const [pkMediaSources, setpkMediaSources] = useState([]);
  const [pkPreviewImages, setpkPreviewImages] = useState([]);



  const [error, setError] = useState({
    video: "",
    userId: "",
    country: "",
    mediaSourceKind: "",
    thumbnailType: "",
    urlError1: "",
    urlError2: "",
    urlError3: "",
    urlError4: "",
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    setAddVideoOpen(dialogue);
    if (dialogueData) {
      setMongoId(dialogueData?._id);
      setUserId(dialogueData?.userId || "");
      setVideoPath(dialogueData?.videoUrl || null);
      setThumbnail(dialogueData?.videoImage || []);
      setVideoTime(dialogueData?.videoTime || 0);
      setPreviewVideoUrl(dialogueData?.videoUrl || []);
      setPreviewImageUrl(dialogueData?.videoImage || []);
      setpkMediaSources(dialogueData?.pkMediaSources || []);
      setThumbnailType(dialogueData?.thumbnailType || []);
      setpkPreviewImages(dialogueData?.pkPreviewImages || []);
      setVideoUrl1(dialogueData?.pkMediaSources[0] || null);
      setVideoUrl2(dialogueData?.pkMediaSources[1] || null);
      setVideoThumbUrl1(dialogueData?.pkPreviewImages[0] || null);
      setVideoThumbUrl2(dialogueData?.pkPreviewImages[1] || null);
      setMediaSourceKind(dialogueData?.mediaSourceKind || null);
    }
  }, [dialogue, dialogueData]);
  useEffect(() => {
    const payload: any = {
      type: "fakeUser",
      start: 1,
      limit: 100,
      startDate: "All",
      endDate: "All",
    };
    dispatch(allUsers(payload));
  }, []);

  useEffect(() => {
    setFakeUserDataGet(fakeUserData);
  }, [fakeUserData]);

  let folderStructure: string = `${projectName}/admin/livevideoUrl`;

  const getVideoUrl = async (file, thumbnailFile) => {
    const formData = new FormData();

    formData.append("folderStructure", folderStructure);
    formData.append("keyName", file.name);
    formData.append("content", file);

    const payloadformData: any = {
      data: formData,
    };

    if (formData) {
      const response: any = await dispatch(
        uploadFile(payloadformData)
      ).unwrap();

      if (response?.data?.status) {
        if (response.data.url) {
          setVideo({
            file: response.data.url,
            thumbnailBlob: thumbnailFile,
          });
          setVideoPath(response.data.url);
        }
      }
    }
  };

  let folderStructureThubnailImage: string = `${projectName}/admin/livevideoImage`;

  const handleVideoUpload = async () => {

    if (!newVideoFile1 && !newVideoFile2) {
      return [videoUrl1, videoUrl2]; // use existing ones
    }

    if (!fileData) {
      setError((prev) => ({
        ...prev,
        video: "Please select a valid video file!",
      }));
      return null;
    }

    try {
      const formData: any = new FormData();
      formData.append("folderStructure", `${projectName}/admin/livevideoImage`);

      let uploadMap = []; // to track positions: [0] for video1, [1] for video2

      if (newVideoFile1) {
        formData.append("content", newVideoFile1);
        uploadMap.push(0);
      }

      if (newVideoFile2) {
        formData.append("content", newVideoFile2);
        uploadMap.push(1);
      }

      let thumbnailBlob1 = null;
      let thumbnailBlob2 = null;

      const payload: any = {
        data: formData,
      };
      const response: any = await dispatch(
        uploadMultipleFiles(payload)
      ).unwrap();

      if (response?.data?.status) {
        const uploadedUrls = response.data.urls;

        let finalVideoUrls = [videoUrl1, videoUrl2];
        uploadMap.forEach((position, index) => {
          finalVideoUrls[position] = uploadedUrls[index];
        });

        return finalVideoUrls;
      } else {
        throw new Error("Upload failed: Invalid response from server.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setError((prev) => ({
        ...prev,
        video: "Failed to upload video. Please try again.",
      }));
      return null;
    }
  };

  const hanldeThumbUpload = async () => {
    if (!pkPreviewImages.length && dialogueData?.pkPreviewImages) {
      return dialogueData?.pkPreviewImages
    }
    // if(thumbnailType == 1) return;

    if (!pkPreviewImages.length) {
      setError((prev) => ({
        ...prev,
        video: "Please select a valid video file!",
      }));
      return null;
    }

    try {
      const formData: any = new FormData();
      let fileKeys: string[] = [];

      if (newThumbFile1) {
        formData.append("content", newThumbFile1);
        fileKeys.push("1");
      }
      if (newThumbFile2) {
        formData.append("content", newThumbFile2);
        fileKeys.push("2");
      }

      if (fileKeys.length === 0) {
        return null; // No new thumbnails uploaded
      }
      formData.append("folderStructure", `${projectName}/admin/livevideoImage`);

      // formData.append("keyName", pkPreviewImages[0].name || pkPreviewImages[1].name);
      formData.append("keyName", newThumbFile1?.name || newThumbFile2?.name);
      // formData.append("content", pkPreviewImages[0]);
      // formData.append("content", pkPreviewImages[1]);

      const payload: any = {
        data: formData,
      };
      const response: any = await dispatch(
        uploadMultipleFiles(payload)
      ).unwrap();

      if (response?.data?.status) {

        // return response?.data?.urls;
        const uploadedUrls = response?.data?.urls;

        // Return based on which thumbnails were uploaded
        let finalThumbs = [...pkPreviewImages]; // use previous ones

        if (fileKeys.includes("1")) finalThumbs[0] = uploadedUrls[0];
        if (fileKeys.includes("2")) finalThumbs[1] = uploadedUrls[fileKeys.indexOf("2")];

        return finalThumbs;
      } else {
        throw new Error("Upload failed: Invalid response from server.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setError((prev) => ({
        ...prev,
        video: "Failed to upload video. Please try again.",
      }));
      return null;
    }
  };

  const handleVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError((prev) => ({ ...prev, video: "Please select a video!" }));
      return;
    }
    setFileData([...fileData, file]);
    try {
      const videoURL = URL.createObjectURL(file);
      setVideoUrl1(videoURL);
      setPreviewVideoUrl([...previewVideoUrl, videoURL]);
      setNewVideoFile1(file);

      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = videoURL;

      video.onloadedmetadata = () => {
        setVideoTime(video.duration);
        video.currentTime = 1;
      };

      video.onseeked = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              setThumbnailBlob(blob);
              // setPreviewImageUrl([
              //   ...previewImageUrl,
              //   URL.createObjectURL(blob),
              // ]);
              setPreviewImageFile((prev) => [blob, prev?.[1]]);

              setError((prev) => ({ ...prev, video: "" }));
            }
          }, "image/jpeg");
        }
      };

      video.onerror = () => {
        setError((prev) => ({
          ...prev,
          video: "Error loading video. Please try a different format.",
        }));
        URL.revokeObjectURL(videoURL);
      };
    } catch (error) {
      console.error("Error processing video file:", error);
      setError((prev) => ({
        ...prev,
        video: "Error processing video file. Please try again.",
      }));
    }
  };
  const handleVideo1 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError((prev) => ({ ...prev, video: "Please select a video!" }));
      return;
    }
    setFileData([...fileData, file]);
    try {
      const videoURL = URL.createObjectURL(file);
      setVideoUrl2(videoURL);
      setPreviewVideoUrl([...previewVideoUrl, videoURL]);
      setNewVideoFile2(file);

      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = videoURL;

      video.onloadedmetadata = () => {
        setVideoTime(video.duration);
        video.currentTime = 1;
      };

      video.onseeked = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              setThumbnailBlob(blob);
              setPreviewImageFile((prev) => [prev?.[0], blob]);
              // setPreviewImageFile([...previewImageFile, blob]);
              // setPreviewImageUrl([
              //   ...previewImageUrl,
              //   URL.createObjectURL(blob),
              // ]);
              setError((prev) => ({ ...prev, video: "" }));
            }
          }, "image/jpeg");
        }
      };

      video.onerror = () => {
        setError((prev) => ({
          ...prev,
          video: "Error loading video. Please try a different format.",
        }));
        URL.revokeObjectURL(videoURL);
      };
    } catch (error) {
      console.error("Error processing video file:", error);
      setError((prev) => ({
        ...prev,
        video: "Error processing video file. Please try again.",
      }));
    }
  };

  const handleThumb1Change = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set preview image for UI
    setVideoThumbUrl1(URL.createObjectURL(file));
    setNewThumbFile1(e.target.files[0]);
    setpkPreviewImages([file, pkPreviewImages[1]]);
  };

  const handleThumb2Change = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set preview image for UI
    setVideoThumbUrl2(URL.createObjectURL(file));

    // Save new file for upload
    setNewThumbFile2(file);

    // Keep existing thumbnail 1
    setpkPreviewImages([pkPreviewImages[0], file]);
  };

  const generateThumbnailBlob = async (file: File) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        video.currentTime = 1; // Set to capture the frame at 1 second
      };

      video.onseeked = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };

      const objectURL = URL.createObjectURL(file);
      video.src = objectURL;

      return () => {
        URL.revokeObjectURL(objectURL);
      };
    });
  };

  const handleCloseAddCategory = () => {
    setAddVideoOpen(false);
    dispatch(closeDialog());
  };

  const handleSubmit = async () => {
    // debugger;

    if (
      !userId
    ) {
      let error: any = {};
      if (!userId) error.userId = "User Is Required !";

      return setError({ ...error });
    } else {
      const uploadResult = await handleVideoUpload();
      const uploadResultThumb = await hanldeThumbUpload();

      const finalThumbUrls = thumbnailType === 1
        ? [videoThumbUrl1, videoThumbUrl2]
        : uploadResultThumb || [videoThumbUrl1, videoThumbUrl2];

      // const uploadResult = [];
      let payloadData: any = {
        liveStreamMode: 2,
        thumbnailType: thumbnailType,
        mediaSourceKind: mediaSourceKind,
        pkMediaSources:
          mediaSourceKind == 1
            ? [videoUrl1, videoUrl2]
            : [uploadResult[0], uploadResult[1]],
        pkPreviewImages:
          finalThumbUrls,
        userId:
          typeof userId === "string"
            ? userId
            : (userId as { _id: string })?._id,
      };

      if (mongoId) {
        payloadData.videoId = mongoId;
        let payload: any = {
          data: payloadData,
        };
        dispatch(updateLiveVideo(payload));
      } else {
        let payload: any = { data: payloadData };
        dispatch(addPKLiveVideo(payload));
      }
      dispatch(closeDialog());
    }
  };

  const fetchAndConvertToFile = async (videoUrl) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const file = new File([blob], "video.mp4", { type: blob.type });

      return file;
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div>
      <Modal
        open={addVideoOpen}
        onClose={handleCloseAddCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="">
          <div className="model-header">
            <p className="m-0">
              {dialogueData ? "Edit PK Battle" : "Add PK Battle"}
            </p>
          </div>
          <div className="model-body">
            <form>
              <div className="row sound-add-box videoCreateModel d-flex align-items-end">
                {/* {!dialogueData && ( */}
                <div className="col-12 col-lg-6 col-sm-6 mt-2 country-dropdown">
                  <Selector
                    isdisabled={dialogueData}
                    label={"Fake User"}
                    selectValue={userId}
                    placeholder={"Enter Details..."}
                    selectData={fakePostDataGet}
                    selectId={true}
                    errorMessage={error.userId}
                    onChange={(e: any) => {
                      setUserId(e.target.value);
                      if (!e.target.value) {
                        setError({
                          ...error,
                          userId: "UserId Is Required",
                        });
                      } else {
                        setError({ ...error, userId: "" });
                      }
                    }}
                  />
                </div>
                <div className="col-12 col-lg-6 col-sm-6 mt-2 country-dropdown" />

                <div
                  className={`col-12 col-lg-${dialogueData ? "12" : "6"
                    } col-sm-6 mt-2 country-dropdown`}
                >
                  <Selector
                    label={"Media Type"}
                    selectValue={mediaSourceKind}
                    placeholder={"select type"}
                    selectData={[
                      { _id: 2, name: "File" },
                      { _id: 1, name: "Link" },
                    ]}
                    selectId={true}
                    errorMessage={error.mediaSourceKind}
                    onChange={(e: any) => {
                      setMediaSourceKind(e.target.value);
                      if (!e.target.value) {
                        setError({
                          ...error,
                          mediaSourceKind: "Media type Is Required",
                        });
                      } else {
                        setError({ ...error, mediaSourceKind: "" });
                      }
                    }}
                  />
                </div>
                <div
                  className={`col-12 col-lg-${dialogueData ? "12" : "6"
                    } col-sm-6 mt-2 country-dropdown`}
                >
                  <Selector
                    label={"Thumbnail Type"}
                    selectValue={thumbnailType}
                    placeholder={"select type"}
                    selectData={[
                      { _id: 2, name: "File" },
                      { _id: 1, name: "Link" },
                    ]}
                    selectId={true}
                    errorMessage={error.thumbnailType}
                    onChange={(e: any) => {
                      setThumbnailType(e.target.value);
                      if (!e.target.value) {
                        setError({
                          ...error,
                          thumbnailType: "Media type Is Required",
                        });
                      } else {
                        setError({ ...error, thumbnailType: "" });
                      }
                    }}
                  />
                </div>
                {/* <div className="col-12 col-lg-6 col-sm-6 mt-2"></div> */}

                {mediaSourceKind == 1 && (
                  <>
                    {/* 1st Link */}
                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      <Input
                        label={"Video 1"}
                        name={"video Url"}
                        placeholder={"Video Url"}
                        errorMessage={error.urlError1}
                        value={videoUrl1}
                        onChange={async (e: any) => {
                          setVideoUrl1(e.target.value);
                          const video = await fetchAndConvertToFile(
                            e.target.value
                          );
                          setpkMediaSources([...pkMediaSources, video]);
                          if (!e.target.value) {
                            setError({
                              ...error,
                              urlError1: "Invalid Url",
                            });
                          } else {
                            setError({ ...error, urlError1: "" });
                          }
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      <Input
                        label={"Video 2"}
                        name={"video Url"}
                        placeholder={"Video Url"}
                        errorMessage={error.urlError3}
                        value={videoUrl2}
                        onChange={async (e: any) => {
                          setVideoUrl2(e.target.value);
                          const video = await fetchAndConvertToFile(
                            e.target.value
                          );
                          setpkMediaSources([...pkMediaSources, video]);
                          if (!e.target.value) {
                            setError({
                              ...error,
                              urlError3: "Invalid Url",
                            });
                          } else {
                            setError({ ...error, urlError3: "" });
                          }
                        }}
                      />
                    </div>

                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      {videoUrl1 && (
                        <video
                          controls
                          style={{ width: "200px", height: "200px" }}
                          src={videoUrl1}
                        />
                      )}
                    </div>
                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      {videoUrl2 && (
                        <video
                          controls
                          style={{ width: "200px", height: "200px" }}
                          src={videoUrl2}
                        />
                      )}
                    </div>
                  </>
                )}

                {mediaSourceKind == 2 && (
                  <>
                    <div className="col-6 mt-2">
                      <Input
                        label={`Video`}
                        id={`video`}
                        type={`file`}
                        accept={`video/*`}
                        errorMessage={error.video}
                        onChange={handleVideo}
                      />
                    </div>
                    <div className="col-6 mt-2">
                      <Input
                        label={`Video`}
                        id={`video`}
                        type={`file`}
                        accept={`video/*`}
                        errorMessage={error.video}
                        onChange={handleVideo1}
                      />
                    </div>


                    {videoUrl1 && (
                      <div className="col-6 d-flex mt-4 videoShow">
                        <video
                          controls
                          style={{ width: "150px", height: "150px" }}
                          src={videoUrl1 ? videoUrl1 : ""}
                        />
                        {/* <img
                          src={previewImageUrl[0] ? previewImageUrl[0] : ""}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginLeft: "20px",
                          }}
                        /> */}
                      </div>
                    )
                      //  : (
                      //   <>
                      //     <div className="col-6 d-flex mt-4">
                      //       <video
                      //         controls
                      //         style={{ width: "200px", height: "200px" }}
                      //         src={videoPath}
                      //       />
                      //     </div>
                      //   </>
                      // )
                    }


                    {videoUrl2 && (
                      <div className="col-6 d-flex mt-4 videoShow">
                        <video
                          controls
                          style={{ width: "150px", height: "150px" }}
                          src={videoUrl2 ? videoUrl2 : ""}
                        />
                        {/* <img
                          src={previewImageUrl[1] ? previewImageUrl[1] : ""}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginLeft: "20px",
                          }}
                        /> */}
                      </div>
                    )
                      // : (
                      //   <>
                      //     <div className="col-6 d-flex mt-4">
                      //       <video
                      //         controls
                      //         style={{ width: "200px", height: "200px" }}
                      //         src={videoPath}
                      //       />
                      //     </div>
                      //   </>
                      // )
                    }
                  </>
                )}



                {/* New */}
                {thumbnailType != 2 ? (
                  <>
                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      <Input
                        label={"Thumbnail 1"}
                        name={"video thumbnail Url"}
                        placeholder={"Video thumbnail Url"}
                        value={videoThumbUrl1}
                        errorMessage={error.urlError2}
                        onChange={async (e: any) => {
                          setVideoThumbUrl1(e.target.value);
                          const video = await fetchAndConvertToFile(
                            e.target.value
                          );
                          setpkPreviewImages([...pkPreviewImages, video]);
                          if (!e.target.value) {
                            setError({
                              ...error,
                              urlError2: "Invalid Url",
                            });
                          } else {
                            setError({ ...error, urlError2: "" });
                          }
                        }}
                      />
                    </div>

                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      <Input
                        label={"Thumbnail 2"}
                        name={"video thumbnail Url"}
                        value={videoThumbUrl2}
                        placeholder={"Video thumbnail Url"}
                        errorMessage={error.urlError4}
                        onChange={async (e: any) => {
                          setVideoThumbUrl2(e.target.value);
                          const video = await fetchAndConvertToFile(
                            e.target.value
                          );
                          setpkPreviewImages([...pkPreviewImages, video]);
                          if (!e.target.value) {
                            setError({
                              ...error,
                              urlError4: "Invalid Url",
                            });
                          } else {
                            setError({ ...error, urlError4: "" });
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      <label htmlFor="">Thumbnail 1</label>
                      <input
                        className="form-control"
                        type={"file"}
                        name={"video thumbnail Url"}
                        placeholder={"Video thumbnail Url"}
                        onChange={handleThumb1Change}
                      />
                    </div>

                    <div className="col-12 col-lg-6 col-sm-6 mt-2">
                      <label htmlFor="">Thumbnail 2</label>
                      <input
                        className="form-control"
                        type={"file"}
                        name={"video thumbnail Url"}
                        placeholder={"Video thumbnail Url"}
                        onChange={handleThumb2Change}
                      />
                    </div>
                  </>
                )}

                <div className="col-12 col-lg-6 col-sm-6 mt-2">
                  {videoThumbUrl1 && (
                    <img
                      src={videoThumbUrl1 || ""}
                      style={{
                        width: "150px",
                        height: "150px",
                        marginLeft: "20px",
                      }}
                    />
                  )}
                </div>

                <div className="col-12 col-lg-6 col-sm-6 mt-2">
                  {videoThumbUrl2 && (
                    <img
                      src={videoThumbUrl2 || ""}
                      style={{
                        width: "150px",
                        height: "150px",
                        marginLeft: "20px",
                      }}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="model-footer">
            <div className="p-3 d-flex justify-content-end">
              <Button
                onClick={handleCloseAddCategory}
                btnName={"Close"}
                newClass={"close-model-btn"}
              />
              <Button
                onClick={handleSubmit}
                btnName={dialogueData ? "Update" : "Submit"}
                type={"button"}
                newClass={"submit-btn"}
                style={{
                  borderRadius: "0.5rem",
                  width: "88px",
                  marginLeft: "10px",
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default CreatePKLiveVideo;
