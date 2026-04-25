import { AxiosError } from "axios";

type FormError = {
  message: string;
  fieldErrors?: Record<string, string>;
};

export function parseApiError(error: unknown): FormError {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    // Caso 1: erro com campos (Django validation)
    if (data && typeof data === "object") {
      const fieldErrors: Record<string, string> = {};

      for (const key in data) {
        const value = data[key];

        if (Array.isArray(value)) {
          fieldErrors[key] = value[0];
        }
      }

      // Se encontrou erros de campo
      if (Object.keys(fieldErrors).length > 0) {
        return {
          message: "Erro de validação",
          fieldErrors,
        };
      }

      // Caso 2: erro geral (detail)
      if (data.detail) {
        return {
          message: data.detail,
        };
      }
    }

    // Caso 3: timeout
    if (error.code === "ECONNABORTED") {
      return {
        message: "O servidor demorou para responder. Tente novamente.",
      };
    }

    // Caso 4: sem resposta (API offline)
    if (!error.response) {
      return {
        message: "Não foi possível conectar ao servidor.",
      };
    }
  }

  // fallback final
  return {
    message: "Ocorreu um erro inesperado.",
  };
}