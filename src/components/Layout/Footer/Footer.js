import React from "react";
import "./Footer.scss";
import "../../../index.css";
import notificationIcon from "../../../assets/ICON_NOTIFICATION.svg";
import settingsIcon from "../../../assets/ICON_SETTINGS.svg";
import exploreIcon from "../../../assets/ICON_EXPLORE_COINS.svg";
import walletIcon from "../../../assets/ICON_WALLET.svg";
import footerLineIcon from "../../../assets/IPHONE_X_BAR_HOME.svg";

const Footer = () => {

  return (
    <>
      <div className="footerBackground ">
        <div style={{display:"flex", flexDirection:"row"}} className="centerItems">
          <img src={walletIcon} alt="walletIcon" className="footerImageSize" />
          <img src={exploreIcon} alt="exploreIcon" className="footerImageSize" />
          <img src={notificationIcon} alt="notificationIcon" className="footerImageSize" />
          <img src={settingsIcon} alt="settingsIcon" className="footerImageSize" />
        </div>
        <img src={footerLineIcon} alt="footerLineIcon" className="footerIconSize" />
      </div>
    </>
  )
};

export default Footer;