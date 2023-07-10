import React from "react";
import Close from "../movieDetails/close.svg";

const Modal = ({ teaserKey, modal, setModal }) => {
  const handalClick = () => {
    setModal(!modal);
  };
  return (
    <div
      className="modalContainer"
      style={{ display: modal ? "flex" : "none" }}
    >
      <div className="videomodal">
        <img src={Close} alt="" onClick={() => handalClick()} />
        <iframe
          src={`https://www.youtube.com/embed/${teaserKey?.key}?autoplay=1&mute=1 `}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
