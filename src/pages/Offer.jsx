import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import "./Offer.css";

const Offer = (props) => {
  const params = useParams();

  const index = props.data.offers.findIndex((item) => item._id === params.id);

  return (
    <div>
      <Header />
      <main className="mainOffer">
        <div className="container">
          <img
            className="clothe"
            alt={props.data.offers[index].product_name}
            src={props.data.offers[index].product_pictures[0].secure_url}
          />
          <section className="infoProduct">
            <p className="price">{props.data.offers[index].product_price+" €"}</p>
            <div className="generalInfo">
              {props.data.offers[index].product_details.map((info, i) => {
                const [[key, value]] = Object.entries(info);
                return (
                  <div key={i}>
                    <p className="key">{key}</p>
                    <p className="value">{value}</p>
                  </div>
                );
              })}
            </div>
            <div className="TitleandSeller">
              <p className="productName">
                {props.data.offers[index].product_name}
              </p>
              <p className="productDescription">
                {props.data.offers[index].product_description}
              </p>
              <div className="seller">
                <img
                  alt={
                    "avatar de " +
                    props.data.offers[index].owner.account.username
                  }
                  src={props.data.offers[index].owner.account.avatar.secure_url}
                />
                <p className="pseudo">
                  {props.data.offers[index].owner.account.username}
                </p>
              </div>
              <butto className="ButtonOfferBuy">Acheter</butto>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Offer;

/*    <div className="ownerClothe">
                  <img
                    alt={"avatar de " + clothe.owner.account.username}
                    src={clothe.owner.account.avatar.url}
                  />
                  <p className="pseudo">{clothe.owner.account.username}</p>
                </div>
                <img
                  className="pictureClothe"
                  alt={clothe.product_name}
                  src={clothe.product_pictures[0].secure_url}
                />
                <p className="price">{clothe.product_price}</p>
                <p className="size">{clothe.product_details[1].TAILLE}</p>
                <p className="brand">{clothe.product_details[0].MARQUE}</p>
              </article>*/
