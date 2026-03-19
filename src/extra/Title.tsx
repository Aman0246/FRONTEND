import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import $ from "jquery";
import DateRangePicker from "react-bootstrap-daterangepicker";
import MultiButton from "./MultiButton";
import moment from 'moment';

export default function Title(props: any) {
  const {
    newClass,
    name,
    dayAnalyticsShow,
    titleShow,
    setStartDate,
    setEndDate,
    endDate,
    startDate,
    setMultiButtonSelect,
    multiButtonSelect,
    labelData,
    color,
    bgColor,
  } = props;

  const handleApply = (event: any, picker: any) => {
    let start = dayjs(picker.startDate).format("YYYY-MM-DD");
    let end = dayjs(picker.endDate).format("YYYY-MM-DD");

    if (picker.chosenLabel === "All") {
      start = "All";
      end = "All";
    }
    setStartDate(start);
    setEndDate(end);
  };

  const [isDateRangePickerVisible, setDateRangePickerVisible] = useState(false);

  const [state, setState] = useState({
    start: dayjs().subtract(29, "days"),
    end: dayjs(),
  });
  const { start, end } = state;

  const handleCancel = (event: any, picker: any) => {
    picker?.element.val("");
    setStartDate("");
    setEndDate("");
  };

  const handleCallback = (start: any, end: any) => {
    setState({ start, end });
  };
  // const label = start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY");

  const startAllDate = new Date("1970-01-01").toISOString().split("T")[0];
  const endAllDate = moment().format("YYYY-MM-DD");

  // useEffect(() => {
  //   $(document).ready(function () {
  //     $("data-range-key").removeClass("active");
  //     // $("[data-range-key='All']").addClass("active");
  //   });
  // }, []);

  const handleInputClick = () => {
    setDateRangePickerVisible(!isDateRangePickerVisible);
  };



  return (
    <>
      <div>
        <div className="row align-items-center ">
          <div
            className={` ${dayAnalyticsShow
              ? `col-12 col-sm-12 col-md-12 ${titleShow ? "col-lg-6" : "col-lg-8"
              }`
              : "col-12"
              }`}
          >
            {/* <h4 className="heading-dashboard d-block">Welcome Admin !</h4> */}

            {titleShow && (
              <div className={!newClass ? `boxBetween ` : `${newClass}`}>
                <div className="title">
                  <h4
                    className="mb-0  text-capitalize text-nowrap"
                    style={{ fontSize: "20px", fontWeight: "500" }}
                  >
                    {name}
                  </h4>
                </div>
              </div>
            )}
            <div className="multi-user-btn">
              <MultiButton
                multiButtonSelect={
                  multiButtonSelect ? multiButtonSelect : titleShow
                }
                setMultiButtonSelect={
                  setMultiButtonSelect ? setMultiButtonSelect : ""
                }
                label={labelData ? labelData : []}
              />
            </div>
          </div>
          {dayAnalyticsShow ? (
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-4 pl-0 ${titleShow ? "col-lg-6" : "col-lg-4"
                }`}
              style={{ paddingRight: "10px", paddingLeft: "0px" }}
            >
              <div className="dayAnalytics justify-content-end">
                <div className="date-range-box">
                  <DateRangePicker
                    initialSettings={{
                      startDate: undefined,
                      endDate: undefined,
                      ranges: {
                        All: [new Date("1970-01-01"), dayjs().toDate()],
                        Today: [moment().toDate(), moment().toDate()],
                        Yesterday: [
                          moment().subtract(1, "days").toDate(),
                          moment().subtract(1, "days").toDate(),
                        ],

                        "Last 7 Days": [
                          moment().subtract(6, "days").toDate(),
                          moment().toDate(),
                        ],
                        "Last 30 Days": [
                          moment().subtract(29, "days").toDate(),
                          moment().toDate(),
                        ],
                        "This Month": [
                          moment().startOf("month").toDate(),
                          moment().endOf("month").toDate(),
                        ],
                        "Last Month": [
                          moment()
                            .subtract(1, "month")
                            .startOf("month")
                            .toDate(),
                          moment().subtract(1, "month").endOf("month").toDate(),
                        ],
                        // "Reset Dates": [new Date("1970-01-01"), moment().toDate()],
                      },
                      maxDate: new Date(),
                    }}
                    onCallback={handleCallback}
                    onApply={handleApply}
                  >
                    <input
                      type="text"
                      color={color}
                      readOnly
                      // placeholder="Select Date Range"
                      onClick={handleInputClick}
                      className={`daterange float-right  mr-4  text-center ${bgColor} ${color}`}
                      // value={
                      //   (startDate === startAllDate && endDate === endAllDate) || (startDate === "All" && endDate === "All")
                      //     ? "Select Date Range"
                      //     : dayjs(startDate).format("MM/DD/YYYY") && dayjs(endDate).format("MM/DD/YYYY")
                      //       ? `${dayjs(startDate).format("MM/DD/YYYY")} - ${dayjs(endDate).format("MM/DD/YYYY")}`
                      //       : "Select Date Range"
                      // }

                      // value={
                      //   (startDate === startAllDate &&
                      //     endDate === endAllDate) ||
                      //     (startDate.toUpperCase() === "ALL" && endDate.toUpperCase() === "ALL")
                      //     ? "ALL"
                      //     : `${moment(startDate).format("YYYY-MM-DD")} To ${moment(
                      //       endDate
                      //     ).format("YYYY-MM-DD")}`
                      // }

                      value={startDate === "All" && endDate === "All"
                        ? "All"
                        : startDate && endDate
                          ? `${moment(startDate).format("YYYY-MM-DD")} To ${moment(endDate).format("YYYY-MM-DD")}`
                          : "Select Date Range"}
                      style={{
                        fontWeight: 500,
                        cursor: "pointer",
                        background: "white",
                        color: "rgba(0, 0, 0, 0.87)",
                        display: "flex",
                        width: "100%",
                        justifyContent: "end",
                        fontSize: "13px",
                        padding: "7px",
                        maxWidth: "250px",
                        borderRadius: "5px",
                        border: "1px solid #997CFA",
                      }}
                    />
                  </DateRangePicker>
                  {/* <div className="right-drp-btn" style={{padding : "10px"}}>Analytics</div> */}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
