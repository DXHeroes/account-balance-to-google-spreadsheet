# Guide for Česká Spořitelna a.s.

- Go to https://developers.erstegroup.com
- [Register and create a new app](https://developers.erstegroup.com/docs/tutorial/general-getting-started)
- Add a [Corporate Accounts API](https://developers.erstegroup.com/docs/apis/bank.csas/bank.csas.v1%2Fcorporate)
- Set the scope to Required
- Enable OAuth2, set the redirect URI to `http://localhost:3000` and set the grant type to "Implicit + Code"
- Generate credentials for Sandbox app

- Save YOUR generated **API key** to the `.env.development` file as a `BANK_CSAS_WEB_API_KEY` key.

  e.g.
  ```yaml
  BANK_CSAS_WEB_API_KEY="e26d896a-d550-11e9-bb65-2a2ae2dbcce4"
  ```

- Save YOUR generated **Client ID** to the `.env.development` file as a `BANK_CSAS_CLIENT_ID` key.

  e.g.
  ```yaml
  BANK_CSAS_CLIENT_ID="4c0b5c01-ba1c-403a-833b-ab0e0e6ad2f4"
  ```

- Save YOUR generated **Client Secret** to the `.env.development` file as a `BANK_CSAS_CLIENT_SECRET` key.

  e.g.
  ```yaml
  BANK_CSAS_CLIENT_SECRET="76f9a576-25f1-4c37-a10f-ff955f800e0b"
  ```

- Go to authorization URL to get the refresh token (change YOUR_CLIENT_ID in URL).

  ```
  https://webapi.developers.erstegroup.com/api/csas/sandbox/v1/sandbox-idp/auth?redirect_uri=http://localhost:3000&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline
  ```

- Choose user > Continue > Confirm
- Copy the **code** from the URL
  ```
  http://localhost:3000/?code=YOUR_CODE&state=null
  ```

- Exchange **code** for access token and **refresh token**
  ```bash
  curl -X POST https://webapi.developers.erstegroup.com/api/csas/sandbox/v1/sandbox-idp/token -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=authorization_code&code=YOUR_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=http://localhost:3000'
  ```

- Copy the value of **refresh_token** from the response above and save the value to the `.env.development` file as a `BANK_CSAS_REFRESH_TOKEN` key.

  e.g.
  ```yaml
  BANK_CSAS_REFRESH_TOKEN="ewogICJ0eXBlIjogInJlZnJlc2giLAogICJuYW..."
  ```

