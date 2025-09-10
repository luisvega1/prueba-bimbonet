export interface IJoke {
  category: string;
  type: 'single' | 'twopart';
  setup?: string;
  delivery?: string;
  destacado: boolean;
  joke?: string;
  flags?: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe?: boolean;
  lang?: string;
}

export interface IJokeResponse {
  error: boolean;
  amount: number;
  jokes: IJoke[];

  // Campos opcionales (cuando ocurre un error en la API)
  internalError?: boolean;
  code?: number;
  message?: string;
  causedBy?: string[];
  additionalInfo?: string;
  timestamp?: number;
}
