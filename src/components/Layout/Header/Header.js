import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { useMediaQuery } from "react-responsive";
// import logo from "../../../assets/RankMath_logo.svg";
import "./Header.scss";
import "../../../index.css";
import LeftArrowIcon from "../../../assets/LeftArrowIcon";
import courierIcon from "../../../assets/courierInfo.svg";
import topRightIcon from "../../../assets/ICONS_SIGNAL_WIFI_BATTERY.svg";
import editIcon from "../../../assets/edit.svg";
import removeIcon from "../../../assets/remove.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import footerLineIcon from "../../../assets/IPHONE_X_BAR_HOME.svg";
import ellipseIcon from "../../../assets/headerEllipse.svg";
import {GoMoveToTop} from "react-icons/go";

const OurHeader = (props) => {
  // const isMobile = useMediaQuery({ maxWidth: 876 }); // Set the maximum width for mobile devices
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const currentTime = getCurrentTime();

  const iconStyle = {
    border: "none",
    padding: 0,
    // background: "transparent",
    background: "white",
  };

  return (
    <>
      <div className="headerBackground1">
        <div className="white centerItems" style={{borderTopRightRadius: "15%"}}>
          <h4>{currentTime}</h4>
        </div>
        <div className="applicationBg" style={{borderBottomLeftRadius: "30%"}}>
          <img src={footerLineIcon} alt="topRightIcon" className="smallImageSize" />          
        </div>
        <div className="applicationBg" style={{borderBottomRightRadius: "30%"}}>
          <img src={ellipseIcon} alt="topRightIcon" className="imageSize" />
        </div>
        <div className="white centerItems" style={{borderTopLeftRadius: "15%"}}>
          <img src={topRightIcon} alt="topRightIcon" className="imageSize" />
        </div>
      </div>
      <div className="centerItems headerBackground2">
        <div style={{flex: 1, marginLeft: "1em"}}>
          <DropdownButton id="dropdown-basic-button" variant="none" title={<LeftArrowIcon size={24} style={{ }} />}>
            <Dropdown.Item >Market</Dropdown.Item>
            <Dropdown.Item >Trade</Dropdown.Item>
            <Dropdown.Item >Transfer</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className='nameStyles'> {props.coinName} Wallet </div>
        <Dropdown className="flexOne">
          <Dropdown.Toggle variant="outline-dark" className="dropdown-toggle" style={iconStyle}>
            <BsThreeDotsVertical size={24} style={iconStyle} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="curve">
            <Dropdown.Item onClick={() => props.setCurrency("USD")}>
              <span className="small bold">Edit</span>
              <img src={editIcon} alt="editIcon" className="imageSize marginEdit" />
              <hr className="my-1" style={{ borderTop: '1px solid #ccc' }} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.setCurrency("EUR")}>
              <span className="small bold">Courier info</span>
              <img src={courierIcon} alt="courierIcon" className="imageSize marginCourier" />
              <hr className="my-1" style={{ borderTop: '1px solid #ccc' }} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.setCurrency("GBP")}>
              <span className="small marginShare bold">Share</span>           
              <GoMoveToTop />
              <hr className="my-1" style={{ borderTop: '1px solid #ccc' }} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.setCurrency("JPY")}>
              <span className="small red bold">Remove</span>
              <img src={removeIcon} className="imageSize marginRemove" alt="removeIcon"  />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default OurHeader;
