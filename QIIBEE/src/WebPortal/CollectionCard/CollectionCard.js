import React, { useState } from "react";
import "./CollectionCard.css";

const CollectionCard = ({ id, name, buyprice, sellprice, stock }) => {
  return (
    <div className="collectionCard">
      <img
        src={
          "https://www.jiomart.com/images/product/original/491121060/coca-cola-1-75-l-product-images-o491121060-p491121060-0-202206022121.jpg"
        }
      />
      <div className="details">
        <div className="name">
          <p>Stock 1</p>
        </div>
        <div className="priceContainer">
          <div id="itemID" className="price">
            Item ID
            <p>1111</p>
          </div>
          <div id="buyprice" className="price">
            Buy Price
            <p>100</p>
          </div>
          <div className="price">
            Sell Price<p>200</p>
          </div>
          <div className="price">
            Stock Quantity<p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
