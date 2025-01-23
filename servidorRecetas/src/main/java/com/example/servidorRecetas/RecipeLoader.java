package com.example.servidorRecetas;

import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.IngredientRepository;
import com.example.servidorRecetas.repository.RecipeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class RecipeLoader implements CommandLineRunner {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    public RecipeLoader(RecipeRepository recipeRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (recipeRepository.count() == 0) { // Only load data if the database is empty
            try (InputStream inputStream = new ClassPathResource("recipesTraducido.json").getInputStream()) {
                ObjectMapper objectMapper = new ObjectMapper();
                RecipeResponse response = objectMapper.readValue(inputStream, RecipeResponse.class);

                for (Recipe recipe : response.getRecipes()) {
                    List<Ingredient> savedIngredients = new ArrayList<>();

                    for (Ingredient ingredient : recipe.getIngredients()) {
                        // Check if the ingredient already exists in the database
                        Optional<Ingredient> existingIngredientOpt = ingredientRepository.findByName(ingredient.getName());

                        Ingredient savedIngredient;
                        if (existingIngredientOpt.isPresent()) {
                            // Use the existing ingredient
                            savedIngredient = existingIngredientOpt.get();
                        } else {
                            // Merge the new ingredient (insert or update)
                            savedIngredient = ingredientRepository.save(ingredient);
                        }
                        savedIngredients.add(savedIngredient);
                    }

                    recipe.setIngredients(savedIngredients);
                    recipeRepository.save(recipe);
                }
            } catch (IOException e) {
                throw new RuntimeException("Error reading recipes file", e);
            }
        } else {
            System.out.println("Database already contains data. Skipping data loading.");
        }
    }
}