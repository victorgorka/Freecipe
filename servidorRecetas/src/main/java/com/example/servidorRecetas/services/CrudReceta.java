package com.example.servidorRecetas.services;

import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.IngredientRepository;
import com.example.servidorRecetas.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrudReceta {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe) {

        for (int i = 0; i < recipe.getIngredients().size(); i++) {
            Ingredient ingredient = recipe.getIngredients().get(i);

            // Check if the ingredient already exists in the database by its name
            Optional<Ingredient> existingIngredient = ingredientRepository.findByName(ingredient.getName());

            if (existingIngredient.isPresent()) {
                // If the ingredient exists, use the existing entity to avoid creating a new one
                recipe.getIngredients().set(i, existingIngredient.get());
            } else {
                // If the ingredient doesn't exist, save it to the database
                ingredientRepository.save(ingredient);
            }
        }

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
