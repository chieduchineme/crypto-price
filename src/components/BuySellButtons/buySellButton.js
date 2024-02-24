import React from "react";
import "../../index.css";
import styles from "./buySell.module.scss";
import buyCoinIcon from "../../assets/BUY_BTC.svg";
import sellCoinIcon from "../../assets/SELL_BTC.svg";

const BuySellButton = (props) => {
    return (
        <>
            <button className={styles.card}>
            <div style={{margin:"auto", display: "flex", flexDirection:"column", marginTop:"1em"}}>
                <img src={props.imgUrl} className={styles.imageSize}
                alt={props.name}  />
                {props.symbol && (
                <p> {props.action} {props.symbol.toUpperCase()} 
                </p>
                )}
            </div>
            </button>
        </>
    )

}


const BuySell = (props) => {
    return (
        <>
        <div className="centerItems">
            {props.coinInfo != null && (
            <div className={styles.inRow}>
                <BuySellButton 
                    imgUrl = {buyCoinIcon} 
                    action="Buy" symbol={props.symbol} name={props.name}                
                />
                <BuySellButton className={styles.rightCard}
                    imgUrl = {sellCoinIcon} 
                    action="Sell" symbol={props.symbol} name={props.name}   
                />
            </div>
        )}
        </div>
        </>
    )

}

export default BuySell;
