package com.example.workout.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import javax.sql.DataSource;
import java.util.Map;

@Service
public class WorkoutServices {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int saveGoal(String goal, String duration, String equipment, String restDays) {
        String sql = "INSERT INTO new_main(goal, duration, equipment, rest_days) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, goal, duration, equipment, restDays);
    }

    // Retrieve everything from that column (DON'T FOCUS ON THIS RIGHT NOW!! WE DO NOT NEED TO RETRIEVE ANYTHING, JUST PUT STUFF IN)
    public List<Map<String, Object>> getAllGoals() {
        String sql = "SELECT * FROM new_main";
        return jdbcTemplate.queryForList(sql);
    }
}
