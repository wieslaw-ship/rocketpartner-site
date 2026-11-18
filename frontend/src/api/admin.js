export async function getAllUsers(token, page, email, first_name, surname) {
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
      "http://localhost:8000/api/user/all/?limit=15&offset=" +
        parseInt(15 * page) +
        "&email=" +
        email +
        "&first_name=" +
        first_name +
        "&surname=" +
        surname,
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
      message: "Nie udało się pobrać użytkowników",
    };
  }
}

export async function getSingleUser(token, user_id) {
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
      "http://localhost:8000/api/user/" + user_id + "/",
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
      message: "Nie udało się pobrać danych użytkownika",
    };
  }
}

export async function updateUserData(token, user_id, data_in) {
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
      "http://localhost:8000/api/user/" + user_id + "/",
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
      message: "Nie udało się zaktualizaować użytkownika",
    };
  }
}

export async function deleteUser(token, user_id) {
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
      "http://localhost:8000/api/user/" + user_id + "/",
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
      message: "Nie udało się usunąć użytkownika",
    };
  }
}
export async function uploadUserFile(token, user_id, data_in) {
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
      "http://localhost:8000/api/user/file/" + user_id + "/",
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
      message: "Nie udało się usunąć użytkownika",
    };
  }
}

// CARS

export async function getAllCars(token, page, email, registration_number) {
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
      "http://localhost:8000/api/car/all/?limit=15&offset=" +
        parseInt(15 * page) +
        "&email=" +
        email +
        "&registration_number=" +
        registration_number,
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

export async function createCarAsAdmin(token, user_id, data_in) {
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
      "http://localhost:8000/api/car/" + user_id + "/",
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
export async function getUserCars(token, user_id) {
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
      "http://localhost:8000/api/car/user/" + user_id + "/",
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
      message: "Nie udało się pobrać pojazdów użytkownika",
    };
  }
}

// INCOME

export async function getAllIncomes(token, page, email) {
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
      "http://localhost:8000/api/income/all/?limit=15&offset=" +
        parseInt(15 * page) +
        "&email=" +
        email,
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

export async function updateIncome(token, income_id, data_in) {
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
      message: "Nie udało się zaaktualizaować przychodu",
    };
  }
}

export async function deleteIncome(token, income_id) {
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
      message: "Nie udało się usunąć pojazdu",
    };
  }
}
export async function getUserIncomes(token, user_id, page) {
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
      "http://localhost:8000/api/income/user/" +
        user_id +
        "/?limit=15&offset=" +
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
      message: "Nie udało się pobrać przychodów użytkownika",
    };
  }
}

export async function createUserIncome(token, user_id, data_in) {
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
      "http://localhost:8000/api/income/" + user_id + "/",
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
      message: "Nie udało się utworzyć przychodu",
    };
  }
}

export async function updateUserIncome(token, income_id, data_in) {
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
      message: "Nie udało się utworzyć przychodu",
    };
  }
}

// INFORMATION

export async function getSingleInformation(token, info_id) {
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
      "http://localhost:8000/api/information/" + info_id + "/",
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

export async function getallInformation(token) {
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
      "http://localhost:8000/api/information/all/",
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

export async function createInformation(token, data_in) {
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
      "http://localhost:8000/api/information/",
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

export async function updateInformation(token, information_id, data_in) {
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
      "http://localhost:8000/api/information/" +
        information_id +
        "/",
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
      message: "Nie udało się zaaktualizaować przychodu",
    };
  }
}

export async function deleteInformation(token, information_id) {
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
      "http://localhost:8000/api/information/" +
        information_id +
        "/",
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
      message: "Nie udało się usunąć informacji",
    };
  }
}

// INVOICE

export async function getAllInvoices(token, page, email, seller_nip) {
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
      "http://localhost:8000/api/invoice/all/?limit=15&offset=" +
        parseInt(15 * page) +
        "&email=" +
        email +
        "&seller_nip=" +
        seller_nip,
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

export async function updateInvoice(token, invoice_id, data_in) {
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
      "http://localhost:8000/api/invoice/" + invoice_id + "/",
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
      message: "Nie udało się zaaktualizaować faktury",
    };
  }
}

export async function deleteInvoice(token, invoice_id) {
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
      message: "Nie udało się usunąć faktury",
    };
  }
}

export async function getUserInvoices(token, user_id, page) {
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
      "http://localhost:8000/api/invoice/user/" +
        user_id +
        "/?limit=15&offset=" +
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
      message: "Nie udało się pobrać faktur użytkownika",
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

export async function createInvoiceAdmin(token, user_id, data_in) {
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
      "http://localhost:8000/api/invoice/" + user_id + "/",
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
      message: "Nie udało się dodać faktury",
    };
  }
}

// PAYCHECK

export async function getAllPaychecks(token, page, email) {
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
      "http://localhost:8000/api/paycheck/all/?limit=15&offset=" +
        parseInt(15 * page) +
        "&email=" +
        email,
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
      message: "Nie udało się utworzyć wypłaty",
    };
  }
}

export async function updatePaycheck(token, paycheck_id, data_in) {
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
      message: "Nie udało się zaaktualizaować wypłaty",
    };
  }
}

export async function deletePaycheck(token, paycheck_id) {
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
      message: "Nie udało się usunąć faktury",
    };
  }
}

export async function getUserPaychecks(token, user_id, page) {
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
      "http://localhost:8000/api/paycheck/user/" +
        user_id +
        "/?limit=15&offset=" +
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
      message: "Nie udało się pobrać wypłat użytkownika",
    };
  }
}

export async function createPaycheckAdmin(token, user_id, data_in) {
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
      "http://localhost:8000/api/paycheck/" + user_id + "/",
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
      message: "Nie udało się dodać wypłaty",
    };
  }
}

export async function adminLineChart(token) {
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
      "http://localhost:8000/api/user/line-chart/",
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
      message: "Nie udało się pobrać danych wykresu",
    };
  }
}

export async function adminData(token) {
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
      "http://localhost:8000/api/user/admin/",
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

export async function adminDocuments(token, page, email) {
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
      "http://localhost:8000/api/document/all/?limit=15&offset=" +
        parseInt(15 * page) +
        "&email=" +
        email,
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

export async function getUserDocuments(token, user_id) {
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
      "http://localhost:8000/api/document/user/" + user_id + "/",
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

export async function accpetDocument(token, document_id) {
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
      "http://localhost:8000/api/document/accept/" +
        document_id +
        "/",
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
