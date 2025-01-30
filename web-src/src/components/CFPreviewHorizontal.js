import React from "react";
import { NavLink } from "react-router-dom";

function CFPreviewHorizontal({ contentfragment }) {
  console.log("Start:::CFPreviewHorizontal::");
  console.log(contentfragment);

  return (
    <div>
      {/* New Tile Layout with Image on Left and Text on Right */}
      <div style={styles.horizontalTile}>
        <img src={`https://publish-p129970-e1316086.adobeaemcloud.com${contentfragment.productImage._dynamicUrl}`} alt="Product" style={styles.horizontalImage} />
        <div style={styles.textContainer}>
          <h2>{contentfragment.productTitle}</h2>
          <p>{contentfragment.productDesc.plaintext}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  tile: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    textAlign: "center",
    marginBottom: "16px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  horizontalTile: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "600px",
  },
  horizontalImage: {
    width: "150px",
    height: "auto",
    borderRadius: "8px",
    marginRight: "16px",
  },
  textContainer: {
    flex: 1,
  },
};

export default CFPreviewHorizontal;