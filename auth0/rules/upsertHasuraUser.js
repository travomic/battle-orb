function syncUserToHasura(user, context, callback) {
  const UPSERT_USER_QUERY = `
    mutation(
      $authId: String!,
      $authKey: String!,
      $authName: String!,
      $userName: String!,
      $userData: jsonb,
    ) {
      insert_${configuration.DB_SCHEMA}_user(
      objects:[{ 
        auth_id: $authId,
        auth_key: $authKey, 
        auth_name: $authName,
        user_name: $userName,
        user_data: $userData,
      }], 
      on_conflict: {
        constraint: user_auth_name_key,
        update_columns: [auth_id, auth_name, auth_key, updated_at]
      }) { 
        returning {
          user_id
        }
      }
    }
  `;

  const rand = (max) => Math.floor(Math.random() * max);

  const hexChars = '0123456789abcdef'.split('');
  const authNonce = Array(32).fill(Math.random)
    .map((ƒ, i) => Math.floor(ƒ() * i * 1000))
    .map((seed, i) => hexChars[rand(seed * (i + 100)) % hexChars.length])
    .join('');

  const someEmojis = [
    "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",
    "⬅️", "⬆️", "⬇️", "➡️", "↗️", "↘️", "↙️", "↖️",
    "🎃", "👟", "👜", "🕶", "🐯", "🐥", "🦅", "🦄", "🦉", "🐞",
    "🦋", "🐢", "🦂", "🦎", "🐟", "🔥", "⭐️", "👍", "™",
    "👋", "🍔", "🎨", "💪", "👹", "👻", "💀", "👾", "👁",
    "🧤", "🐵", "🐬", "🥑", "🥦", "🍋", "🍎", "🥝", "🍪",
    "🧊", "🍭", "🥧", "🌽", "🥨", "🧀", "🎱", "🏀", "🏆",
    "🎧", "🎲", "🗿", "💿", "⌛️", "⏳", "💵", "🎁", "📦",
    "📚", "📎", "🔆", "🌀", "🆒", "🎵", "🎶", "🔊",
    "♠️", "♣️", "♥️", "♦️", 
    "🟢", "🔴", "🟠", "🟡", "⚫️", "🟣", "🔵", "⚪️", "🟤",
  ];

  const randEmojis = [1000, 2000, 3000].map(
    (seed, i) => someEmojis[rand(seed * (i + 10)) % someEmojis.length]
  );
  
  const userName = (
    user.screen_name ||
    user.nickname ||
    user.given_name ||
    user.family_name ||
    'User'
  );

  const variables = {
    authId: user._id || 'N/A',
    authKey: authNonce,
    authName: user.user_id,
    userName: `${userName} ${randEmojis.join('')}`,
    userData: user
  };

  const payload = {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": configuration.ACCESS_KEY,
    },
    url: `${configuration.API_URL}`,
    body: JSON.stringify({ query: UPSERT_USER_QUERY, variables }),
  };

  request.post(payload, (error, _response, body) => {
    const namespace = "https://hasura.io/jwt/claims";
    const {app_metadata = {}} = user;

    let userUUID, output;

    try {
      const jsonBody = JSON.parse(body);
      userUUID = jsonBody.data[`insert_${configuration.DB_SCHEMA}_user`]
        .returning[0].user_id;
    } catch (err) {
      userUUID = 'N/A';
      output += JSON.stringify(err);
    }

    app_metadata.user_uuid = userUUID;
    
    context.accessToken[namespace] =
    {
      'x-hasura-output': output,
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['self','user'],
      'x-hasura-user-id': userUUID,
      'x-auth-key': authNonce,
    };

    context.idToken[namespace] = 
    {
      authKey: authNonce,
      userUUID: userUUID,
    }
    
    callback(error, user, context);
  });
}
