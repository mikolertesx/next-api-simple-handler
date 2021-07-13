# Next Api Simple Handler

## Badges
[![Build Status](https://www.travis-ci.com/mikolertesx/next-api-simple-handler.svg?branch=master)](https://www.travis-ci.com/mikolertesx/next-api-simple-handler)


[Read The Docs (Documentation)](https://next-api-simple-handler.readthedocs.io/en/latest/)

## About

The Next Api Simple handler is a minimal guard that allows you to automatize asking for missing values or missing keys.

It's pretty simple in functionality, and allows you to shorten up the code you copy and paste everywhere else.

## First steps

### Preventing user from entering with wrong method.

```js
import { apiHandler } from 'next-api-simple-handler'

export async function handler(req, res) => {
	apiHandler(req, res, {
		methods: ['GET']
	},
	async (req, res) => {
		return res.status(200).json("Hello world!");
	})
}
```
The snippet above prevents user entering with any other method that isn't get.

Available methods are:
- "GET"
- "POST"
- "PUT"
- "DELETE"
- "PATCH"

### Preventing user from sending wrong content type.

```js
import { apiHandler } from 'next-api-simple-handler'

export async function handler(req, res) => {
	apiHandler(req, res, {
		methods: ['POST'],
		contentType: 'application/json'
	},
	async (req, res) => {
		return res.status(200).json("Hello world!");
	})
}
```
This snippet will prevent user from sending a request with a body that isn't made of "application/json".

### Preventing user from sending unsufficient data.
```js
import { apiHandler } from 'next-api-simple-handler'

export async function handler(req, res) => {
	apiHandler(req, res, {
		methods: ['POST'],
		contentType: 'application/json'
		requiredBody: ['username', 'password'],
	},
	async (req, res) => {
		return res.status(200).json("Hello world!");
	})
}
```

The snippet above will make sure that req.body has a *username*, and a *password* key.

### Telling the user what to send after failure.

```js
import { apiHandler } from 'next-api-simple-handler'

const loginSchema = {
  username: '[String] The name of the user you are trying to log into.',
  password: '[String] The password.',
}

export default async function handler(req, res) {
	apiHandler(
			req,
			res,
			{
				requiredBody: ['username', 'password'],
				methods: ['POST'],
				contentType: 'application/json',
				schema: loginSchema,
			},
			async (req, res) => {
				const {username, password} = req.body;
				return res.json({
					message: `Username is: ${username}, password is: ${password}`
				});
			}
	)
}
```

The snippet above, when the user does a request without a username, or without a password will tell the user that it was expecting this object.
```js
{
  username: '[String] The name of the user you are trying to log into.',
  password: '[String] The password.',
}
```
The Schema provided here can be in any format you prefer, but this is what I thought was most useful.

## Advanced usage

### Chaining blockers

Let's say that, for example, we need to have a route that covers multiple different methods, a get, and a post route.

```js
import { apiHandler } from 'next-api-simple-handler'

const handleGet = async (req, res) => {
	// No more checks are necessary in this example.
	return res.json({message: "This is a JSON message"})
}
const handlePost = async(req, res) => {
	// We know that we requrie a username, and a password, and that the application should be of application/json.

	return apiHandler(req, res, {
		requiredBody: ['username', 'password'],
		contentType: 'application/json',
		schema: {
			username: '[String] The name of the user you are trying to log into.',
			password: '[String] The password.',
		}
	}, async(req, res) => {
		return res.json({message: "Successfully registered"});
	});
}

export async function handler(req, res) {
	apiHandler(req, res, {methods: ['GET', 'POST']}, async () => {
		if (req.method === 'GET') {
			return handleGet(req, res);
		}
		return handlePost(req, res);
	})
}
```

### Customizable error message

You can also define custom error messages and error codes, *errorMessages* and *errorCodes* are objects with the following keys:
- "wrong-content-type"
- "wrong-method"
- "missing-body-key"

You can define inside the *configuration* object, any of this values and they will override the defaults.

Here is the declaration of the default configuration:
```js
const defaultConfig: apiConfiguration = {
  errorCodes: {
    "missing-body-key": 422,
    "wrong-content-type": 422,
    "wrong-method": 422,
  },
  errorMessages: {
    "wrong-content-type": (expectedContentType, receivedContentType) =>
      `Expected '${expectedContentType}' content-type, not '${receivedContentType}' content-type`,
    "missing-body-key": (missingBodyKeys: string[]) =>
      `Missing required body keys: ${missingBodyKeys.join(", ")}`,
    "wrong-method": (allowedMethods: string[]) =>
      `Only methods ${allowedMethods.join(", ")} are permitted on this route.`,
  },
};
```

And here is an example of what I'd do in a login, register situation.

```js
apiHandler(
    req,
    res,
    {
      methods: ['POST'],
      contentType: 'application/json',
      requiredBody: ['username', 'password'],
      errorMessages: {
        'missing-body-key': (missingKeys) =>
          `A username, and a password are required to register an account. You are missing ${missingKeys.join(
            ', '
          )}`,
        'wrong-content-type': (expectedContentType, receivedContentType) =>
          `Only ${expectedContentType} is allowed on this route; You sent ${receivedContentType}`,
        'wrong-method': (allowedMethods) =>
          `Only the methods ${allowedMethods.join(
            ', '
          )} can be done in this route.`,
      },
      schema: registerSchema,
    }, (req, res) => {
			return res.json("User was registered.");
		})
```

The snippet above changes each of the errorMessages.

## Mainteinance

The library was made with Typescript, so every piece here is typed and will give you hints on whether or not you are missusing it.

