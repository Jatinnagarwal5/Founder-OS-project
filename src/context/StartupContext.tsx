"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  StartupMetrics,
  defaultStartupData,
  defaultCompetitors,
  defaultPitchDeck,
  defaultRoadmap,
  defaultActionPlan,
  defaultTeamMembers,
  defaultNotifications,
} from "@/lib/mockData";
import { parseFinancialCSV } from "@/lib/csvParser";

export type StrategicGoal = "Growth" | "Runway" | "Fundraising" | "Retention";

export interface ActionItem {
  id: string;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface StartupContextType {
  startupData: StartupMetrics;
  competitors: typeof defaultCompetitors;
  pitchDeck: typeof defaultPitchDeck;
  roadmap: typeof defaultRoadmap;
  actionPlan: ActionItem[];
  teamMembers: typeof defaultTeamMembers;
  notifications: typeof defaultNotifications;
  activeAgent: "CEO" | "Marketing" | "Investor" | "Product";
  dataSource: "CSV Import" | "Manual Entry" | "Demo Baseline";
  lastUpdated: string;
  primaryGoal: StrategicGoal;
  setActiveAgent: (agent: "CEO" | "Marketing" | "Investor" | "Product") => void;
  setPrimaryGoal: (goal: StrategicGoal) => void;
  isAnalyzing: boolean;
  analyzeIdea: (idea: string, goal?: StrategicGoal) => Promise<void>;
  ingestCSVData: (csvText: string) => void;
  addTask: (title: string, category?: string, priority?: "High" | "Medium" | "Low") => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  markNotificationRead: (id: string) => void;
  updateStartupName: (name: string, tagline: string) => void;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export function StartupProvider({ children }: { children: React.ReactNode }) {
  const [startupData, setStartupData] = useState<StartupMetrics>(defaultStartupData);
  const [competitors, setCompetitors] = useState(defaultCompetitors);
  const [pitchDeck, setPitchDeck] = useState(defaultPitchDeck);
  const [roadmap, setRoadmap] = useState(defaultRoadmap);
  const [actionPlan, setActionPlan] = useState<ActionItem[]>(defaultActionPlan);
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [activeAgent, setActiveAgent] = useState<"CEO" | "Marketing" | "Investor" | "Product">("CEO");
  const [dataSource, setDataSource] = useState<"CSV Import" | "Manual Entry" | "Demo Baseline">("Demo Baseline");
  const [lastUpdated, setLastUpdated] = useState<string>("Today, 10:00 AM");
  const [primaryGoal, setPrimaryGoal] = useState<StrategicGoal>("Growth");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Restore state from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("founder_os_metrics");
      if (savedData) setStartupData(JSON.parse(savedData));

      const savedTasks = localStorage.getItem("founder_os_tasks");
      if (savedTasks) setActionPlan(JSON.parse(savedTasks) as ActionItem[]);

      const savedSource = localStorage.getItem("founder_os_datasource");
      if (savedSource) setDataSource(savedSource as any);

      const savedGoal = localStorage.getItem("founder_os_goal");
      if (savedGoal) setPrimaryGoal(savedGoal as StrategicGoal);
    } catch (e) {
      console.error("Error restoring local state", e);
    }
  }, []);

  const saveState = (metrics: StartupMetrics, tasks: ActionItem[], source: string, goal: string) => {
    try {
      localStorage.setItem("founder_os_metrics", JSON.stringify(metrics));
      localStorage.setItem("founder_os_tasks", JSON.stringify(tasks));
      localStorage.setItem("founder_os_datasource", source);
      localStorage.setItem("founder_os_goal", goal);
    } catch (e) {
      console.error("Error saving state", e);
    }
  };

  const ingestCSVData = (csvText: string) => {
    try {
      const { computedKpis, parsedRows } = parseFinancialCSV(csvText);

      const updatedCharts = {
        monthlyFinancials: parsedRows.map((r) => ({
          month: r.month,
          revenue: r.revenue,
          expenses: r.expenses,
          profit: r.revenue - r.expenses,
        })),
        customerGrowth: parsedRows.map((r) => ({
          month: r.month,
          active: r.activeCustomers,
          newUsers: r.newCustomers,
          churned: r.churnedCustomers,
        })),
      };

      const updated: StartupMetrics = {
        ...startupData,
        kpis: computedKpis,
        charts: updatedCharts,
        healthScore: computedKpis.runwayMonths >= 12 && computedKpis.churnRate <= 2.5 ? 88 : 74,
        healthStatus: computedKpis.runwayMonths >= 12 ? "Healthy" : "Warning",
      };

      const nowStr = `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      setStartupData(updated);
      setDataSource("CSV Import");
      setLastUpdated(nowStr);
      saveState(updated, actionPlan, "CSV Import", primaryGoal);
    } catch (err: any) {
      alert(`CSV Import Error: ${err.message || "Invalid format"}`);
    }
  };

  const analyzeIdea = async (idea: string, goal: StrategicGoal = primaryGoal) => {
    setIsAnalyzing(true);
    setPrimaryGoal(goal);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, goal }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.startupData) {
          setStartupData(json.startupData);
          setDataSource("Manual Entry");
          const nowStr = `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
          setLastUpdated(nowStr);
          saveState(json.startupData, actionPlan, "Manual Entry", goal);
        }
        if (json.competitors) setCompetitors(json.competitors);
        if (json.pitchDeck) setPitchDeck(json.pitchDeck);
        if (json.roadmap) setRoadmap(json.roadmap);
        if (json.actionPlan) setActionPlan(json.actionPlan);
      }
    } catch (err) {
      console.error("Error analyzing idea:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addTask = (title: string, category = "General", priority: "High" | "Medium" | "Low" = "Medium") => {
    const newTask: ActionItem = {
      id: `task-${Date.now()}`,
      title,
      category,
      priority,
      completed: false,
    };
    const updated = [newTask, ...actionPlan];
    setActionPlan(updated);
    localStorage.setItem("founder_os_tasks", JSON.stringify(updated));
  };

  const deleteTask = (id: string) => {
    const updated = actionPlan.filter((t) => t.id !== id);
    setActionPlan(updated);
    localStorage.setItem("founder_os_tasks", JSON.stringify(updated));
  };

  const toggleTask = (id: string) => {
    const updated = actionPlan.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActionPlan(updated);
    localStorage.setItem("founder_os_tasks", JSON.stringify(updated));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const updateStartupName = (name: string, tagline: string) => {
    const updated = { ...startupData, name, tagline };
    setStartupData(updated);
    saveState(updated, actionPlan, dataSource, primaryGoal);
  };

  return (
    <StartupContext.Provider
      value={{
        startupData,
        competitors,
        pitchDeck,
        roadmap,
        actionPlan,
        teamMembers,
        notifications,
        activeAgent,
        dataSource,
        lastUpdated,
        primaryGoal,
        setActiveAgent,
        setPrimaryGoal,
        isAnalyzing,
        analyzeIdea,
        ingestCSVData,
        addTask,
        deleteTask,
        toggleTask,
        markNotificationRead,
        updateStartupName,
      }}
    >
      {children}
    </StartupContext.Provider>
  );
}

export function useStartup() {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error("useStartup must be used within a StartupProvider");
  }
  return context;
}
