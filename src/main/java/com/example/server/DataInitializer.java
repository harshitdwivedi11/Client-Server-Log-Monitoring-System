package com.example.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.server.model.LogEntry;
import com.example.server.repository.LogEntryRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final LogEntryRepository logEntryRepository;

    public DataInitializer(LogEntryRepository logEntryRepository) {
        this.logEntryRepository = logEntryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        logEntryRepository.save(new LogEntry("client1", "INFO", "Application started", "2025-06-03T15:00:00"));
        logEntryRepository.save(new LogEntry("client2", "WARN", "Disk space low", "2025-06-03T15:05:00"));
        logEntryRepository.save(new LogEntry("client3", "ERROR", "Null pointer exception", "2025-06-03T15:10:00"));
    }
}
