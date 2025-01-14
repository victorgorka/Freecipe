package com.example.servidorRecetas.services;

import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrudReceta {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(int id, Recipe updatedRecipe) {
        if (recipeRepository.existsById((long) id)) {
            updatedRecipe.setId(id);  // Ensure the ID is set for the existing record
            return recipeRepository.save(updatedRecipe);
        }
        return null; // or throw exception
    }

    public boolean deleteRecipe(Long id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
