const axios = require("axios");
//require("dotenv").config();

module.exports = {
  getUserDetails,
  getUserBalance,
};

const headers = {
  "Content-Type": "application/json",
  "x-api-key": "76778535-6e6a-4aa1-9e87-00739cc39b57",
};

//GetUserDetails
async function getUserDetails(data) {
  try {
    let response = await axios.get(
      "https://bwaapi-sandbox.qiibee.com/api/admin" + "/users",
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData.data);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//Getting User balance
async function getUserBalance(data) {
  try {
    let response = await axios.get(
      `${process.env.QIIBEE_BASE_URL}/users/${process.env.QIIBEE_X_AUTH_ID}/balances`,
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//create New User
async function createUser(data) {
  try {
    let response = await axios.post(
      `${process.env.QIIBEE_BASE_URL}/users`,
      {
        user: {
          email: "gokul124@gmail.com",
          auth_id: "0x232Goke434c5d-c31c-4a02-b0cd-57dd633553f1",
          first_name: "Gokul",
          second_name: "Sell",
          language: "en",
          country_ISO: "usa",
          metadata: {
            opts_newsletter: false,
          },
        },
      },
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//create Membership
async function createUserMembership(data) {
  try {
    let response = await axios.post(
      `${process.env.QIIBEE_BASE_URL}/users/${process.env.QIIBEE_X_AUTH_ID}/memberships`,
      {
        membership: {
          brand_id: "eed92bd12233",
          membership_number: process.env.QIIBEE_X_AUTH_ID,
        },
      },
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//Get user membership details
async function getUserMembership(data) {
  try {
    let response = await axios.get(
      `${process.env.QIIBEE_BASE_URL}/users/${process.env.QIIBEE_X_AUTH_ID}/memberships`,
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//Transaction - Credit transaction
async function creditTransaction(data) {
  try {
    let response = await axios.post(
      `${process.env.QIIBEE_BASE_URL}/transactions/`,
      {
        transaction: {
          user_auth_id: process.env.QIIBEE_X_AUTH_ID,
          type: "credit_points",
          amount: "100",
          token_id: "74",
          send_email: false,
        },
      },
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//Transaction - debit transaction
async function debitTransaction(data) {
  try {
    let response = await axios.post(
      `${process.env.QIIBEE_BASE_URL}/transactions/`,
      {
        transaction: {
          user_auth_id: process.env.QIIBEE_X_AUTH_ID,
          type: "debit_points",
          amount: "100",
          token_id: "74",
          send_email: false,
        },
      },
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//Transaction-Exchange
async function exchangeTransaction(data) {
  try {
    let response = await axios.post(
      `${process.env.QIIBEE_BASE_URL}/transactions/`,
      {
        transaction: {
          user_auth_id: "{{auth_id}}",
          type: "exchange",
          amount: "16",
          brandA_token_id: 74,
          brandB_token_id: 66,
          exchange_rate_override: 2,
          brandB_membership_number: "0X46554c31c-4a02-b0cd-54dd635Alapan",
        },
      },
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//Exchange-Partnership
async function getExchangeWhitelist(data) {
  try {
    let response = await axios.get(
      process.env.QIIBEE_BASE_URL + "/token-exchange-whitelist",
      {
        headers: headers,
      }
    );
    let userData = JSON.stringify(response.data);
    console.log(userData);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("URL having error");
  }
}

//createUser();
getUserDetails();
//getUserBalance();
//createUserMembership();
//getUserMembership();
//creditTransaction();
//debitTransaction();
