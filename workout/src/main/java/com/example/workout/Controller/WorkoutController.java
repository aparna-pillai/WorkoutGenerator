package com.example.workout.Controller;

import com.example.workout.Services.WorkoutServices;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")
public class WorkoutController {

    @Autowired
    private WorkoutServices workoutServices;

    @Value("${openai.api.key}")
    private String apiKey; // Make sure to set this in your application.properties file

    // Insert data using raw SQL
    @PostMapping("/add")
    public String addGoal(@RequestParam String goal, 
                          @RequestParam String duration, 
                          @RequestParam String equipment, 
                          @RequestParam String restDays) {
        int rowsAffected = workoutServices.saveGoal(goal, duration, equipment, restDays);
        return rowsAffected > 0 ? "Goal added successfully!" : "Failed to add goal.";
    }

    // Retrieve all fitness goals
    @GetMapping("/all")
    public List<Map<String, Object>> getAllGoals() {
        return workoutServices.getAllGoals();
    }

    // Generate an AI response based on user input
    @PostMapping("/generate-ai-response")
    public ResponseEntity<String> generateAIResponse(@RequestParam String userInput) {
        try {
            // Fill the user input into the predefined AI prompt
            String prompt = "You are a fitness assistant. Based on the following goal description: \"" + userInput + "\", provide a detailed and motivating workout plan.";

            String currentPrompt = "Based on the fitness goal of muscle gain, no equipment, 30 min duration, and monday, wednesday rest days, create a workout plan for the week.";
             
            // Get the AI-generated response
            String aiResponse = getAIResponse(currentPrompt);

            // Print the AI response to the terminal
            System.out.println("AI Response: " + aiResponse);

            return ResponseEntity.ok(aiResponse);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interacting with the AI API.");
        }
    }

    // Method to interact with OpenAI API
    private String getAIResponse(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // Construct the request payload for OpenAI API
        String apiEndpoint = "https://api.openai.com/v1/completions";
        String payload = String.format("{\"model\": \"text-davinci-003\", \"prompt\": \"%s\", \"max_tokens\": 150}", prompt);

        // Set up the headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);  // Use your OpenAI API key
        headers.set("Content-Type", "application/json");

        // Send the request to OpenAI API
        HttpEntity<String> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.exchange(apiEndpoint, HttpMethod.POST, entity, String.class);

        // Parse the AI response (you may need to adjust this depending on the OpenAI API response format)
        return response.getBody(); // Modify this based on actual response structure
    }
}
