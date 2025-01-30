import React from "react";
import { NavLink } from "react-router-dom";

function CFPreviewVertical({ contentfragment }) {
  console.log("Start:::CFPreviewVertical::");
  console.log(contentfragment);

  return (
    <div style={styles.tile}>
      <img src={`https://publish-p129970-e1316086.adobeaemcloud.com${contentfragment.productImage._dynamicUrl}`} alt="Product" style={styles.image} />
      <h2>{contentfragment.productTitle}</h2>
      <p>{contentfragment.productDesc.plaintext}</p>
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
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
};

export default CFPreviewVertical;