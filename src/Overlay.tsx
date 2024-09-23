import {
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import "./Overlay.css"


function Overlay(props: { pngUrl: string | null, onClick: MouseEventHandler<HTMLDivElement> }) {

  const { pngUrl, onClick } = props;

  const [classNames, setClassNames] = useState<string[]>(["overlay", "invisible"]);

  if (!pngUrl) {
    return <></>;
  }

  useEffect(() => {
    setClassNames(classNames.filter((c: string) => c !== "invisible"));
  }, []);

  return (
    <div className={classNames.join(" ")} onClick={onClick} >
      <div className="image-wrapper">
        <img src={pngUrl} alt="NFT image" />
      </div>
    </div >
  );

}

export default Overlay;
