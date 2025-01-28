import React, { useState } from "react";
import "./PopUp.css";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PopUp = ({ result }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button className="btn" onClick={toggleModal}>
        Ver receta
      </Button>

      <Modal isOpen={modalIsOpen} toggle={toggleModal} wrapClassName="recipe-detail" centered>
        <ModalHeader toggle={null} className="ImagenModal">
          <Button className="btnCerrar" onClick={toggleModal}>X</Button>
          <div className="transp">
            <img src={result.image} alt={result.name} className="imagen" />
          </div>
        </ModalHeader>

        <ModalFooter className="ModalFooter">
          <h3 className="titulo">{result.name}</h3>
          <div className="recipe-detail__details">
            <div className="recipe-detail__ingredients">
              <p>
                <strong>Ingredientes</strong>
              </p>
                {result.ingredients && result.ingredients.length > 0 && (
                  <ul className="recipe-detail__list recipe-detail__list--ingredients">
                    {result.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                )}
            </div>
            <div className="recipe-detail__instructions">
              <p>
                <strong>Instrucciones</strong>
              </p>
              {result.instructions && result.instructions.length > 0 && (
                <ol className="recipe-detail__list">
                  {result.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              )}
              <p>¡Buen provecho!</p>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PopUp;
