import type * as types from './types'

/**
 * 发送 IndexedDB 打开请求
 */
export const requestDB = (DBParams: types.RequestDBParams): types.RequestDBReturn => {
  let DB: IDBOpenDBRequest | null

  const { name, version, timeout } = DBParams.initParams

  return (version_?: number) => {
    return new Promise((resolve, reject) => {
      if (!DB) {
        DB = indexedDB.open(name, version_ ?? version)
      }

      DB.onsuccess = (evt) => {
        const db = (evt.currentTarget as IDBOpenDBRequest).result

        DB = null

        resolve(db)
      }

      DB.onerror = (evt) => {
        DB = null

        reject((evt.target as IDBOpenDBRequest).error)
      }

      DB.onupgradeneeded = (evt) => {
        const db = (evt.currentTarget as IDBOpenDBRequest).result

        DB = null

        createAllStore({ db, storeList: DBParams.storeParamsList })

        setTimeout(() => {
          resolve(db)
        }, (timeout * 1) / 2)
      }

      setTimeout(() => {
        DB = null
        reject('Request IndexedDB Timeout!')
      }, timeout)
    })
  }
}

/**
 * 创建全部 Store
 */
export const createAllStore = (params: types.CreateAllStoreParams) => {
  const { db, storeList } = params

  if (!db || !storeList || !storeList.length) return

  storeList.forEach((store) => {
    createStore({ db, ...store })
  })
}

/**
 * 创建 Store
 */
export const createStore = (params: types.CreateStoreParams) => {
  const { db, storeName, keyPathOptions, indexList } = params

  if (db.objectStoreNames.contains(storeName)) return false

  const store = db.createObjectStore(storeName, keyPathOptions)

  indexList?.forEach(({ name, options }) => {
    store.createIndex(name, name, options)
  })

  return store
}

/**
 * 删除 Store(ObjectStore)
 */
export const deleteStore = (params: types.DeleteStoreParams) => {
  const { db, storeName } = params

  if (!db.objectStoreNames.contains(storeName)) return false

  db.deleteObjectStore(storeName)

  console.info(`[indexedDB] Store ${storeName} is deleted!`)

  return true
}

/**
 * 建立事务获取 store(ObjectStore)
 */
export const getStore = (params: types.GetStoreParams) => {
  const { db, storeName, mode } = params

  let tx: IDBTransaction | undefined = void 0

  try {
    tx = db.transaction(storeName, mode)
  } catch (err) {
    throw new Error(`[IndexDB] Store named ${storeName} cannot be found in the database`)
  }

  return tx.objectStore(storeName)
}

/**
 * 新增
 */
export const add = (params: types.AddParams) => {
  const { store, data } = params

  return new Promise((resolve, reject) => {
    const req = store.add(data)

    req.onsuccess = resolve
    req.onerror = reject
  })
}

/**
 * 改
 */
export const put = (params: types.PutParams) => {
  const { store, data } = params

  return new Promise((resolve, reject) => {
    const req = store.put(data)

    req.onsuccess = resolve
    req.onerror = reject
  })
}

/**
 * 根据主键 keyPath 查询
 */
export const get = (params: types.GetParams) => {
  const { store, keyPathValue } = params

  return new Promise((resolve, reject) => {
    const req = keyPathValue ? store.get(keyPathValue) : store.getAll()

    req.onsuccess = (evt) => {
      resolve((evt.target as IDBRequest).result)
    }
    req.onerror = reject
  })
}

/**
 * 根据索引 Index 查询（游标）
 */
export const getByIndex = (params: types.GetByIndexParams) => {
  const { store, indexName, indexValue, direction } = params

  return new Promise((resolve, reject) => {
    const req = store.index(indexName).openCursor(indexValue, direction)
    const list: any[] = []

    req.onsuccess = (evt) => {
      const cursor: IDBCursorWithValue = (evt.target as IDBRequest).result
      if (cursor) {
        list.push(cursor.value)
        cursor.continue()
      } else {
        resolve(list)
      }
    }

    req.onerror = reject
  })
}

/**
 * 根据主键 keyPath 删除
 */
export const remove = (params: types.RemoveParams) => {
  const { store, keyPathValue } = params

  return new Promise((resolve, reject) => {
    const req = store.delete(keyPathValue)

    req.onsuccess = (evt) => {
      resolve((evt.target as IDBRequest).result)
    }
    req.onerror = reject
  })
}

/**
 * 根据索引 Index 删除（游标）
 */
export const removeByIndex = (params: types.RemoveByIndexParams) => {
  const { store, indexName, indexValue, direction } = params

  return new Promise((resolve, reject) => {
    const req = store.index(indexName).openCursor(indexValue, direction)

    req.onsuccess = (evt) => {
      const cursor: IDBCursorWithValue = (evt.target as IDBRequest).result

      if (cursor) {
        const reqDelete = cursor.delete()

        reqDelete.onerror = () => {
          console.error(`[IndexDB] Failed to delete the record ${cursor}`)
        }
        reqDelete.onsuccess = () => {}

        cursor.continue()
      } else {
        resolve({ delete: 'done' })
      }
    }
    req.onerror = reject
  })
}
