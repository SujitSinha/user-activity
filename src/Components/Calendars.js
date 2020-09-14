import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css";
import DatePicker from "react-datepicker";
import CancelIcon from "@material-ui/icons/Cancel";
import EventIcon from "@material-ui/icons/Event";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

import "react-datepicker/dist/react-datepicker.css";
import "./calender.scss";

import "moment/locale/ko";

function Calendars(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const customStyles = {
    content: {
      margin: "0 auto",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "65%",
      width: "45%",
    },
  };

  const [startDate, setStartDate] = useState(formatDate());
  const [endDate, setEndDate] = useState(formatDate());
  const [selected, setSelected] = useState(false);
  const [from, setFrom] = useState({});


  function closeModal() {
    setIsOpen(false);
  }

  function formatDate() {
    return new Date(props.date);
  }

  function dateChanged() {
    const filteredDates = props.user.activity_periods.filter((dates) => { return new Date(dates.start_time.substr(0, 11)) > startDate && new Date(dates.start_time.substr(0, 11)) < endDate });
    console.log("filtered:", filteredDates);
    setFrom(filteredDates);
  }

  useEffect(() => {
    dateChanged();
  }, [endDate, startDate]);


  return (
    <div>
      <a className="open-popup" onClick={openModal}>{props.date}</a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-header">
          {" "}
          User Information{" "}
          <CancelIcon
            className="modal-header close-icon"
            onClick={closeModal}
          />{" "}
        </div>
        <hr className="hr-line" />
        <div className="user-details">
          <div className="user-details user-title">User Name </div>
          <div className="user-details user-data">{props.user.real_name}</div>
        </div>
        <div className="user-details">
          <div className="user-details user-title">User Id </div>
          <div className="user-details user-data">{props.user.id}</div>
        </div>
        <div className="user-details">
          <div className="user-details user-title">Activity From</div>
          <div className="user-details user-data">
            <DatePicker
              selected={startDate}
              onChange={(date) => { setStartDate(date) }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <EventIcon className="user-details calendar-icon" />
          </div>
        </div>
        <div className="user-details">
          <div className="user-details user-title">Activity To</div>
          <div className="user-details user-data">
            <DatePicker
              selected={endDate}
              onChange={(date) => { setEndDate(date); setSelected(true); }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <EventIcon className="user-details calendar-icon" />
          </div>
        </div>
        {selected &&
          <div className="user-details">
            <div className="user-details user-title">Online Time</div>
            <div className="user-details user-data">{
              from.map((sh, index) => {
                return (
                  <div key="index">
                    <RemoveRedEyeIcon className="eye-icon" />{sh.start_time}
                     To
                    {sh.end_time}
                  </div>
                )

              })}
            </div>
          </div>}
        {!selected && <div className="user-details">
          <div className="user-details user-title">Online Time</div>
          <div className="user-details user-data"><div><RemoveRedEyeIcon className="eye-icon" />
            {props.date} {props.timein} {" "}
          To {props.timeout}</div></div>
        </div>
        }

        <div className="user-details">
          <div className="user-details user-title">Selected Date</div>
          <div className="user-details user-data">From {startDate.toLocaleString()} To {endDate.toLocaleString()} {" "}
          to  {props.timeout}</div>
        </div>
      </Modal>
    </div>
  );
}

export default Calendars;