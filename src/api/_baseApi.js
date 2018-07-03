import createApi from 'create-api'

export default class {
  constructor (ctx = null) {
    this.http = createApi(ctx)
  }
}
