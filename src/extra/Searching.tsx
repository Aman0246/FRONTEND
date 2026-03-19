import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import Button from "./Button";
// import SearchIcon from "../assets/icons/search.svg";
import { useSelector } from "react-redux";
import { RootStore } from "@/store/store";

export default function Searching(props: any) {
  const [search, setSearch] = useState<string>("");

  const {
    data,
    setData,
    type,
    serverSearching,
    setSearchData,
    placeholder,
    button,
    newClass,
    actionShow,
    setActionPagination,
    paginationSubmitButton,
    submitDisabled,
    actionPagination,
    customSelectDataShow,
    customSelectData,
    label,
    actionPaginationDataCustom,
  } = props;



  const handleSearch = (searchValue: string) => {
    const getLowerCaseSearch = searchValue?.toLowerCase();

    if (type === "client") {
      if (getLowerCaseSearch) {
        const filteredData = data.filter((item: any) => {
          return Object.keys(item).some((key) => {
            if (["_id", "updatedAt", "createdAt"].includes(key)) return false;
            const itemValue = item[key];
            if (typeof itemValue === "string") {
              return itemValue.toLowerCase().includes(getLowerCaseSearch);
            } else if (typeof itemValue === "number") {
              return itemValue.toString().includes(getLowerCaseSearch);
            } else if (typeof itemValue === "object" && itemValue !== null) {
              return Object.values(itemValue).some((nestedValue) => (typeof nestedValue === "string" ? nestedValue.toLowerCase().includes(getLowerCaseSearch) : false));
            }
            return false;
          });
        });
        setData(filteredData);
      } else {
        setData(data); // reset when cleared
      }
    } else {
      // 🔑 Server-side searching
      if (serverSearching) {
        serverSearching(searchValue);
      } else if (setSearchData) {
        setSearchData(searchValue);
      }
    }
  };

  // 🔹 DEBOUNCE: triggers handleSearch 400ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const paginationActionData = actionPaginationDataCustom ? actionPaginationDataCustom : ["Block", "Unblock", "Delete"];

  return (
    <>
      <div className="row search-action">
        <div className={`${actionShow === false ? "col-12" : "col-12 col-lg-6 col-md-6 col-sm-12"} `}>
          <div className="searching-box" style={{ float: "right" }}>
            <div
              className={`prime-input search-input-box m-0 ${newClass}`}
              style={{
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <input
                type="search"
                autoComplete="off"
                placeholder={placeholder}
                aria-describedby="button-addon4"
                className="form-input searchBarBorderr"
                style={{ borderRadius: "5px !important" }}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value); // only update state
                }}
              />

              {button && <Button type="button" btnIcon="/icons/search.svg" newClass={`themeBtn text-center fs-6  searchBtn text-white `} onClick={(e: any) => handleSearch(e)} />}
            </div>
          </div>
        </div>
        {actionShow === false ? (
          ""
        ) : (
          <>
            <div className="col-12 col-lg-6 col-md-6 col-sm-12  pagination-select p-0">
              <div className="d-flex align-items-center justify-content-end w-100 pagination-box">
                <div className="d-flex gap-2 justify-content-end w-100">
                  <div className="select-box" style={{ width: "220px" }}>
                    <select name="" id="" className="form-select " value={actionPagination} onChange={(e) => setActionPagination(e.target.value)}>
                      {customSelectDataShow
                        ? customSelectData?.map((item: any) => {
                          return (
                            <option value={item?.toLowerCase()} key={item}>
                              {item}
                            </option>
                          );
                        })
                        : paginationActionData?.map((item: any) => {
                          return (
                            <option value={item?.toLowerCase()} key={item}>
                              {item}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="new-fake-btn">
                    <Button
                      onClick={paginationSubmitButton}
                      btnName={props.buttonLabel ?? "Block"}
                      disabled={submitDisabled}
                      style={{
                        opacity: submitDisabled ? 0.5 : 1,
                        cursor: submitDisabled ? "not-allowed" : "pointer",
                        pointerEvents: submitDisabled ? "none" : "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
