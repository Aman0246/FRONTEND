import useClearSessionStorageOnPopState from "@/extra/ClearStorage";
import { allStory, deleteFakeStory } from "@/store/storySlice";
import AddIcon from "@mui/icons-material/Add";
import { IconEdit, IconEye, IconTrash, IconVideo } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../extra/Button";
import Pagination from "../../extra/Pagination";
import Table from "../../extra/Table";
import { openDialog } from "../../store/dialogSlice";
import { RootStore, useAppDispatch } from "../../store/store";
import { deleteFakeVideo } from "../../store/videoSlice";
import { warning } from "../../util/Alert";
import VideoDialogue from "./StoryDialogue";
import noUser from "../../assets/images/noImage.png";
import CreateFakeStory from "./CreateFakeStory";
import ReactAudioPlayer from "react-audio-player";
import NoImage from "../../assets/images/user.png";
import Searching from "@/extra/Searching";

interface FakeVideoProps {
  startDate: string;
  endDate: string;
}

const FakeStory: React.FC<FakeVideoProps> = (props) => {
  const router = useRouter();
  const { fakeStoryData, totalFakeStory } = useSelector((state: RootStore) => state.story);
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue);

  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [selectCheckData, setSelectCheckData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  useClearSessionStorageOnPopState("multiButton");



  const { startDate, endDate } = props;

  useEffect(() => {
    const payload: any = {
      includeFake: true,
      start: page,
      limit: size,
      startDate: startDate,
      endDate: endDate,
      search: search ?? "",
    };
    dispatch(allStory(payload));
  }, [page, size, startDate, endDate, search]);

  useEffect(() => {
    setData(fakeStoryData);
  }, [fakeStoryData]);

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

  const handleEdit = (row: any) => {
    router.push({
      pathname: "/viewProfile",
      query: { id: row?.user?._id, type: "ViewFakeUser", includeFake: true },
    });

    localStorage.setItem("postData", JSON.stringify(row));
    localStorage.removeItem("multiButton");
  };

  const storyTable = [
    {
      Header: "NO",
      body: "name",
      Cell: ({ index }: { index: number }) => <span>{(page - 1) * size + index + 1}</span>,
    },

    {
      Header: "User",
      body: "name",
      Cell: ({ row }: { row: any }) => (
        <>
          <div
            className="text-capitalize userText fw-bold d-flex align-items-center"
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleEdit(row)}
          >
            <img
              src={row?.user?.image}
              onError={(e) => {
                e.currentTarget.src = "/images/user.png";
              }}
              width="50px"
              height="50px"
              style={{ marginRight: "10px" }}
            />
            <div className="text-start">
              <div
                className="text-capitalize userText "
                style={{
                  cursor: "pointer",
                }}
              >
                {row?.user?.name}
              </div>
              <div
                className="text-capitalize userText "
                style={{
                  cursor: "pointer",
                }}
              >
                {row?.user?.uniqueId}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      Header: "Story Type",
      body: "storyType",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.storyType == 1 ? "Image" : "Video"}</span>,
    },
    {
      Header: "View Count",
      body: "viewsCount",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.viewsCount ? row?.viewsCount : 0}</span>,
    },
    {
      Header: "Reaction Count",
      body: "totalLikes",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.reactionsCount ? row?.reactionsCount : 0}</span>,
    },
    {
      Header: "Created date",
      body: "createdAt",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.createdAt ? dayjs(row?.createdAt).format("DD MMMM YYYY") : ""}</span>,
    },
    {
      Header: "Action",
      body: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="action-button">
          <Button
            btnIcon={<IconEye className="text-secondary" />}
            onClick={() => {
              dispatch(openDialog({ type: "viewStory", data: row }));
            }}
          />
          <Button
            btnIcon={<IconEdit className="text-secondary" />}
            onClick={() => {
              dispatch(openDialog({ type: "fakeStory", data: row }));
            }}
          />
          <Button btnIcon={<IconTrash className="text-secondary" />} onClick={() => handleDeleteVideo(row)} />
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

  const handleDeleteVideo = (row: any) => {

    const data = warning();
    data
      .then((logouts: any) => {
        const yes = logouts;
        if (yes) {
          dispatch(deleteFakeStory({ storyId: row?._id, userId: row?.user?._id }));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="user-table mb-3">
        {dialogueType == "fakeStory" && <CreateFakeStory />}

        <div className="user-table-top gap-2">
          <div className="row align-items-start w-100">
            <div className="col-6">
              <h5
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  marginTop: "5px",
                  marginBottom: "4px",
                }}
              >
                Fake Story
              </h5>
            </div>

          </div>
          <Searching placeholder="Search Here" type="server" setSearchData={setSearch} searchValue={search} actionShow={false} button={false} newClass="" />
          <div className=" d-flex justify-content-end">
            <div className="ms-auto ">
              <div className="new-fake-btn d-flex ">
                <Button
                  btnIcon={<AddIcon />}
                  btnName={"New"}
                  onClick={() => {
                    dispatch(openDialog({ type: "fakeStory" }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Table data={data} mapData={storyTable} serverPerPage={size} serverPage={page} handleSelectAll={handleSelectAll} selectAllChecked={selectAllChecked} type={"server"} />
        <div className="">
          <Pagination type={"server"} activePage={page} rowsPerPage={size} userTotal={totalFakeStory} setPage={setPage} handleRowsPerPage={handleRowsPerPage} handlePageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default FakeStory;
