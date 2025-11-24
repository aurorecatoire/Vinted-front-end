import "./Publish.css";
import { useState } from "react";
import InfoPublish from "../../components/Info_publish/info_publish"; // A FAIRE PLUS TARD
import axios from "axios";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);
  const [exchange, SetExchange] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_name", title);
    formData.append("product_description", description);
    formData.append("product_price", price);
    formData.append(
      "product_details",
      JSON.stringify([
        { MARQUE: brand },
        { TAILLE: size },
        { COULEUR: color },
        { ÉTAT: status },
        { EMPLACEMENT: place },
        { ECHANGE: exchange },
      ])
    );

    formData.append("picture", picture);
    console.log(token);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Annonce publiée :", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Vends ton article</h1>
      <form onSubmit={handleSubmit}>
        <section className="picture">
          <label htmlFor="picture" className="filepicture" />
          <input
            type="file"
            id="picture"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </section>
        <section className="title_description">
          <label htmlFor="title" />
          <input
            type="text"
            placeholder="ex : Chemise Sézane verte"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor="description" />
          <input
            type="text"
            placeholder="ex : porté quelque fois, taille correctement"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </section>
        <section className="specific_infos">
          <label htmlFor="brand" />
          <input
            type="text"
            placeholder="ex : Zara"
            id="brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <label htmlFor="size" />
          <input
            type="text"
            placeholder="ex : L/40 / 12"
            id="size"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <label htmlFor="color" />
          <input
            type="text"
            placeholder="ex : Fuschia"
            id="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <label htmlFor="status" />
          <input
            type="text"
            placeholder="ex : Neuf avec étiquette"
            id="status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          />
          <label htmlFor="place" />
          <input
            type="text"
            placeholder="ex : Paris"
            id="place"
            value={place}
            onChange={(event) => {
              setPlace(event.target.value);
            }}
          />
        </section>
        <section className="price_exchange">
          <label htmlFor="price" />
          <input
            type="text"
            placeholder="ex : 0,00 €"
            id="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label htmlFor="exchange" />
          <input
            type="checkbox"
            id="exchange"
            checked={exchange}
            onChange={(event) => {
              SetExchange(event.target.checked);
            }}
          />
          <span>Je suis intéressé(e) par les échanges</span>
        </section>
        <button>Ajouter</button>
      </form>
    </main>
  );
};

export default Publish;
