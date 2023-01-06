export interface CustomerConstructorParams {
  requestDBParams: RequestDBParams
}

export interface RequestDBParams {
  initParams: InitDBParams
  storeParamsList: StoreParams[]
}

export type RequestDBReturn = (version_?: number) => Promise<IDBDatabase>

export interface InitDBParams {
  name: string
  version: number
  timeout: number
}

export interface StoreParams {
  storeName: string
  keyPathOptions: IDBObjectStoreParameters
  indexList?: {
    name: string
    options?: IDBIndexParameters
  }[]
}

export interface CreateStoreParams extends StoreParams {
  db: IDBDatabase
}

export interface CreateAllStoreParams {
  db: IDBDatabase
  storeList?: StoreParams[]
}

export interface DeleteStoreParams {
  db: IDBDatabase
  storeName: string
}

export interface GetStoreParams {
  db: IDBDatabase
  storeName: string
  mode: IDBTransactionMode
}

export interface AddParams {
  store: IDBObjectStore
  data: any
}

export interface PutParams {
  store: IDBObjectStore
  data: any
}

export interface GetParams {
  store: IDBObjectStore
  keyPathValue?: IDBValidKey | IDBKeyRange
}

export interface GetByIndexParams {
  store: IDBObjectStore
  indexName: string
  indexValue: IDBValidKey | IDBKeyRange
  direction?: IDBCursorDirection
}

export interface RemoveParams {
  store: IDBObjectStore
  keyPathValue: IDBValidKey | IDBKeyRange
}

export interface RemoveByIndexParams {
  store: IDBObjectStore
  indexName: string
  indexValue: IDBValidKey | IDBKeyRange
  direction?: IDBCursorDirection
}

export interface FormParams {
  name: string
  email: string
}
