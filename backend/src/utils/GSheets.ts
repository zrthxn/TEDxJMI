import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client } from 'googleapis-common'


export default class GSheets {
  readonly SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
  readonly CREDENTIALS_PATH = './auth/credentials.json'
  readonly TOKEN_PATH = './auth/Tokens/gsheets.json'

  private authorize() {
		return new Promise((resolve:((client:OAuth2Client)=>any), reject) => {
			fs.readFile(this.CREDENTIALS_PATH, (err, content) => {
				if (err) return console.log('Error loading client secret file:', err)
				
				const credentials = JSON.parse(content.toString())
				const { client_secret, client_id, redirect_uris } = credentials.installed
				const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

				fs.readFile(this.TOKEN_PATH, (e, token) => {
					if (e) {
						this.getNewToken(oAuth2Client).then((auth) => {
							resolve(auth)
						})
					} else {
						oAuth2Client.setCredentials(JSON.parse(<string><unknown>token))
						resolve(oAuth2Client)
					}
				})
			})
		})
	}

	private getNewToken(oAuth2Client:OAuth2Client) {
		return new Promise((resolve:((client:OAuth2Client)=>any), reject) => {
			const rlx = readline.createInterface({ input: process.stdin, output: process.stdout })
			rlx.question('Invalid or no token found. Generate new? (Y/N)...', (code) => {
				if (code === 'Y' || code === 'y') {
					const authUrl = oAuth2Client.generateAuthUrl({
						access_type: 'offline',
						scope: this.SCOPES,
					})
					console.log('Authorization URL:', authUrl)
					const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
					rl.question('Validation code: ', (auth) => {
						rl.close()
						oAuth2Client.getToken(auth, (err, token) => {
							if (err) return console.error('Error retrieving access token', err)
							oAuth2Client.setCredentials(token)
							fs.writeFile(this.TOKEN_PATH, JSON.stringify(token, null, 2), (e) => {
								if (e) return reject(e)
								console.log('Token stored to', this.TOKEN_PATH)
								resolve(oAuth2Client)
							})
						})
					})
				}
			})
		})
  }

  TestGSheets = async () => {
    console.log('Testing Sheets API')
    try {
      const auth = await this.authorize()
      const testObj = google.sheets({version: 'v4', auth})
      if (testObj!=null) return({ success: true })
    } catch(err) {
      return Promise.reject({ success: false, errors: err })
    }
  }
  
  AppendToSpreadsheet = (payload:ISpreadsheetEntryItem[]) => {
    return new Promise((resolve:((r,e?)=>any),reject)=>{
      let results = [], errors = []
      this.authorize().then((auth)=>{
        payload.forEach(entry => {
          google.sheets({version: 'v4', auth}).spreadsheets.values.append({
            spreadsheetId: entry.ssId,
            
            range: entry.sheet,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            
            // resource: {
            //   majorDimension: "ROWS",
            //   values: [entry.values]
            // },
            auth: auth
          }, function(err, response) {
            if (!err) {
              results = [...results, response]
              console.log("Spreadsheet Payload Delivered")
            } else {
              errors = [...errors, err]
              console.log(errors)
            }
          }) 
        })
        resolve(results, errors)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
}

interface ISpreadsheetEntryItem {
  ssId: string
  sheet: string
  values: any[]
}
