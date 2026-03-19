import BannerDialogue from "@/component/banner/BannerDialogue";
import RootLayout from "@/component/layout/Layout";
import Button from "@/extra/Button";
import Pagination from "@/extra/Pagination";
import TrashIcon from "../assets/icons/trashIcon.svg";
import EditIcon from "../assets/icons/EditBtn.svg";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import ToggleSwitch from "@/extra/ToggleSwitch";
import { activeBanner, deleteBanner, getBanner } from "@/store/bannerSlice";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { warning } from "@/util/Alert";
import { baseURL } from "@/util/config";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdminEarning } from "@/store/adminEarningSlice";
import NewTitle from "../extra/Title";
import Verified from "../assets/images/verified.png";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { getDefaultCurrency } from "@/store/currencySlice";
// import { useNavigate } from "react-router-dom";
import noImage from "../assets/images/user.png";
import CustomButton from "@/extra/Button";
import { IconHistory } from "@tabler/icons-react";
import Searching from "@/extra/Searching";

interface BannerData {
  _id: string;
  image: string;
  isActive: false;
}

const AdminEarnings = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  const { adminEarnings, totalEarning, totalOrder } = useSelector((state: RootStore) => state.adminEarning);
  const [startDate, setStartDate] = useState<string | Date>("All");
  const [endDate, setEndDate] = useState<string | Date>("All");
  const [showURLs, setShowURLs] = useState([]);
  const { currency } = useSelector((state: any) => state.currency);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value: number) => {
    setPage(1);
    setSize(value);
  };

  const startDateFormat = (startDate: string | Date): string => {
    return startDate && dayjs(startDate).isValid() ? dayjs(startDate).format("YYYY-MM-DD") : "All";
  };

  const endDateFormat = (endDate: string | Date): string => {
    return endDate && dayjs(endDate).isValid() ? dayjs(endDate).format("YYYY-MM-DD") : "All";
  };

  const dispatch = useAppDispatch();

  const [data, setData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<any>(1);
  const [size, setSize] = useState(20);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const payload = {
      startDate,
      endDate,
      page,
      size,
      search: search ?? "",
    };
    dispatch(getAdminEarning(payload));
  }, [dispatch, startDate, endDate, page, size, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    dispatch(getDefaultCurrency());
  }, []);

  useEffect(() => {
    setData(adminEarnings);
  }, [adminEarnings]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleDeleteBanner = (row: any) => {
    const data = warning();
    data
      .then((res) => {
        if (res) {
          dispatch(deleteBanner(row?._id));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (row) => {
    router.push(`/CoinPlanHistory?userId=${row._id}&userName=${row.name}`);
    // localStorage.setItem("adminEarningHistoryData", JSON.stringify(row));
  };

  const earningTable = [
    {
      Header: "No",
      body: "no",
      Cell: ({ index }) => <span className="  text-nowrap">{(page - 1) * size + parseInt(index) + 1}</span>,
    },
    {
      Header: "User Name",
      body: "fullName",
      Cell: ({ row, index }) => (
        <div className="d-flex align-items-center justify-content-center" style={{ cursor: "pointer" }}>
          <div style={{ width: "60px", textAlign: "center" }}>
            <img
              src={row?.image}
              width="40px"
              height="40px"
              style={{ borderRadius: "50%" }}
              onError={(e) => {
                e.currentTarget.src = "/images/user.png";
              }}
            />
          </div>
          <div style={{ width: "200px", textAlign: "start" }}>
            <div className="text-capitalize   cursorPointer text-nowrap">{row?.userName}</div>
            <div className="text-capitalize   cursorPointer text-nowrap">{row?.uniqueId}</div>
          </div>
        </div>
      ),
    },

    {
      Header: "Total Plan Purchased",
      body: "totalPlansPurchased",
      Cell: ({ row }) => <span className="text-capitalize">{row?.totalPlansPurchased}</span>,
    },

    {
      Header: `Total Amount (${currency?.symbol || "$"})`,
      body: "totalAmountSpent",
      Cell: ({ row }) => <span className="text-capitalize">{row?.totalAmountSpent}</span>,
    },
    // {
    //   Header: "Created At",
    //   body: "createdAt",
    //   Cell: ({ row }) => <span className="text-capitalize">{dayjs(row.createdAt).format("MM/DD/YYYY")}</span>,
    // },

    {
      Header: "History",
      body: "history",
      Cell: ({ row }) => (
        <div className="action-button">
          <CustomButton btnIcon={<IconHistory className="text-secondary" />} onClick={() => handleOpen(row)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`userTable`} style={{ padding: "20px" }}>
        <div className="dashboardHeader primeHeader mb-3 p-0">
          <NewTitle
            dayAnalyticsShow={true}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
            titleShow={true}
          // name={`Order History`}
          //  setMultiButtonSelect={setMultiButtonSelect}
          //  multiButtonSelect={multiButtonSelect}
          //  labelData={["Real User", "Verified User", "Fake User"]}
          />

        </div>

        <div className="d-flex justify-content-end">

        </div>


        <div className=" user-table">
          <div className="user-table-top">
            <div className="row align-items-start">
              <div className="">
                <h5
                  style={{
                    fontWeight: "500",
                    fontSize: "20px",
                    marginTop: "5px",
                    marginBottom: "4px",
                  }}
                >
                  Order History Table
                </h5>
              </div>
            </div>


            <div className="d-flex flex-column align-items-end">



              <div style={{ width: "300px" }}>
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



            </div>
          </div>


          <div className="d-flex  justify-content-end align-items-center gap-2 p-3 ">
            <h4
              className="text-success mb-0"
              style={{
                fontWeight: "500",
                fontSize: "15px",
                whiteSpace: "nowrap",
                paddingRight: "20px"
              }}
            >
              Total Order History : {totalEarning}{currency?.symbol || '$'}
            </h4>


          </div>
          <Table data={data} mapData={earningTable} serverPerPage={size} serverPage={page} type={"server"} />
          <div className="mt-3 text-red-100">
            <Pagination
              type={"server"}
              activePage={page}
              rowsPerPage={size}
              userTotal={totalOrder}
              setPage={setPage}
              // setData={setData}
              // data={data}
              actionShow={false}
              handleRowsPerPage={handleRowsPerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
AdminEarnings.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
export default AdminEarnings;
