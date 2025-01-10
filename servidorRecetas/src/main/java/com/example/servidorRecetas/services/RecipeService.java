package com.example.servidorRecetas.services;

import com.example.servidorRecetas.RecipeResponse;
import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.IngredientRepository;
import com.example.servidorRecetas.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

import java.util.*;

@Service
public class RecipeService {

    private final WebClient webClient;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    @Autowired
    public RecipeService(WebClient webClient, RecipeRepository recipeRepository, IngredientRepository ingredientRepository) {
        this.webClient = webClient;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    // Fetch recipes from the external API and save them
    @Transactional
    public void fetchAndStoreRecipes() {
        // Get the recipes from the external API (blocking call for synchronous)
        RecipeResponse response = getRecipesFromApi().block();

        // Iterate through each recipe and save the ingredients first
        for (Recipe recipe : response.getRecipes()) {

            // Ensure ingredients are not null and are initialized
            if (recipe.getIngredients() == null || recipe.getIngredients().isEmpty()) {
                continue; // Skip if no valid ingredients are present
            }

            // First, make sure ingredients are saved and linked
            List<Ingredient> savedIngredients = new ArrayList<>();

            for (Ingredient ingredient : recipe.getIngredients()) {

                // Check if the ingredient already exists in the database by name
                Optional<Ingredient> existingIngredientOpt = ingredientRepository.findByName(ingredient.getName());
                if (existingIngredientOpt.isPresent()) {
                    // If the ingredient already exists, get it from the database
                    savedIngredients.add(existingIngredientOpt.get());
                } else {
                    // If the ingredient does not exist, save it
                    Ingredient savedIngredient = ingredientRepository.save(ingredient);
                    savedIngredients.add(savedIngredient);
                }
            }

            // Now, associate the saved ingredients with the recipe
            recipe.setIngredients(savedIngredients);

            // Save the recipe (with its associated ingredients) to the database
            recipeRepository.save(recipe);
        }
    }



    // Get recipes from the external API
    private Mono<RecipeResponse> getRecipesFromApi() {
        return webClient.get()
                .uri("/recipes") // This is the endpoint you want to call
                .retrieve()
                .bodyToMono(RecipeResponse.class);  // Deserialize the response into RecipeResponse
    }
}
