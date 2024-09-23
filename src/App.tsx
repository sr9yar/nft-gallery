import { useEffect, useState } from "react"
import "./App.css"
import Grid from "./Grid";
import IImage from "./image.interface";
import { useAppState } from "./AppContext";
import History from "./History";
import { isAddress } from 'web3-validator';



async function getData(address: string): Promise<any> {

  const url = `${import.meta.env.VITE_API}${address}`;

  try {

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;

  } catch (error: any) {
    console.error(error.message);
  }

}


function App() {

  const [
    loading,
    setLoading,
  ] = useState<boolean>(true);

  const [
    images,
    setImages,
  ] = useState<IImage[]>([]);


  const {
    setWalletAddress,
    address,
  } = useAppState();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = `${e.target.value}`.trim();
    if (typeof setWalletAddress === 'function') {
      setWalletAddress(newValue);
      // ToDo: 
      // we should debounce here
      // or limit the number of data requests in some other way
      getDataAndSetImages(newValue);
    }
  };

  const getDataAndSetImages = (address?: string) => {
    if (!address || !isAddress(address)) {
      return;
    }
    getData(address)
      .then((data: any) => {
        setLoading(false);

        const images: IImage[] = [];

        for (let i = 0; i < data.ownedNfts.length; i++) {
          if (data.ownedNfts[i].image.thumbnailUrl && data.ownedNfts[i].image.pngUrl) {
            images.push({
              thumbnailUrl: data.ownedNfts[i].image.thumbnailUrl as string,
              pngUrl: data.ownedNfts[i].image.pngUrl as string,
            });
          }
        }

        setImages(images);

      });
  };

  useEffect(() => {
    getDataAndSetImages(address);
  }, []);

  return (
    <>

      <h1>
        NFT Gallery
      </h1>

      <div className="card">
        <div className="label">
          Enter your wallet
        </div>
        <input
          name="address"
          value={address}
          className="input-address"
          onInput={handleInput}
        />
      </div>

      <div>
        {loading ? <div>Loading</div> : <Grid images={images} />}
      </div>

      <div>
        {loading ? <div>Loading</div> : <History />}
      </div>

    </>
  )
}



export default App



//// https://www.youtube.com/watch?v=siVVovFRzfw&ab_channel=NikitaDev


