import axios from "axios";

import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/core";

// import "../Editor.css";
import React, { useState, useContext } from "react";

import { LayerContext } from "../../context/Layer";

import {IndicatorItem} from "../Sidebar/IndicatorItem"
import { object } from "underscore";
//import  g  from "./images/r1.png";

function CodeEditor() {
   
  const [indicators, setIndicators] = useState(false);
  const { loadedData, layerEntity, selectedLayers } = useContext(LayerContext);
  //console.log(loadedData['6ee1c8bc-1daa-4d7d-8ab3-172f7fe495a4'].indicatorName);
  const key=Object.keys(loadedData);
  const names=[];
  for (let i=0;i<key.length;i+=1)
  {
    console.log(key[i]);
    console.log(loadedData[key[i]].indicatorName);
    names.push(loadedData[key[i]].indicatorName);
  }
  const [codev, setCodev] = useState("#Type your code below... \n indicators <- c(" +names +")"); 
  //codev=useState("#Type your code below... \n indicators <- c(" + names +")")
  //const handleSubmit = async() =>{
   // await axios.post("http://localhost:5000/run", {code:codev});
 // }

  
  //onChange=setCodev("#Type your code below... \n indicators <- c(" +names +")");

  const para={code:codev};
  //payload for api
  const handleSubmit = () =>{
    console.log(codev);
    //call api here 
  }
  //code editor created using textarea tag, tabs using chakra ui, also includes scrollable output section
  return (
    <Tabs>
      <TabList>
        <Tab>
          <Text fontWeight="bold" mt="8px">
            Code Editor
          </Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div style={{height: "600px",width: "100%"}}>
            <div className="Editor" style={{height:"100%",width: "50%", float: "left"}}> 
              <textarea
                style={{background: "black", color: "white", padding: "4px"}}
                rows="25"
                cols="60"
                value={codev}
                onChange={(e) => {
                  setCodev(e.target.value);
                }}
              ></textarea>
              <br />
              <button style=  {{background: "green", color: "white", padding: "4px"}} onClick={handleSubmit} >
                Submit
              </button>
              <br />
            </div>
            <div style={{height: "600px", width:"50%", float: "left", overflow: "scroll"}}>
              <img src="r2.png" alt="graph3" style={{height:"500px",width: "500px"}}/>
              <img src="r2.png" alt="graph4" style={{height:"500px",width: "500px"}}/>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    
  );
}

export default CodeEditor;