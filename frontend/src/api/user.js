export async function updateUserData(token, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/user/",
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
      message: "Nie udało się zaktualizować danych",
    };
  }
}

export async function uploadUserFile(token, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data_in,
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
      message: "Nie udało się załączyć dokumentu",
    };
  }
}

// CARS

export async function getMyCars(token) {
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
      "http://localhost:8000/api/car/",
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
      message: "Nie udało się pobrać pojazdów",
    };
  }
}

export async function getSingleCar(token, car_id) {
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
      "http://localhost:8000/api/car/" + car_id + "/",
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
      message: "Nie udało się pobrać danych pojazdu",
    };
  }
}

export async function updateCar(token, car_id, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/car/" + car_id + "/",
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
      message: "Nie udało się zaaktualizaować pojazdu",
    };
  }
}

export async function createCar(token, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/car/",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
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
      message: "Nie udało się dodać pojazdu",
    };
  }
}

export async function deleteCar(token, car_id) {
  try {
    // Send request
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/car/" + car_id + "/",
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
      message: "Nie udało się usunąć pojazdu",
    };
  }
}

// INCOME

export async function getMyIncome(token, page) {
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
      "http://localhost:8000/api/income/?limit=15&offset=" +
        parseInt(15 * page),
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
      message: "Nie udało się pobrać przychodów",
    };
  }
}

export async function getSingleIncome(token, income_id) {
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
      "http://localhost:8000/api/income/" + income_id + "/",
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
      message: "Nie udało się pobrać danych przychodu",
    };
  }
}

// INFORMATION

export async function getallInformation(token, page) {
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
      "http://localhost:8000/api/information/all/?limit=3&offset=" +
        parseInt(3 * page),
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
      message: "Nie udało się pobrać informacji.",
    };
  }
}

// INVOICE

export async function getMyInvoices(token, page) {
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
      "http://localhost:8000/api/invoice/?limit=15&offset=" +
        parseInt(15 * page),
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
      message: "Nie udało się pobrać faktur.",
    };
  }
}

export async function getSingleInvoice(token, invoice_id) {
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
      "http://localhost:8000/api/invoice/" + invoice_id + "/",
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
      message: "Nie udało się utworzyć informacji",
    };
  }
}

export async function uploadInvoiceFile(token, invoice_id, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data_in,
    };
    const response = await fetch(
      "http://localhost:8000/api/invoice/file/" + invoice_id + "/",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
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
      message: "Nie udało się dodać pliku faktury",
    };
  }
}

export async function createInvoice(token, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/invoice/",
      requestOptions
    );
    console.log(requestOptions.body);
    const data = await response.json();
    console.log(data);
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
      message: "Nie udało się dodać faktury",
    };
  }
}

// PAYCHECK

export async function getMyPaycheck(token, page) {
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
      "http://localhost:8000/api/paycheck/?limit=15&offset=" +
        parseInt(15 * page),
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
      message: "Nie udało się pobrać wypłat.",
    };
  }
}

export async function getSinglePaycheck(token, paycheck_id) {
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
      "http://localhost:8000/api/paycheck/" + paycheck_id + "/",
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
      message: "Nie udało się pobrać wypłaty",
    };
  }
}

export async function changeUserPassword(token, data_in) {
  try {
    // Send request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data_in),
    };
    const response = await fetch(
      "http://localhost:8000/api/user/change_password/",
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
      message: "Nie udało się zmienić hasła",
    };
  }
}
