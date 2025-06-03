package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.model.LogEntry;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
}
