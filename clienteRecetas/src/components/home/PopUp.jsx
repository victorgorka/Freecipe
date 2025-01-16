import React, { useState } from 'react'
import './PopUp.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import spagetti from '../assets/spagetti.jpg';

class PopUp extends React.Component {
  state={
    abierto: false,
  }
  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto})
  }
  render(){
      const modalStyles={
        position: "absolute",
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
      }
    return(
      <>
        <Button color='success' onClick={this.abrirModal}>Mostar</Button>

        <Modal isOpen={this.state.abierto} style={modalStyles}>
          <ModalHeader className='ModalHeader'>
          <img className='imagen'src={spagetti} alt="Foto spagetti" />
          </ModalHeader>
          {/* <ModalBody>
            <FormGroup>
              <Label for='usuario'>Usuario</Label>
              <Input type='text' id='usuario'/>
            </FormGroup>
            <FormGroup>
              <Label for='password'>Contraseña</Label>
              <Input type='text' id='password'/>
            </FormGroup>
          </ModalBody> */}
          <ModalFooter className='ModalFooter'>
            <div className='titulo'>
              <p>Spagetti</p>
              {/* <ul>
                <li></li>
              </ul> */}
            </div>
            <div className='uno'>
              <p>Ingredientes</p>
              {/* <ul>
                <li></li>
              </ul> */}
            </div>
            <div className='dos'>
              <p>Pasos a seguir</p>
              {/* <ul>
                <li></li>
              </ul> */}
            </div>
            <Button color='secondary' onClick={this.abrirModal}>X</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default PopUp