import React, { useEffect, useState } from 'react';
import { Provider, defaultTheme, Grid, View } from "@adobe/react-spectrum";
import ErrorBoundary from "react-error-boundary";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import CFPreviewVertical from "./CFPreviewVertical";
import CFPreviewHorizontal from "./CFPreviewHorizontal";

function App(props) {
  const [contentfragment, setContentfragment] = useState(contentfragment,"");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          headers: new Headers({
            Authorization: "Bearer " + props.ims.token,
            "Content-Type": "application/json",
          }),
        };

        const cfparam = new URLSearchParams(document.location.search);
        console.log("CFParam sent is:" + cfparam.get("cfpath"));
        let previewCf = cfparam.get("cfpath");

        const url = `https://author-p129970-e1316086.adobeaemcloud.com/graphql/execute.json/myer/productbypath;productPath=${previewCf}`;

        const response = await fetch(url + "?ts=" + Math.random() * 1000, options);
        const contentfragment = await response.json();
        if (contentfragment.data) {
          console.log(contentfragment.data);
          console.log(contentfragment.data.productsByPath.item);
          let content = contentfragment.data.productsByPath.item;
          setContentfragment(content);
          console.log(
            "Variations:" + contentfragment.data.productsByPath.item._variations
          );
        } else {
          console.log("no data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.ims.token]); // Dependency array ensures this runs only when token changes

  console.log("before CFPreview:");
  console.log(contentfragment);
  return (
    <ErrorBoundary onError={onError} FallbackComponent={fallbackComponent}>
      <Router>
        <Provider theme={defaultTheme} colorScheme={"light"}>
          <Grid
            areas={["sidebar content"]}
            columns={["256px", "3fr"]}
            rows={["auto"]}
            height="100vh"
            gap="size-100"
          >
            <View
              gridArea="sidebar"
              backgroundColor="gray-200"
              padding="size-200"
            >
              <SideBar></SideBar>
            </View>
            <View gridArea="content" padding="size-200">
              <h2>Vertical Tile</h2>
              {contentfragment && <CFPreviewVertical contentfragment={contentfragment} />}
              <br/>  <hr/> <br/>
              <h2>Horizontal Tile</h2>
              {contentfragment && <CFPreviewHorizontal contentfragment={contentfragment} />}
            </View>
          </Grid>
        </Provider>
      </Router>
    </ErrorBoundary>
  );

  // Methods

  // error handler on UI rendering failure
  function onError(e, componentStack) {
    console.error("START - On Error");
    console.error(e);
    console.error(componentStack);
    console.error("END - On Error");
  }

  // component to show if UI fails rendering
  function fallbackComponent({ componentStack, error }) {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Error
        </h1>
        <pre>{componentStack + "\n" + error.message}</pre>
      </React.Fragment>
    );
  }
}

export default App;
