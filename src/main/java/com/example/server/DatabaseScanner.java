package com.example.server;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.server.model.LogEntry;
import com.example.server.repository.LogEntryRepository;

@Component
public class DatabaseScanner {

    private final LogEntryRepository repository;

    @Autowired
    public DatabaseScanner(LogEntryRepository repository) {
        this.repository = repository;
    }

    @Scheduled(fixedRate = 5000)  // every 5 seconds
    public void scanDatabase() {
        List<LogEntry> logs = repository.findAll();
        System.out.println("Scanning database at " + new java.util.Date());
        System.out.println("Number of log entries: " + logs.size());

        for (LogEntry log : logs) {
            System.out.printf("Client: %s | Level: %s | Message: %s | Time: %s%n",
                    log.getClientId(), log.getLogLevel(), log.getMessage(), log.getTimestamp());
        }
    }
}
