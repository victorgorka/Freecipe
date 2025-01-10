package com.example.servidorRecetas.model;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Default constructor
    public Ingredient() {}

    // Constructor to handle name directly
    public Ingredient(String name) {
        this.name = name;
    }

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return Objects.equals(name, that.name); // Compare only by name
    }

    @Override
    public int hashCode() {
        return Objects.hash(name); // Hash based only on name
    }
}