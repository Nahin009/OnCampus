import {
  ReactPhotoSphereViewer,
  VirtualTourPlugin,
  GalleryPlugin,
  MarkersPlugin
} from "react-photo-sphere-viewer";
import React from "react";

const baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";

function PhotoViewer360({ nodes, src }) {
  const pSRef = React.createRef();

  const handleReady = (instance) => {
    const virtualTour = instance.getPlugin(VirtualTourPlugin);
    if (!virtualTour) return;

    virtualTour.setNodes(nodes);
  };

  const plugins = [
    MarkersPlugin,
    [
      GalleryPlugin,
      {
        thumbnailSize: { width: 100, height: 100 }
      }
    ],
    [
      VirtualTourPlugin,
      {
        positionMode: "gps",
        renderMode: "3d"
      }
    ]
  ];

  return (
    <div className="App" id={"container-360"}>
      <ReactPhotoSphereViewer
        ref={pSRef}
        loadingImg={baseUrl + "loader.gif"}
        touchmoveTwoFingers={true}
        mousewheelCtrlKey={true}
        defaultYaw={"130deg"}
        navbar={["zoom", "move", "download", "description", "caption", "fullscreen"]}
        height={"100vh"}
        width={"100%"}
        hideNavbarButton={true}
        onReady={handleReady}
        plugins={plugins}
        container={"container-360"}
        src={src}
      ></ReactPhotoSphereViewer>
    </div>
  );
}

export default PhotoViewer360;