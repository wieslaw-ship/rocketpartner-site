export async function signIn(email, password) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };
    const response = await fetch(
      "http://localhost:8000/api/auth/login/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nieprawidłowy adres e-mail bądź hasło",
    };
  }
}

export async function signUp(data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/auth/signup/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nie udało się zarejestrować",
    };
  }
}

export async function resetPassword(data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/auth/forget-password/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Coś poszło nie tak...",
    };
  }
}

export async function getMyZaproszoneOsoby(token) {
  try {
    // Send request
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/user/zaproszeni/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nie udało się pobrać danych",
    };
  }
}

export async function getMyData(token) {
  try {
    // Send request
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/auth/me/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nie udało się pobrać danych",
    };
  }
}

export async function fetchMyDocuments(token) {
  try {
    // Send request
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/document/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nie udało się pobrać dokumentów",
    };
  }
}

export async function resendUserVerificationEmail(token) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/user/verification-email/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nie udało się pobrać danych",
    };
  }
}

export async function verificateUserEmail(email) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };
    const response = await fetch(
      "http://localhost:8000/api/user/verification/",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return {
        isOk: true,
        data: data,
      };
    } else {
      return {
        isOk: false,
        message: data.detail,
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Nie udało się zweryfikować konta",
    };
  }
}
