package com.example.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.server.model.LogEntry;
import com.example.server.repository.LogEntryRepository;

@Service
public class LogService {

    private final LogEntryRepository logEntryRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public LogService(LogEntryRepository logEntryRepository, SimpMessagingTemplate messagingTemplate) {
        this.logEntryRepository = logEntryRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public List<LogEntry> getAllLogs() {
        return logEntryRepository.findAll();
    }

    public LogEntry saveLog(LogEntry logEntry) {
        LogEntry saved = logEntryRepository.save(logEntry);
        messagingTemplate.convertAndSend("/topic/logs", saved);
        return saved;
    }
}
