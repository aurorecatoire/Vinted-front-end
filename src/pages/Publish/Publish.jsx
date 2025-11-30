import "./Publish.css";
import { useState } from "react";
import InfoPublish from "../../components/Info_publish/info_publish"; // A FAIRE PLUS TARD
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);
  const [exchange, SetExchange] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("city", place);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
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
      console.log(error.response); // aller chercher la clef response ici
    }
  };

  return (
    <main className="publish">
      <div className="container_publish">
        <h1>Vends ton article</h1> {/* Mise en place du formulaire */}
        <form className="form_publish" onSubmit={handleSubmit}>
          <section className="picture">
            <label htmlFor="picture" className="file_picture">
              <FaPlus />
              Ajoute une photo
            </label>
            <input
              type="file"
              id="picture"
              className="picture_download"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </section>
          <section className="title_description">
            <div className="border_bottom">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                placeholder="ex : Chemise Sézane verte"
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="description">Décris ton article</label>
              <input
                type="text"
                placeholder="ex : porté quelque fois, taille correctement"
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="specific_infos">
            <div className="border_bottom">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                placeholder="ex : Zara"
                id="brand"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="border_bottom">
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                placeholder="ex : L / 40 / 12"
                id="size"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="border_bottom">
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                placeholder="ex : Fuschia"
                id="color"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="border_bottom">
              <label htmlFor="condition">État</label>
              <input
                type="text"
                placeholder="ex : Neuf avec étiquette"
                id="condition"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="place">Lieu</label>
              <input
                type="text"
                placeholder="ex : Paris"
                id="place"
                value={place}
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="price_exchange">
            <div>
              <label htmlFor="price">Prix</label>
              <input
                className="price"
                type="text"
                placeholder="ex : 0,00 €"
                id="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="exchange">
              <label htmlFor="exchange" />
              <input
                className="checkbox_exchange"
                type="checkbox"
                id="exchange"
                checked={exchange}
                onChange={(event) => {
                  SetExchange(event.target.checked);
                }}
              />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </section>
          <button
            onClick={() => {
              navigate(`/home`);// Lorsqu'on publie l'annonce, on est redirigé vers la page d'accueil
            }}
          >
            Ajouter
          </button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
