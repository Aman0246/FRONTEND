import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import TrashIcon from "../../assets/icons/trashIcon.svg";
import Searching from "../../extra/Searching";
import Pagination from "../../extra/Pagination";
import Button from "../../extra/Button";
import Table from "../../extra/Table";
import dayjs from "dayjs";
import { RootStore, useAppDispatch } from "../../store/store";
import { allPost, deleteFakePost } from "../../store/postSlice";
import { warning } from "../../util/Alert";
import { openDialog } from "@/store/dialogSlice";
import { useRouter } from "next/router";
import { baseURL } from "@/util/config";
import useClearSessionStorageOnPopState from "@/extra/ClearStorage";
import PostDialogue from "./PostDialogue";
import PostImageDialogue from "./PostImageDialogue";
import { IconPhotoHeart, IconTrash } from "@tabler/icons-react";
import NoImage from "../../assets/images/noImage.png";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


interface PostProps {
  startDate: string | Date;
  endDate: string | Date;
}


const ImageCell = ({ src }: { src: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img src={src} width="60px" height="60px" style={{ objectFit: "cover", cursor: "pointer" }} onClick={handleOpen} alt="thumbnail" />
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent style={{ padding: 0 }}>
          <img src={src} style={{ width: "100%", height: "auto" }} alt="full" />
        </DialogContent>
      </Dialog>
    </>
  );
};


const Post: React.FC<PostProps> = (props) => {
  const router = useRouter();
  const { realPost, totalRealPost } = useSelector((state: RootStore) => state.post);
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue);


  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectCheckData, setSelectCheckData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { startDate, endDate } = props;
  const [search, setSearch] = useState<string>("");

  useClearSessionStorageOnPopState("multiButton");

  useEffect(() => {
    const payload: any = {
      type: "realPost",
      start: page,
      limit: size,
      startDate: startDate,
      endDate: endDate,
      search: search ?? "",
    };
    dispatch(allPost(payload));
    console.log("FETCH POSTS");
  }, [dispatch, page, size, startDate, endDate, search]);

  useEffect(() => {
    setData(realPost);
  }, [realPost]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      setSelectCheckData([...data]);
    } else {
      setSelectCheckData([]);
    }
  };

  const handleEdit = (row: any, type: any) => {
    router.push({
      pathname: "/viewProfile",
      query: { id: row?.userId },
    });

    dispatch(openDialog({ type: type, data: row }));

    localStorage.setItem("postData", JSON.stringify(row));
    // localStorage.removeItem("multiButton");
  };

  const handleDeletePost = (row: any) => {

    const data = warning();
    data
      .then((logouts: any) => {
        if (logouts) {
          dispatch(deleteFakePost(row?._id));
        }
      })
      .catch((err: any) => console.log(err));
  };

  const postTable = [
    {
      Header: "NO",
      body: "name",
      Cell: ({ index }: { index: number }) => <span>{(page - 1) * size + index + 1}</span>,
    },
    {
      Header: "User",
      body: "planBenefit",
      Cell: ({ row }: { row: any }) => (
        <div
          className="d-flex align-items-center"
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleEdit(row, "managePost")}
        >
          <img
            src={row?.userImage}
            width="50px"
            height="50px"
            onError={(e) => {
              e.currentTarget.src = "/images/user.png";
            }}
          />
          <div className="text-start">
            <div className="text-capitalize  ms-2 cursorPointer text-nowrap">{row?.name}</div>
            <div className="text-capitalize  ms-2 cursorPointer text-nowrap">{row?.uniqueId}</div>
          </div>
        </div>
      ),
    },

    {
      Header: "Unique ID",
      body: "uniqueId",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.uniquePostId}</span>,
    },

    {
      Header: "Share count",
      body: "shareCount",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.shareCount}</span>,
    },

    {
      Header: "Likes",
      body: "Likes",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.totalLikes}</span>,
    },

    {
      Header: "Comments",
      body: "Comments",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.totalComments}</span>,
    },

    {
      Header: "Created date",
      body: "createdAt",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.createdAt ? dayjs(row?.createdAt).format("DD MMMM YYYY") : ""}</span>,
    },

    {
      Header: "Posts",
      body: "soundImage",
      Cell: ({ row }: { row: any }) => (
        <>
          <button className="viewbutton mx-auto pt-2 pb-2" onClick={() => dispatch(openDialog({ type: "postImage", data: row }))}>
            <IconPhotoHeart />
            {/* <span>View Post</span> */}
          </button>
        </>
      ),
    },
    // {
    //   Header: "View Post",
    //   body: "View post",
    //   Cell: ({ row }) => (
    //     <>
    //       <button
    //         className="viewbutton mx-auto"
    //         onClick={() =>
    //           dispatch(openDialog({ type: "postImage", data: row }))
    //         }
    //         // onClick={() => handleRedirect(row)}
    //       >
    //         <svg
    //           viewBox="0 0 24 24"
    //           width="24"
    //           height="24"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //           fill="none"
    //           strokeLinecap="round"
    //           stroke-linejoin="round"
    //           className="css-i6dzq1"
    //         >
    //           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    //           <circle cx="12" cy="12" r="3"></circle>
    //         </svg>
    //         <span>View</span>
    //       </button>
    //     </>
    //   ),
    // },

    {
      Header: "Action",
      body: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="action-button">
          <Button btnIcon={<IconTrash className="text-secondary" />} onClick={() => handleDeletePost(row)} />
        </div>
      ),
    },
  ];

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value: number) => {
    setPage(1);
    setSize(value);
  };

  const handleRedirect = (row: any) => {
    localStorage.setItem("allpostData", JSON.stringify(row));
    localStorage.removeItem("multiButton");

    router.push({
      pathname: "/viewPost",
    });
  };

  return (
    <div>
      <div className="user-table mb-3">
        <div className="user-table-top">
          {dialogueType == "viewPost" && <PostDialogue />}
          {dialogueType == "postImage" && <PostImageDialogue />}

          <div className="row align-items-start">
            <div className="col-6 w-100">
              <h5
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  marginTop: "5px",
                  marginBottom: "4px",
                }}
              >
                Real Post
              </h5>
            </div>
          </div>
          <Searching
            placeholder="Search Here"
            type="server"
            setSearchData={setSearch}
            searchValue={search}
            actionShow={false}
            button={false}
            newClass=""
          />
        </div>

        <Table data={data} mapData={postTable} serverPerPage={size} serverPage={page} handleSelectAll={handleSelectAll} selectAllChecked={selectAllChecked} type={"server"} />
        <div className="">
          <Pagination type={"server"} activePage={page} rowsPerPage={size} userTotal={totalRealPost} setPage={setPage} handleRowsPerPage={handleRowsPerPage} handlePageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default Post;
