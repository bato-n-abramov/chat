import React from "react";
import Ethereum from "../ui/Icons/Ethereum";
import Arrow from "../ui/Icons/Arrow";
import './styles.scss';


const CryptoInfo = ({className}) => {
    return (
        <div className={`crypto-info ${className}`}>
            <div className="crypto-info-wrapper">
                <div className="crypto-info-balance">
                    <p>Balance:</p>
                    <div className="crypto-info-balance-value">15 GPT / 350 GPT</div>
                </div>
                <div className="crypto-name">
                    <Ethereum />
                    <span>Etherium </span>
                    <Arrow />
                </div>
            </div>
        </div>
    )
}


export default CryptoInfo;