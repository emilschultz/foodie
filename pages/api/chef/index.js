import {
  getSession,
  getAccessToken,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

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

    switch (req.method) {
      case 'GET':
        const chefId = await req.query.chefId;
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { id: chefId },
          }),
        });

        const readDataJson = await readData.json();
        console.log('Read Data JSON:', readDataJson);
        res.status(200).json(readDataJson);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
