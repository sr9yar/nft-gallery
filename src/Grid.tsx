import {
  useState,
} from "react";
import "./Grid.css"
import IImage from "./image.interface";
import Overlay from "./Overlay";
import { useAppState } from "./AppContext";


function Grid(props: { images: IImage[] }) {

  const {
    setHistoryItem,
  } = useAppState();

  const { images } = props;

  const [pngUrl, setPngUrl] = useState<string | null>(null);

  const onClick = (image: IImage) => {
    if (typeof setHistoryItem === 'function') {
      setHistoryItem(image.pngUrl);
    }
    setPngUrl(image.pngUrl);
  };

  return (
    <>
      <div className="grid-container">
        {images.map((image: IImage) => {
          return (<div className="grid-item">
            <div className="img-wrapper">
              <img src={image.thumbnailUrl} alt="NFT image"
                onClick={() => onClick(image)}
              />
            </div>
          </div>);
        })}
      </div>
      {pngUrl ? <Overlay pngUrl={pngUrl} onClick={() => {
        setPngUrl(null);
      }} /> : <></>}
    </>
  );

}

export default Grid;
