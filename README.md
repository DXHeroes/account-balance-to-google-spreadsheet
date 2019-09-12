# Account Balance to Google Spreadsheet

## Description

Modular app to fetch transaction history and account balance from the bank API and write to Google Spreadsheet.

Written in [Nest](https://github.com/nestjs/nest) framework using TypeScript.

**Currently supported banks:**

<div style="text-align: center">
  <img src="https://assets.erstegroup.com/content/sites/cz/csas/www_csas_cz/cs/zpravy-z-banky/2017/10/18/ceska-sporitelna-zacina-pouzivat-nove-logo/jcr:content/mainParsys/textwithimage_1762737388/image.fitIn.w360.jpg/15081581954211508157086169.jpg" alt="Česká Spořitelna a.s." height="100"/>
</div>


## Installation

```bash
$ npm install
```

## Configuration

- Create file `.env.development` in the root of repository

### 1. Google
- Go to https://console.developers.google.com
- Create new project called e.g. `AccBalanceApp`
- Go to "Library" and add:
  - Google Drive API
  - Google Sheets API
- Go to "Credentials"
  - Click to create new "Service account key"
  - In the dropdown Service account choose "New service account" and set the Name and Role ("Project > Viewer"). Key type has to be JSON.
  - Click to "Create" and download the JSON file
- Encode the content of the file with Base64 and save it to the `.env.development` as `GOOGLE_AUTH` key

```yaml
GOOGLE_AUTH="YmFzZTY0IGVuY29kZWQgSlNPTiBmaWxlIGFzIGEgc3RyaW5nIGhlcmU="
```

- Go to https://drive.google.com and create new empty Spreadsheet
- Share the spreadsheet to the email in the Google Credentials JSON file (as `client_email`) with edit permissions.
- Copy the ID of the Spreadsheet from the URL
e.g.
```
https://docs.google.com/spreadsheets/d/5BxICDTRQpIsPK_tcJJm4Ni9gjtPsDHErXE_m-dDQM4c/edit

# id == "5BxICDTRQpIsPK_tcJJm4Ni9gjtPsDHErXE_m-dDQM4c" (YOUR ID DIFFERS!)
```
- Save the ID to the `.env.development` file as `GOOGLE_SHEET_ID` key

```yaml
GOOGLE_SHEET_ID=5BxICDTRQpIsPK_tcJJm4Ni9gjtPsDHErXE_m-dDQM4c
```

### 2. Banks
- [Guide for Česká Spořitelna a.s.](/docs/ceska_sporitelna.md)

### 3. App
🎉🎉🎉 That's all! Congrats! 🎉🎉🎉

Now run the app with `yarn start:dev` or `npm start:dev` and the CRON should run after 10 seconds.

## Contribution

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
