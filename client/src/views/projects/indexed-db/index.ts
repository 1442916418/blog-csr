import { requestDB, add, remove, put, get, getStore } from './db'
import { RESULT as _ } from './constant'
import Message from './message'

import type * as types from './types'

const STORE_NAME = 'customers'
const DEFAULT_INIT_PARAMS = { name: 'customer_db', version: 1, timeout: 1500 }
const DEFAULT_STORE_PARAMS_LIST = [
  {
    storeName: STORE_NAME,
    keyPathOptions: { autoIncrement: true, keyPath: 'email' },
    indexList: [
      {
        name: 'name',
        options: { unique: false }
      },
      {
        name: 'email',
        options: { unique: true }
      }
    ]
  }
]

class Customer {
  /** 请求数据库 */
  private requestDB: types.RequestDBReturn | undefined
  /** 数据库 */
  private db: IDBDatabase | undefined
  /** 全局参数 */
  private params: types.CustomerConstructorParams

  constructor(
    params: types.CustomerConstructorParams = {
      requestDBParams: { initParams: DEFAULT_INIT_PARAMS, storeParamsList: DEFAULT_STORE_PARAMS_LIST }
    }
  ) {
    this.params = params
    this.requestDB = void 0
    this.db = void 0

    this.init()
  }

  private init() {
    Message.add(_.START)

    const reqDB = requestDB(this.params.requestDBParams)

    this.requestDB = reqDB

    reqDB()
      .then((database) => {
        Message.add(_.DB_INIT)
        this.db = database
      })
      .catch(() => {
        Message.add(_.NO_DB)
        this.db = void 0
      })
  }

  public handleAdd(data: types.FormParams, storeName = STORE_NAME) {
    Message.add(_.START)

    return new Promise((resolve, reject) => {
      if (this.db) {
        add({
          store: getStore({
            db: this.db,
            storeName,
            mode: 'readwrite'
          }),
          data
        })
          .then(() => {
            Message.add(_.ADD_SUCCESSFUL, _.END)
            resolve(true)
          })
          .catch(() => {
            Message.add(_.ADD_ERROR, _.END)
            reject()
          })
      } else {
        Message.add(_.ADD_ERROR, _.END)
        reject()
      }
    })
  }

  public handleRemove(keyPathValue: IDBValidKey | IDBKeyRange, storeName = STORE_NAME) {
    Message.add(_.START)

    return new Promise((resolve, reject) => {
      if (this.db) {
        remove({
          store: getStore({
            db: this.db,
            storeName,
            mode: 'readwrite'
          }),
          keyPathValue
        })
          .then(() => {
            Message.add(_.DELETE_SUCCESSFUL, _.END)
            resolve(true)
          })
          .catch(() => {
            Message.add(_.DELETE_ERROR, _.END)
            reject()
          })
      } else {
        Message.add(_.DELETE_ERROR, _.END)
        reject()
      }
    })
  }

  public handlePut(data: types.FormParams, storeName = STORE_NAME) {
    Message.add(_.START)

    return new Promise((resolve, reject) => {
      if (this.db) {
        put({
          store: getStore({
            db: this.db,
            storeName,
            mode: 'readwrite'
          }),
          data
        })
          .then(() => {
            Message.add(_.PUT_SUCCESSFUL, _.END)
            resolve(true)
          })
          .catch(() => {
            Message.add(_.PUT_ERROR, _.END)
            reject()
          })
      } else {
        Message.add(_.PUT_ERROR, _.END)
        reject()
      }
    })
  }

  public handleGetAll(storeName = STORE_NAME) {
    Message.add(_.START)

    return new Promise((resolve, reject) => {
      if (this.db) {
        get({
          store: getStore({
            db: this.db,
            storeName,
            mode: 'readwrite'
          })
        })
          .then((res) => {
            Message.add(_.GET_SUCCESSFUL, _.END)
            resolve(res)
          })
          .catch(() => {
            Message.add(_.GET_ERROR, _.END)
            reject()
          })
      } else {
        Message.add(_.GET_ERROR, _.END)
        reject()
      }
    })
  }
}

export default Customer
