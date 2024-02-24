import React from "react";
import styles from "./BulletForGraph.scss";
import greenCircleIcon from "../../../assets/CIRCLE_GREEN_HIGHER.svg";
import magentaCircleIcon from "../../../assets/CIRCLE_MAGENTA_LOWER.svg";
import yellowCircleIcon from "../../../assets/circleYellow.svg";

const BulletForGraphs = (props) => {
    return (
      <>
        <div>
        {props.coinInfo != null && (
          <ul style={{position: "relative", listStyleType:"none", marginTop: "-4em"}}>
            <div>
              <img src={yellowCircleIcon} alt="courierIcon" className="imageSize marginCourier" style={{marginBottom: "2.7em", marginLeft:"4.5em"}}/>
              <li style={{marginBottom:"-10.5em", marginTop:"-4em", marginLeft:"6em", fontWeight:"bold" }} className={styles.red_bullet}>1 {props.symbol}= $ {props.price}</li>
            </div>
            <div style={{display:"flex", flexDirection:"row", marginTop:"-6em",marginBottom:"-2em", marginLeft:"0.9em" }} className={styles.bullet_list}>
              <div>
                <img src={magentaCircleIcon} alt="courierIcon" className="coloredImageSize marginCourier" />
                <span style={{ marginRight:"2em" }} className={styles.green_bullet}>Lower: {props.highestPriceValue}</span>
              </div>
              <div>
                <img src={greenCircleIcon} alt="courierIcon" className="coloredImageSize marginCourier" />
                <span className={styles.orange_bullet}>Higher: {props.lowestPriceValue} </span>
              </div>
            </div>
          </ul>
    )}
        </div>
     </>
    )
  }

export default BulletForGraphs;
