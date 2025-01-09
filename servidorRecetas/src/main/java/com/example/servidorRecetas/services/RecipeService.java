package com.example.servidorRecetas.services;

import com.example.servidorRecetas.RecipeResponse;
import com.example.servidorRecetas.repository.IngredientRepository;
import com.example.servidorRecetas.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
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
    public Mono<Void> fetchAndStoreRecipes() {
        return getRecipesFromApi()
                .flatMap(response -> {
                    // Save each recipe in the database
                    return Mono.just(response.getRecipes())
                            .flatMapMany(Flux::fromIterable)  // Convert List<Recipe> to Flux<Recipe>
                            .flatMap(recipe -> {
                                // Save the recipe in the database
                                return Mono.fromCallable(() -> recipeRepository.save(recipe))
                                        .doOnSuccess(savedRecipe -> {
                                            // Save ingredients for the saved recipe
                                            savedRecipe.getIngredients().forEach(ingredient -> ingredient.setRecipe(savedRecipe));
                                            ingredientRepository.saveAll(savedRecipe.getIngredients());
                                        });
                            })
                            .then(); // This will return a Mono<Void> once all recipes are saved
                });
    }

    // Get recipes from the external API
    private Mono<RecipeResponse> getRecipesFromApi() {
        return webClient.get()
                .uri("/recipes") // This is the endpoint you want to call
                .retrieve()
                .bodyToMono(RecipeResponse.class);  // Deserialize the response into RecipeResponse
    }
}