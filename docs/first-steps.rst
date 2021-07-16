First steps
====================

Preventing user from entering with wrong method.
-------------------------------------------------
.. code-block:: js

	import { apiHandler } from 'next-api-simple-handler'

	export async function handler(req, res) => {
		return apiHandler(req, res, {
			methods: ['GET']
		},
		async (req, res) => {
			return res.status(200).json("Hello world!");
		})
	}

The snippet above prevents user entering with any other method that isn't get.

Available methods are:
- "GET"
- "POST"
- "PUT"
- "DELETE"
- "PATCH"

Preventing user from sending wrong content type.
-------------------------------------------------

.. code-block:: js

	import { apiHandler } from 'next-api-simple-handler'

	export async function handler(req, res) => {
		return apiHandler(req, res, {
			methods: ['POST'],
			contentType: 'application/json'
		},
		async (req, res) => {
			return res.status(200).json("Hello world!");
		})
	}

This snippet will prevent user from sending a request with a body that isn't made of "application/json".

Preventing user from sending unsufficient data.
-------------------------------------------------

.. code-block:: js

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

The snippet above will make sure that req.body has a *username*, and a *password* key.

Telling the user what to send after failure.
-------------------------------------------------

.. code-block:: js

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

The snippet above, when the user does a request without a username, or without a password will tell the user that it was expecting this object.

.. code-block:: js

	const schema = {
		username: '[String] The name of the user you are trying to log into.',
		password: '[String] The password.',
	}

The Schema provided here can be in any format you prefer, but this is what I thought was most useful.
