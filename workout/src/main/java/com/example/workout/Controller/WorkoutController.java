package com.example.workout.Controller;

import com.example.workout.Services.WorkoutServices;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")
public class WorkoutController {

    @Autowired
    private WorkoutServices workoutServices;

    @Value("${openai.api.key}")
    private String apiKey; 

    @PostMapping("/add")
    public String addGoal(@RequestBody Map<String, String> requestData) {
        String goal = requestData.get("goal");
        String duration = requestData.get("duration");
        String equipment = requestData.get("equipment");
        String restDays = requestData.get("restDays");

        if (goal == null || duration == null || equipment == null || restDays == null) {
            return "Missing required fields!";
        }

        try {
            // Fill the user input into the predefined AI prompt
            String restDays2 = restDays.replaceAll("[\\[\\]\"']", "");
            String prompt = "Based on the fitness goal of " + goal + ", " + equipment + " equipment, " + duration + " duration, and " + restDays2 +  " rest days, create a workout plan for the week."; 
            
            System.out.println(prompt);
            // Get the AI-generated response
            String aiResponse = getAIResponse(prompt);

            // Print the AI response to the terminal
            System.out.println("AI Response: " + aiResponse);

            return aiResponse;
        } catch (HttpClientErrorException e) {
            return "Error interacting with the AI API.";
        }
    }

    // Retrieve all fitness goals
    @GetMapping("/all")
    public List<Map<String, Object>> getAllGoals() {
        return workoutServices.getAllGoals();
    }

    // Method to interact with OpenAI API
    private String getAIResponse(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // Construct the request payload for OpenAI API
        String apiEndpoint = "https://api.openai.com/v1/chat/completions";

        String payload = String.format(
            "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"%s\"}], \"max_tokens\": 300}",
            prompt
        );
        
        // Set up the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);  // Correct way to set API key

        // Send the request to OpenAI API
        HttpEntity<String> entity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(apiEndpoint, HttpMethod.POST, entity, String.class);

            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonResponse = objectMapper.readTree(responseBody);

            // Extract content from the JSON response
            String aiResponseText = jsonResponse.path("choices").get(0).path("message").path("content").asText();
           
            return aiResponseText;

        } catch (HttpStatusCodeException e) {
            System.out.println(e.getMessage());
        } catch (JsonMappingException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }

        return "";
    }
}
