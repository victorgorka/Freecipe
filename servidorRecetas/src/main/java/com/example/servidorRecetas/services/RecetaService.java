package com.example.servidorRecetas.services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class RecetaService {

    private final WebClient webClient;

    // Constructor-based injection of WebClient
    public RecetaService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://dummyjson.com").build();
    }

    public Mono<String> getRecipes() {
        // Call the API and return the response as String (you can customize it as per your needs)
        return this.webClient.get()
                .uri("/recipes?limit=0")
                .retrieve()
                .bodyToMono(String.class);
    }
}


//import com.example.servidorRecetas.RecipeApiResponse;
//import com.example.servidorRecetas.model.Ingrediente;
//import com.example.servidorRecetas.model.Receta;
//import com.example.servidorRecetas.repository.IngredienteRepository;
//import com.example.servidorRecetas.repository.RecetaRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//import org.springframework.transaction.annotation.Transactional;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class RecetaService {
//
//    private final WebClient.Builder webClientBuilder;
//    private final RecetaRepository recetaRepository;
//    private final IngredienteRepository ingredienteRepository;
//
//    private static final String RECIPE_API_URL = "https://dummyjson.com/recipes";
//
//    public Mono<List<Receta>> fetchRecipes() {
//        return webClientBuilder.baseUrl(RECIPE_API_URL)
//                .build()
//                .get()
//                .retrieve()
//                .bodyToMono(RecipeApiResponse.class)
//                .map(response -> response.getRecipes());
//    }
//
//    @Transactional
//    public void saveRecipes(List<Receta> recetas) {
//        for (Receta receta : recetas) {
//            // Save ingredients
//            for (String ingredientName : receta.getIngredients()) {
//                ingredienteRepository.findByName(ingredientName).orElseGet(() -> {
//                    Ingrediente ingrediente = new Ingrediente();
//                    ingrediente.setName(ingredientName);
//                    return ingredienteRepository.save(ingrediente);
//                });
//            }
//
//            // Save the recipe
//            recetaRepository.save(receta);
//        }
//    }
//
//    public List<Receta> searchRecipesByIngredient(String ingrediente) {
//        return recetaRepository.findByIngredientsContaining(ingrediente);
//    }
//}
