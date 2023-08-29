import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgvinted from "../assets/imgvinted.jpeg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <div>
        <div className="banner">
          <img src={imgvinted} alt="image bannière vinted" />
        </div>
        <div className="text-banner">
          <h2>Prêts à faire du tri dans vos placards?</h2>
          <Link to="Signup">
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>

      <section className="offers container">
        {data.offers.map((offer) => {
          console.log(data.offers);
          return (
            <Link key={offer._id} to={`/offers/${offer._id}`}>
              <article>
                <div>
                  {offer.owner.account.avatar && (
                    <img
                      className="owner"
                      src={offer.owner.account.avatar.secure_url}
                      alt={offer.owner.account.username}
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <img
                  className="picture"
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
                <p>{offer.product_price} €</p>

                {offer.product_details.map((detail, index) => {
                  if (detail.MARQUE || detail.TAILLE) {
                    return <p key={index}>{detail.MARQUE || detail.TAILLE}</p>;
                  } else {
                    return null;
                  }
                })}
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
