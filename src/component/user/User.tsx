import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Pagination from "../../extra/Pagination";
import Table from "../../extra/Table";
import { openDialog } from "../../store/dialogSlice";
import Searching from "../../extra/Searching";
import ToggleSwitch from "../../extra/ToggleSwitch";
import { allUsers, blockUser } from "../../store/userSlice";
import { RootStore, useAppDispatch } from "../../store/store";
import { baseURL } from "@/util/config";
import { useRouter } from "next/router";
import useClearSessionStorageOnPopState from "@/extra/ClearStorage";
import Verified from "../../assets/images/verified.png";
import Image from "next/image";

import Button from "@/extra/Button";
import dayjs from "dayjs";
import { IconEye } from "@tabler/icons-react";
import NoImage from "../../assets/images/user.png";

const User = (props) => {
  const { startDate, endDate } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  // const [actionPagination, setActionPagination] = useState("unblock");

  // filter: all / block / unblock
  const [blockFilter, setBlockFilter] = useState<"all" | "block" | "unblock">("all");

  // bulk action
  const [bulkAction, setBulkAction] = useState<"block" | "unblock">("block");

  const [selectCheckData, setSelectCheckData] = useState<any[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [search, setSearch] = useState<string>("");

  const { realUserData, totalRealUser } = useSelector((state: RootStore) => state.user);

  const router = useRouter();
  useClearSessionStorageOnPopState("multiButton");

  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(realUserData);
  }, [realUserData]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const allSelectedBlocked = selectCheckData.length > 0 && selectCheckData.every((user) => user.isBlock === true);

  useEffect(() => {
    if (allSelectedBlocked) {
      setBulkAction("unblock");
    } else {
      setBulkAction("block");
    }
  }, [selectCheckData]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value: number) => {
    setPage(1);
    setSize(value);
  };

  const handleEdit = (row: any, type: string) => {
    router.push({
      pathname: "/viewProfile",
      query: { id: row?._id },
    });
  };

  const handleSelectCheckData = (e: React.ChangeEvent<HTMLInputElement>, row: any) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectCheckData((prevSelectedRows) => [...prevSelectedRows, row]);
    } else {
      setSelectCheckData((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => selectedRow._id !== row._id));
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      setSelectCheckData([...data]);
    } else {
      setSelectCheckData([]);
    }
  };

  const paginationSubmitButton = () => {

    if (selectCheckData.length === 0) return;

    const ids = selectCheckData.map((item) => item._id);

    dispatch(
      blockUser({
        id: ids,
        data: bulkAction === "block",
      })
    );

    setSelectCheckData([]);
    setSelectAllChecked(false);
  };

  const handleRedirect = (row: any) => {
    router.push({
      pathname: "/viewProfile",
      query: { id: row?._id, includeFake: row?.isFake },
    });
  };

  const ManageUserData = [
    {
      Header: "checkBox",
      width: "20px",
      Cell: ({ row }: { row: any }) => <input type="checkbox" checked={selectCheckData.some((selectedRow) => selectedRow?._id === row?._id)} onChange={(e) => handleSelectCheckData(e, row)} />,
    },
    {
      Header: "NO",
      body: "no",
      Cell: ({ index }) => <span className="  text-nowrap">{(page - 1) * size + parseInt(index) + 1}</span>,
    },
    {
      Header: "Name",
      body: "name",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center " style={{ cursor: "pointer" }} onClick={() => handleEdit(row, "manageUser")}>
          <img
            src={row?.image}
            width="50px"
            height="50px"
            onError={(e) => {
              e.currentTarget.src = "/images/user.png";
            }}
          />
          <span className="text-capitalize  ms-3 cursorPointer text-nowrap">{row?.name}</span>

          {row?.isVerified == true ? <img src="/images/verified.png" alt="Edit Icon" className="ms-1" width={18} height={18} /> : ""}
        </div>
      ),
    },
    {
      Header: "User name",
      body: "userName",
      Cell: ({ row }) => <span className="text-lowercase cursorPointer">{row?.userName}</span>,
    },
    {
      Header: "Unique ID",
      body: "id",
      Cell: ({ row }) => <span className="text-capitalize    cursorPointer">{row?.uniqueId}</span>,
    },
    {
      Header: "Gender",
      body: "id",
      Cell: ({ row }) => <span className="text-capitalize    cursorPointer">{row?.gender}</span>,
    },
    {
      Header: "Country",
      body: "country",
      Cell: ({ row }) => <span className="text-capitalize cursorPointer">{row?.country || "-"}</span>,
    },

    {
      Header: "Block Status",
      body: "isActive",
      Cell: ({ row }) => <ToggleSwitch value={row?.isBlock} onChange={() => handleIsActive(row)} />,
    },
    {
      Header: "Created date",
      body: "createdAt",
      Cell: ({ row }: { row: any }) => <span className="text-capitalize">{row?.createdAt ? dayjs(row?.createdAt).format("DD MMMM YYYY") : ""}</span>,
    },

    {
      Header: "Preview",
      body: "Action",
      Cell: ({ row }) => (
        <>
          <div className="action-button">
            <Button btnIcon={<IconEye className="text-secondary" />} onClick={() => handleRedirect(row)} />
          </div>
        </>
      ),
    },
  ];

  // const isBlock = actionPagination === "block" ? true : actionPagination === "unblock" ? false : undefined;
  const isBlockParam = blockFilter === "block" ? true : blockFilter === "unblock" ? false : null;

  // useEffect(() => {
  //   const payload: any = {
  //     type: "realUser",
  //     start: page,
  //     limit: size,
  //     startDate,
  //     endDate,
  //     search: search ?? "",
  //     isBlock,
  //   };
  //   dispatch(allUsers(payload));
  // }, [startDate, endDate, page, size, search, isBlock]);

  useEffect(() => {
    dispatch(
      allUsers({
        type: "realUser",
        start: page,
        limit: size,
        startDate,
        endDate,
        search: search ?? "",
        ...(isBlockParam !== null && { isBlock: isBlockParam }),
        meta: undefined,
        data: undefined,
      })
    );
  }, [startDate, endDate, page, size, search, isBlockParam]);

  const handleIsActive = (row: any) => {

    // const id = row?._id;
    // const data = row?.isBlock === false ? true : false;

    // const payload: any = { id, data };
    // dispatch(blockUser(payload));

    dispatch(
      blockUser({
        id: row._id,
        data: !row.isBlock,
      })
    );
  };

  return (
    <div>
      <div className="user-table real-user mb-3">
        <div className="user-table-top">
          <div style={{ width: "70%" }}>
            <h5
              style={{
                fontWeight: "500",
                fontSize: "20px",
                marginTop: "5px",
                marginBottom: "4px",
              }}
            >
              Real User
            </h5>
          </div>
          {/* <Searching
            placeholder={"Search here"}
            type={"server"}
            setSearchData={setSearch} // 🔑 will update the local search state
            searchValue={search}
            actionPagination={actionPagination}
            setActionPagination={setActionPagination}
            paginationSubmitButton={paginationSubmitButton}
            actionPaginationDataCustom={["Block", "Unblock"]}
            submitDisabled={selectCheckData.length === 0}
          /> */}

          <Searching
            placeholder="Search here"
            type="server"
            setSearchData={setSearch}
            searchValue={search}
            /* FILTER */
            actionPagination={blockFilter}
            setActionPagination={setBlockFilter}
            actionPaginationDataCustom={["All", "Block", "Unblock"]}
            /* BULK ACTION */
            paginationSubmitButton={paginationSubmitButton}
            submitDisabled={selectCheckData.length === 0}
            buttonLabel={bulkAction === "block" ? "Block" : "Unblock"}
          />
        </div>
        <Table data={data} mapData={ManageUserData} serverPerPage={size} serverPage={page} handleSelectAll={handleSelectAll} selectAllChecked={selectAllChecked} type={"server"} />
        <Pagination type={"server"} activePage={page} rowsPerPage={size} userTotal={totalRealUser} setPage={setPage} handleRowsPerPage={handleRowsPerPage} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default connect(null, { blockUser, allUsers })(User);
