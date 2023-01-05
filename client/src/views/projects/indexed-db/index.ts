class Customer {
  /**
   * 数据库名称
   */
  dbName: string

  constructor(dbName: string) {
    this.dbName = dbName

    if (!window.indexedDB) {
      window.alert('浏览器不支持 IndexedDB 数据库，功能不可用')
    }
  }

  /**
   * 删除数据库所有行
   * @memberof Customer
   */
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1)

    request.onerror = (event) => {
      console.log('removeAllRows - Database error: ', event)
    }

    request.onsuccess = (event: any) => {
      if (!event) return

      const db = event.target.result
      const txn = db.transaction('customers', 'readwrite')

      txn.onerror = (event: { target: { error: { code: any; message: any } } }) => {
        console.log('removeAllRows - Txn error: ', event.target.error.code, ' - ', event.target.error.message)
      }
      txn.oncomplete = (event: any) => {
        console.log('All rows removed!')
      }

      const objectStore = txn.objectStore('customers')
      const getAllKeysRequest = objectStore.getAllKeys()

      getAllKeysRequest.onsuccess = (event: any) => {
        getAllKeysRequest.result.forEach((key: any) => {
          objectStore.delete(key)
        })
      }
    }
  }

  /**
   * 初始数据库
   * @param {[object]} customerData 数据
   * @memberof Customer
   */
  initialLoad = (customerData: any[]) => {
    const request = indexedDB.open(this.dbName, 1)

    request.onerror = (event) => {
      console.log('initialLoad - Database error: ', event)
    }

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result
      const objectStore = db.createObjectStore('customers', { keyPath: 'userId' })

      objectStore.onerror = (event: { target: { error: { code: any; message: any } } }) => {
        console.log('initialLoad - objectStore error: ', event.target.error.code, ' - ', event.target.error.message)
      }

      // 创建索引以按名称和电子邮件搜索客户
      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('email', 'email', { unique: true })

      // 用初始行集填充数据库
      customerData.forEach(function (customer: any) {
        objectStore.put(customer)
      })
      db.close()
    }
  }
}

export default Customer
