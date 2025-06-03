package com.example.server.controller;

import com.example.server.model.LogEntry;
import com.example.server.repository.LogEntryRepository;
import com.example.server.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin // Enables frontend access from a different origin (e.g. localhost:5173)
public class LogController {

    @Autowired
    private LogEntryRepository logEntryRepository;

    @Autowired
    private LogService logService;

    // GET endpoint to fetch all logs
    @GetMapping("/logs")
    public List<LogEntry> getLogs() {
        return logEntryRepository.findAll();
    }

    // POST endpoint to add a new log entry
    @PostMapping("/logs")
    public LogEntry addLog(@RequestBody LogEntry logEntry) {
        // Add timestamp if not set
        if (logEntry.getTimestamp() == null || logEntry.getTimestamp().isEmpty()) {
            logEntry.setTimestamp(LocalDateTime.now().toString());
        }

        // Save to DB
        LogEntry savedLog = logEntryRepository.save(logEntry);

        // Notify frontend via WebSocket
        logService.notifyLogChange(savedLog);

        return savedLog;
    }
}
