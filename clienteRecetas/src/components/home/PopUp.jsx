import React, { useState } from "react";
import "./PopUp.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PopUp = ({ result }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button color="success" onClick={toggleModal}>
        Ver receta
      </Button>

      <Modal isOpen={modalIsOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>
          <img src={result.image} alt={result.name} className="modal-img" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-content">
            <h3>{result.name}</h3>
            <p>
              <strong>Ingredientes:</strong>
            </p>
            <ul>
              {result.ingredients && result.ingredients.length > 0 && (
                <ul>
                  {result.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))}
                </ul>
              )}
            </ul>
            <p>
              <strong>Instrucciones:</strong>
            </p>
            <ol>
              {result.instructions && result.instructions.length > 0 && (
                <ol>
                  {result.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              )}
            </ol>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PopUp;
