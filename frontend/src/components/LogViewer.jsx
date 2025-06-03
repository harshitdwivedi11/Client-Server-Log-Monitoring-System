import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [clientId, setClientId] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [message, setMessage] = useState("");

  // Fetch logs from backend REST API
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9090/api/logs");
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    // Setup WebSocket connection and subscription
    const socket = new SockJS("http://localhost:9090/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe("/topic/logs", (message) => {
          try {
            const newLog = JSON.parse(message.body);
            setLogs((prevLogs) => [...prevLogs, newLog]);
          } catch (err) {
            console.error("Error parsing WS message", err);
          }
        });
      },
    });

    stompClient.activate();

    // Cleanup on unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);

  // Handle form submission to add new log
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId || !logLevel || !message) {
      alert("Please fill in all fields");
      return;
    }

    const newLog = {
      clientId,
      logLevel,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:9090/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLog),
      });
      if (!response.ok) throw new Error("Failed to add log");
      // Clear form after success
      setClientId("");
      setLogLevel("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error adding log");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Log Entries</h1>
        <Button onClick={fetchLogs} disabled={loading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Form to add new log */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-4 border p-4 rounded-md bg-gray-50"
      >
        <div>
          <label className="block mb-1 font-semibold">Client ID</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Log Level</label>
          <input
            type="text"
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
            required
          />
        </div>
        <Button type="submit" variant="primary">
          Add Log
        </Button>
      </form>

      <Card>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, idx) => (
                <TableRow key={`${log.timestamp}-${idx}`}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogViewer;
