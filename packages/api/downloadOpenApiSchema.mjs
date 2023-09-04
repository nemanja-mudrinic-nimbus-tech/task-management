import { writeFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import axios from "axios";
import { config } from "dotenv";

const directory = dirname(fileURLToPath(import.meta.url));

config({ path: `${directory}/.env` });

/**
 * This array can be used to specify which headers to
 * remove from the OpenAPI specification file received from the backend.
 *
 * When the generator detects a @Header annotation, it includes that header as a parameter
 * inside of a method call. For example, if the login endpoint has a header named 'Origin',
 * you would get a method `login` that accepts two params - the login request and the
 * origin header.
 *
 * As the header is optional, that wouldn't be such a problem in and of itself, but the
 * problem lies within how OpenAPI generator works. When it generates the headers as
 * method params, that becomes the only way to pass those values as headers, i.e. if
 * you try to inject the values differently, they will be ignored.
 *
 * That's why this was made, to remove the headers from the JSON and make the API
 * something that's more easily usable.
 * See the issue for this:
 * https://github.com/ferdikoomen/openapi-typescript-codegen/issues/1166
 */
const IGNORED_HEADERS = ["user-agent", "Origin"];

const downloadApiSpec = async () => {
  const envVars = [
    process.env.API_BASE_URL,
    process.env.SWAGGER_USER,
    process.env.SWAGGER_PASSWORD,
  ];

  if (!envVars.every((envVariable) => !!envVariable)) {
    throw new Error("Cannot generate without credentials");
  }

  const baseUrl = `${process.env.API_BASE_URL}/api/v1/docs-json`;

  try {
    const { data } = await axios.get(baseUrl, {
      auth: {
        username: process.env.SWAGGER_USER,
        password: process.env.SWAGGER_PASSWORD,
      },
    });

    removeHeadersFromData(data, IGNORED_HEADERS);

    writeFileSync(`${directory}/openapi.json`, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const removeHeadersFromData = (mainObject, properties) => {
  if (typeof mainObject !== "object" || mainObject === null) {
    return;
  }

  for (const key in mainObject) {
    if (Object.prototype.hasOwnProperty.call(mainObject, key)) {
      removeHeaders(mainObject, key, properties);
      if (Object.keys(mainObject[key]).length === 0) {
        delete mainObject[key];
      }
    }
  }
};

const removeHeaders = (mainObject, key, properties) => {
  const obj = mainObject[key];

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      removeHeaders(obj, key, properties);
    }
  }

  if (obj && typeof obj === "object") {
    if (Array.isArray(mainObject)) {
      for (let i = mainObject.length - 1; i >= 0; i--) {
        const arrayObject = mainObject[i];
        if (
          Object.prototype.hasOwnProperty.call(arrayObject, "name") &&
          Object.prototype.hasOwnProperty.call(arrayObject, "in")
        ) {
          for (const property of properties) {
            if (arrayObject.name === property && arrayObject.in === "header") {
              mainObject.splice(i, 1);
            }
          }
        }
      }
    }

    return;
  }
};

downloadApiSpec();
