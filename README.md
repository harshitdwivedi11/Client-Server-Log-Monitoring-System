# Log Viewer Project

A real-time log viewer application built with Spring Boot (backend) and React (frontend).  
It uses WebSockets to stream log updates dynamically and stores logs in an H2 in-memory database.

---

## Features

- Display log entries with timestamp and message
- Real-time updates using WebSocket (STOMP protocol)
- REST API to fetch all logs
- H2 in-memory database for easy setup and testing
- Refresh logs manually or auto-refresh every 5 seconds on frontend

---

## Technologies Used

- **Backend:** Spring Boot, Spring Web, Spring Data JPA, Spring WebSocket (STOMP)
- **Database:** H2 (in-memory)
- **Frontend:** React, Fetch API, WebSocket (STOMP.js)
- **Build Tools:** Maven (backend), Vite (frontend)
- **Other:** Lucide-react for icons, Tailwind CSS for styling (optional)

---

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven
- Git


