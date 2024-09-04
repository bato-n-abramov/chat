import React from "react";
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
                    <div className="icon"></div>
                    Etherium 
                </div>
            </div>
        </div>
    )
}


export default CryptoInfo;