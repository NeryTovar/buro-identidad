package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.PokemonDTO;
import com.example.demo.entity.PokemonSearch;
import com.example.demo.repository.PokemonSearchRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PokemonService {
    @Autowired
    private PokemonSearchRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";

    public PokemonDTO getPokemon(String name) throws IOException {
        try {
            String url = POKEAPI_URL + name.toLowerCase();
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);

            PokemonDTO pokemon = new PokemonDTO();
            pokemon.setName(root.path("name").asText());
            pokemon.setSpecies(root.path("species").path("name").asText());

            List<String> types = new ArrayList<>();
            for (JsonNode typeNode : root.path("types")) {
                types.add(typeNode.path("type").path("name").asText());
            }
            pokemon.setTypes(types);

            List<String> abilities = new ArrayList<>();
            for (JsonNode abilityNode : root.path("abilities")) {
                abilities.add(abilityNode.path("ability").path("name").asText());
            }
            pokemon.setAbilities(abilities);

            List<String> moves = new ArrayList<>();
            for (JsonNode moveNode : root.path("moves")) {
                moves.add(moveNode.path("move").path("name").asText());
            }
            pokemon.setMoves(moves);

            List<PokemonDTO.Stat> stats = new ArrayList<>();
            for (JsonNode statNode : root.path("stats")) {
                PokemonDTO.Stat stat = new PokemonDTO.Stat();
                stat.setName(statNode.path("stat").path("name").asText());
                stat.setValue(statNode.path("base_stat").asInt());
                stats.add(stat);
            }
            pokemon.setStats(stats);

            String imageUrl = root.path("sprites").path("front_default").asText();
            if (!imageUrl.isEmpty()) {
                byte[] imageBytes = restTemplate.getForObject(imageUrl, byte[].class);
                pokemon.setImageBase64(Base64.getEncoder().encodeToString(imageBytes));
            }

            PokemonSearch search = new PokemonSearch();
            search.setName(name);
            search.setSearchDate(LocalDateTime.now());
            search.setResponseJson(objectMapper.writeValueAsString(pokemon));
            repository.save(search);

            return pokemon;
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Pokémon not found: " + name);
        } catch (IOException e) {
            throw new IOException("Error processing Pokémon data", e);
        }
    }
}
