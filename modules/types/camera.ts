// types/camera.ts
export interface Camera {
  id: number;
  location: string;
  username: string;
  password: string;
  ip_address: string;
  port: number;
  gate_id: number;
  notes?: string;
  url?: string;
}

// =========================
// TYPES
// =========================
export interface CameraFormData {
  gate_id: number;
  location: string;
  username: string;
  password: string;
  ip_address: string;
  port: string;
  notes: string;
  add_string_to_url: string;
}

export interface ReaderFormData {
  gate_id: number;
  location: string;
  username: string;
  password: string;
  ip_address: string;
  port: string;
  notes: string;
  reader_type: string;
  add_string_to_url: string;
}
