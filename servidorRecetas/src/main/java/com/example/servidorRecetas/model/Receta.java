package com.example.servidorRecetas.model;
import jakarta.persistence.*;


@Entity
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    
    @Lob
    private String instrucciones;
    
    private Boolean keto;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getInstrucciones() {
        return instrucciones;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }

    public Boolean getKeto() {
        return keto;
    }

    public void setKeto(Boolean keto) {
        this.keto = keto;
    }
}
