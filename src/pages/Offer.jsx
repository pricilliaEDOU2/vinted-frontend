import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // useParams permet de récupérer les params présent dans l'url de la page
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="container">
      <div className=" offer-page">
        <img src={data.product_image.secure_url} alt={data.product_name} />
        <div>
          <p>{data.product_price} €</p>
          {data.product_details.map((detail, index) => {
            console.log(detail);
            const keys = Object.keys(detail);
            // console.log(keys);
            const key = keys[0];
            // console.log(key);
            return (
              <p key={index}>
                {key} : {detail[key]}
              </p>
            );
          })}

          <div>
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
