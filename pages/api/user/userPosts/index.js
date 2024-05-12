import {
  getAccessToken,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      jwtTokenString: accessToken,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE,
    database: 'foodie',
    collection: 'users',
  };

  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    switch (req.method) {
      case 'GET':
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson);
        break;

      case 'PUT':
        const { _id, posts } = req.body;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: _id } },
            update: {
              $set: {
                posts: posts,
              },
            },
          }),
        });
        const updateResultJson = await updateData.json();
        res.status(200).json(updateResultJson);
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
