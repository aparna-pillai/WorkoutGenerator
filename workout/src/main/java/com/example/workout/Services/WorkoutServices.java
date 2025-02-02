package com.example.workout.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WorkoutServices {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int saveGoal(String fitness_goals, String workout_duration, String equipment, String rest_days) {
        String sql = "INSERT INTO new_main(fitness_goals, workout_duration, equipment, rest_days) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, fitness_goals, workout_duration, equipment, rest_days);
    }

    // Retrieve everything from that column (DON'T FOCUS ON THIS RIGHT NOW!! WE DO NOT NEED TO RETRIEVE ANYTHING, JUST PUT STUFF IN)
    public List<Map<String, Object>> getAllGoals() {
        String sql = "SELECT * FROM new_main";
        return jdbcTemplate.queryForList(sql);
    }
}
