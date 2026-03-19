import React, { useEffect, useState } from "react";
import Searching from "../../extra/Searching";
import Table from "../../extra/Table";
import Pagination from "../../extra/Pagination";
import { useSelector } from "react-redux";
import { getVerificationRequest } from "../../store/verificationRequestSlice";
import dayjs from "dayjs";
import { RootStore, useAppDispatch } from "@/store/store";
import { baseURL } from "@/util/config";
import useClearSessionStorageOnPopState from "@/extra/ClearStorage";
// import Image1 from "@/assets/images/1.jpg"
import { useRouter } from "next/router";
import NoImage from "../../assets/images/user.png";
import { Box, Dialog, DialogContent, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@/extra/Button";
import { IconEye } from "@tabler/icons-react";
import Input, { Textarea } from "@/extra/Input";

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
  // padding: "19px",
};

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
          <img src={src} style={{ width: "500px", height: "500px" }} alt="full" />
        </DialogContent>
      </Dialog>
    </>
  );
};

const truncateText = (text: string, maxLength = 40) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const DeclineVerificationRequest = () => {
  const router = useRouter();
  const { declinedData, totalDeclinedData } = useSelector((state: RootStore) => state.verificationRequest);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [search, setSearch] = useState<string>("");
  const [openInfo, setOpenInfo] = useState(false);
  const [infoData, setInfodata] = useState<any>();
  const [openReason, setOpenReason] = useState(false);
  useClearSessionStorageOnPopState("multiButton");

  useEffect(() => {
    let payload: any = {
      start: page,
      limit: size,
      type: "declined",
      search: search ?? "",
    };
    dispatch(getVerificationRequest(payload));
  }, [page, size, search]);

  useEffect(() => {
    setData(declinedData);
  }, [declinedData]);

  const handleOpenInfo = (row) => {
    setOpenInfo(true);
    setInfodata(row);
  };

  const handleCloseReason = () => {
    setOpenReason(false);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const postReportTable = [
    {
      Header: "No",
      body: "no",
      Cell: ({ index }: { index: number }) => <span className="  text-nowrap">{(page - 1) * size + index + 1}</span>,
    },
    {
      Header: "User",
      body: "userName",
      Cell: ({ row }: { row: any }) => (
        <div className="d-flex align-items-center justify-content-center gap-4">
          <div
            style={{ width: "60px", textAlign: "center" }}
            onClick={() => {
              localStorage.setItem("postProfile", JSON.stringify(row));
              router.push({
                pathname: "/viewProfile",
                query: { id: row?.userId, type: "ViewFakeUser", includeFake: row?.isFake },
              });
            }}
          >
            {row?.user?.image && row?.user?.image !== "" ? (
              <img
                src={row?.user?.image}
                onError={(e) => {
                  e.currentTarget.src = "/images/user.png";
                }}
                width="60px"
                height="60px"
                style={{ objectFit: "cover", marginRight: "10px" }}
              />
            ) : (
              <img src="/images/1.jpg" width="60px" height="60px" style={{ objectFit: "cover", marginRight: "10px" }} />
            )}
          </div>
          <div style={{ width: "200px", textAlign: "start" }}>
            <div className="text-capitalize">{row?.user?.name}</div>
            <div className="text-capitalize">{row?.user?.uniqueId}</div>
          </div>
        </div>
      ),
    },
    {
      Header: "Profile Selfie",
      body: "profileSelfie",
      Cell: ({ row, index }: { row: any; index: number }) => <ImageCell src={row?.profileSelfie} />,
    },
    {
      Header: "Document",
      body: "document",
      Cell: ({ row, index }: { row: any; index: number }) => <ImageCell src={row?.document} />,
    },
    {
      Header: "Document Type",
      body: "documentType",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.nameOnDocument}</span>,
    },

    // {
    //   Header: "Reason",
    //   body: "reason",
    //   Cell: ({ row }: { row: any }) => (
    //     <span className="text-capitalize" title={row?.reason} style={{ cursor: "pointer" }}>
    //       {truncateText(row?.reason, 22)}
    //     </span>
    //   ),
    // },

    // {
    //   Header: "Reason",
    //   body: "reason",
    //   Cell: ({ row }: { row: any }) => (
    //     <div className="truncate-text text-capitalize" title={row?.reason}>
    //       {row?.reason}
    //     </div>
    //   ),
    // },

    {
      Header: "Declined date",
      body: "updatedAt",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.updatedAt ? dayjs(row?.updatedAt).format("DD MMMM YYYY") : ""}</span>,
    },
    {
      Header: "Reason",
      body: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="action-button">
          <Button
            btnIcon={<IconEye className="text-secondary" />}
            onClick={() => {
              handleOpenInfo(row);
            }}
          />
        </div>
      ),
    },
  ];

  const handleFilterData = (filteredData: any) => {
    if (typeof filteredData === "string") {
      setSearch(filteredData);
    } else {
      setData(filteredData);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value: number) => {
    setPage(1);
    setSize(value);
  };

  return (
    <>
      <div className="userPage p-0">
        <div className=" user-table ">
          <div className="user-table-top">
            <div className="w-100">
              <h5
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  marginTop: "5px",
                  marginBottom: "4px",
                }}
              >
                Decline Verification Request
              </h5>
            </div>
            <Searching placeholder={"Search here"} type={"server"} setSearchData={setSearch} searchValue={search} actionShow={false} />
          </div>
          <div className="">
            <Table data={data} mapData={postReportTable} serverPerPage={size} serverPage={page} type={"server"} />
            <div className="">
              <Pagination
                type={"server"}
                activePage={page}
                rowsPerPage={size}
                userTotal={totalDeclinedData}
                setPage={setPage}
                handleRowsPerPage={handleRowsPerPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal open={openInfo} onClose={handleCloseReason} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className="">
          <div className="model-header">
            <p className="m-0">Reason for Decline Verification Request</p>
          </div>
          <div className="model-body">
              <div className="row sound-add-box" style={{ overflowX: "hidden" }}>
                <div className="col-12 ">
                  <div className="col-12  text-about">
                    <Textarea type={"text"}  name={"Reason"} value={data[0]?.reason} newClass={``} readOnly row={10} />
                  </div>
                </div>
              </div>
          </div>
          <div className="model-footer">
            <div className="p-3 d-flex justify-content-end">
              <Button onClick={handleCloseInfo} btnName={"Close"} newClass={"close-model-btn"} />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeclineVerificationRequest;
