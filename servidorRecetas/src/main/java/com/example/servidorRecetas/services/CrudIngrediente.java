package com.example.servidorRecetas.services;

import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrudIngrediente {

    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> getIngredientById(Long id) {
        return ingredientRepository.findById(id);
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public Ingredient updateIngredient(Long id, Ingredient updatedIngredient) {
        if (ingredientRepository.existsById(id)) {
            updatedIngredient.setId(id);  // Ensure the ID is set for the existing record
            return ingredientRepository.save(updatedIngredient);
        }
        return null; // or throw exception
    }

    public boolean deleteIngredient(Long id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
