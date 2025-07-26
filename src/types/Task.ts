export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "normal";
  createdAt: number; 
}
