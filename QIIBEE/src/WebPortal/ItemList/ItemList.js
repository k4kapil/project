import React from "react";
import CollectionCard from "../CollectionCard/CollectionCard";
import "./ItemList.css";

const ItemList = () => {
  let collections = [];

  for (let i = 0; i < 5; i++) {
    collections[i] = {
      id: i,
      name: "Stock" + i,
      buyprice: "10",
      sellprice: "20",
      stock: 5,
    };
  }

  return (
    <div className="apeList">
      {collections.map((nft) => (
        <div key={nft.id}>
          <CollectionCard
            id={nft.token_id}
            name={nft.name}
            buyprice={nft.buyprice}
            sellprice={nft.sellprice}
            stock={nft.stock}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
