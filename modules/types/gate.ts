export type Gate = {
  id: number;
  name: string;
  type: "ENTRY" | "EXIT";
  ip: string;
  description: string;
};
