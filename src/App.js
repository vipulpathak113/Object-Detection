// Import dependencies
import React from "react";
import * as cocossd from '@tensorflow-models/coco-ssd'
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./drawRect";

class App extends React.Component {

  constructor() {
    super();
    this.webcamRef = React.createRef();
    this.canvasRef = React.createRef();

  }

  componentWillMount() {
    this.runCoco();
  }

  runCoco = async () => {
    // 3. TODO - Load network 
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      this.detect(net);
    }, 10);
  };

  detect = async (net) => {

    if (
      typeof this.webcamRef.current !== "undefined" &&
      this.webcamRef.current !== null &&
      this.webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = this.webcamRef.current.video;
      const videoWidth = this.webcamRef.current.video.videoWidth;
      const videoHeight = this.webcamRef.current.video.videoHeight;

      // Set video width
      this.webcamRef.current.video.width = videoWidth;
      this.webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      this.canvasRef.current.width = videoWidth;
      this.canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const obj = await net.detect(video);
      console.log(obj)

      // Draw mesh
      const ctx = this.canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      drawRect(obj, ctx)
    }
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Webcam
            ref={this.webcamRef}
            muted={true}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={this.canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;
