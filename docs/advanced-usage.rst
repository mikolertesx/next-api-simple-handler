Advanced usage
=============================

Chaining blockers
------------------------------

Let's say that, for example, we need to have a route that covers multiple different methods, a get, and a post route.

.. code-block:: js
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
		return apiHandler(req, res, {methods: ['GET', 'POST']}, async () => {
			if (req.method === 'GET') {
				return handleGet(req, res);
			}
			return handlePost(req, res);
		})
	}


Customizable error message
------------------------------

You can also define custom error messages and error codes, *errorMessages* and *errorCodes* are objects with the following keys:
* "wrong-content-type"
* "wrong-method"
* "missing-body-key"

You can define inside the *configuration* object, any of this values and they will override the defaults.

Here is the declaration of the default configuration:

.. code-block:: js

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

And here is an example of what I'd do in a login, register situation.

.. code-block:: js

	return apiHandler(
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
			}
		)
	)

The snippet above changes each of the errorMessages.
