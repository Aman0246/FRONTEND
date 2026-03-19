import Button from "@/extra/Button";
import useClearSessionStorageOnPopState from "@/extra/ClearStorage";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import { getDefaultCurrency } from "@/store/currencySlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { deleteSupportRequest, getSupportRequest } from "@/store/supportSlice";
import { getwithdrawRequest } from "@/store/withdrawRequestSlice";
import { baseURL } from "@/util/config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import Input, { Textarea } from "@/extra/Input";
import noImage from "../../assets/images/noImage.png";
import CustomButton from "@/extra/Button";
import Image from "next/image";
import TrashIcon from "../../assets/icons/trashIcon.svg";
import { warning } from "@/util/Alert";
// import infoImage from "@/assets/images/info.svg";
import { IconTrash } from "@tabler/icons-react";
import Searching from "@/extra/Searching";
import CloseIcon from "@mui/icons-material/Close";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "background.paper",
  borderRadius: "13px",
  border: "1px solid #C9C9C9",
  boxShadow: "24px",
  padding: "19px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
  display: "block",
  color: "#444",
};

const AcceptedSupportRequest = (props) => {
  const { acceptedData, totalAcceptedData } = useSelector((state: RootStore) => state.support);

  const { currency } = useSelector((state: RootStore) => state.currency);

  const dispatch = useAppDispatch();

  const { startDate, endDate } = props;

  const [page, setPage] = useState(1);
  const [showURLs, setShowURLs] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoData, setInfodata] = useState<any>();
  const [size, setSize] = useState(20);
  const [data, setData] = useState([]);
  const [openReason, setOpenReason] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState<any>({});
  const [search, setSearch] = useState<string>("");

  useClearSessionStorageOnPopState("multiButton");

  useEffect(() => {
    let payload: any = {
      status: 2,
      startDate,
      endDate,
      search: search ?? "",
    };
    dispatch(getSupportRequest(payload));
    dispatch(getDefaultCurrency());
  }, [dispatch, page, size, startDate, endDate, search]);

  useEffect(() => {
    setData(acceptedData);
    setDefaultCurrency(currency);
  }, [acceptedData, currency]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setPage(1);
    setSize(value);
  };

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

  const handleDeleteSupportRequest = (id: any) => {
    const data = warning();
    data
      .then((res) => {
        if (res) {
          dispatch(deleteSupportRequest(id));
        }
      })
      .catch((err) => console.log(err));
  };

  const ManageUserData = [
    {
      Header: "No",
      body: "no",
      Cell: ({ index }) => <span className="  text-nowrap">{(page - 1) * size + parseInt(index) + 1}</span>,
    },

    {
      Header: "Name",
      body: "name",
      Cell: ({ row, index }) => (
        <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
          <img src={row?.userImage} width="40px" height="40px" />
          <div className="text-start">
            <div className="text-capitalize ms-3  cursorPointer text-nowrap">{row?.name}</div>
            <div className="text-capitalize ms-3  cursorPointer text-nowrap">{row?.userName}</div>
          </div>
        </div>
      ),
    },
    {
      Header: "Unique Id",
      body: "uniqueId",
      Cell: ({ row }) => <span>{row?.uniqueId}</span>,
    },
    {
      Header: "Date",
      body: "createdAt",
      Cell: ({ row }) => <span>{row?.date.split(",")[0]}</span>,
    },

    {
      Header: "Time",
      body: "time",
      Cell: ({ row }) => <span>{row?.date.split(",")[1]}</span>,
    },

    {
      Header: "Info",
      body: "",
      Cell: ({ row }) => (
        // <Button
        //     btnName={`Info`}
        //     newClass={`fw-bolder text-white`}
        //     style={{ backgroundColor: "blue", borderRadius: "7px" }}
        //     onClick={() => handleOpenInfo(row)}
        // />
        <img src="/images/info.svg" alt="Info" onClick={() => handleOpenInfo(row)} />
      ),
    },

    {
      Header: "Action",
      body: "action",
      Cell: ({ row }) => (
        <div className="action-button">
          <CustomButton btnIcon={<IconTrash className="text-secondary" />} onClick={() => handleDeleteSupportRequest(row?._id)} />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="user-table real-user mb-3">
        <div className="user-table-top">
          <h5
            style={{
              fontWeight: "500",
              fontSize: "20px",
              marginBottom: "5px",
              marginTop: "5px",
            }}
          >
            Support Request Table
          </h5>
          <Searching placeholder="Search Here" type="server" setSearchData={setSearch} searchValue={search} actionShow={false} button={false} newClass="" />
        </div>
        <Table data={data} mapData={ManageUserData} serverPerPage={size} serverPage={page} type={"server"} />
        <Pagination type={"server"} activePage={page} rowsPerPage={size} userTotal={totalAcceptedData} setPage={setPage} handleRowsPerPage={handleRowsPerPage} handlePageChange={handlePageChange} />
      </div>

      <Modal open={openInfo} onClose={handleCloseInfo}>
        <Box
          sx={{
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            mx: "auto",
            mt: "10vh",
            outline: "none",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Support Info</Typography>

            <IconButton onClick={handleCloseInfo} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Body */}
          <Box sx={{ p: 2 }}>
            {infoData && (
              <>
                <Box mb={2}>
                  <Typography variant="body2" fontWeight={500} mb={0.5}>
                    Description
                  </Typography>
                  <Textarea
                    value={infoData?.complaint}
                    row={4}
                    readOnly
                  />
                </Box>

                <Box mb={2}>
                  <Typography variant="body2" fontWeight={500} mb={0.5}>
                    Contact Number
                  </Typography>
                  <Input
                    value={infoData?.contact}
                    readOnly
                  />
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight={500} mb={0.5}>
                    Image
                  </Typography>
                  <Box
                    component="img"
                    src={infoData?.image || "/images/user.png"}
                    alt="Complaint"
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 1,
                      border: "1px solid #ddd",
                      opacity: infoData?.isComplaintImageRestricted ? 0.5 : 1,
                    }}
                  />
                </Box>
              </>
            )}
          </Box>

          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid #eee",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleCloseInfo}
              btnName="Close"
              newClass="close-model-btn"
            />
          </div>
        </Box>
      </Modal>


    </>
  );
};

export default AcceptedSupportRequest;
