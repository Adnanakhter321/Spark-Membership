import axios from 'axios';

export type ApiError = {
  message: string;
  canRetry: boolean;
};

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return { message: 'The request took too long. Please try again.', canRetry: true };
    }

    if (!error.response) {
      return { message: 'No internet connection. Please check your network.', canRetry: true };
    }

    const status = error.response.status;

    if (status === 401 || status === 403) {
      return { message: 'You are not allowed to view this roster.', canRetry: false };
    }
    if (status === 404) {
      return { message: 'We could not find the roster.', canRetry: false };
    }
    if (status >= 500) {
      return { message: 'The server is not responding right now.', canRetry: true };
    }

    return { message: 'Something went wrong. Please try again.', canRetry: true };
  }

  if (error instanceof Error && error.message) {
    return { message: error.message, canRetry: true };
  }

  return { message: 'Something went wrong. Please try again.', canRetry: true };
}
