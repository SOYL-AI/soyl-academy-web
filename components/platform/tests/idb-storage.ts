/**
 * Device storage for the test player's autosave queue (ADR-018 §1). IndexedDB, not localStorage: written
 * answers are free text, and WEB-5 keeps localStorage to `soyl_guest_v1` and UI preferences; WEB-10 allows
 * the test player's own offline queue, cleared on submit and on logout (`clearAllTestQueues`).
 * Falls back to memory when IndexedDB is unavailable (some private modes): the attempt still autosaves,
 * it just cannot survive a reload while offline.
 */
import { MemoryQueueStorage, type QueueSnapshot, type QueueStorage } from './autosave';

export const TEST_QUEUE_DB = 'soyl_tests';
const STORE = 'attempt_queue';

function hasIdb(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
}

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(TEST_QUEUE_DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE, { keyPath: 'attemptId' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('indexedDB blocked'));
  });
}

function tx<T>(db: IDBDatabase, mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const req = run(t.objectStore(STORE));
    let value: T;
    req.onsuccess = () => {
      value = req.result;
    };
    t.oncomplete = () => resolve(value);
    t.onerror = () => reject(t.error ?? req.error);
    t.onabort = () => reject(t.error ?? new Error('aborted'));
  });
}

export class IdbQueueStorage implements QueueStorage {
  private db: Promise<IDBDatabase> | null = null;

  private conn(): Promise<IDBDatabase> {
    if (!this.db) {
      this.db = open().catch((err) => {
        this.db = null;
        throw err;
      });
    }
    return this.db;
  }

  async load(attemptId: string): Promise<QueueSnapshot | null> {
    const db = await this.conn();
    return ((await tx(db, 'readonly', (s) => s.get(attemptId))) as QueueSnapshot | undefined) ?? null;
  }

  async save(snapshot: QueueSnapshot): Promise<void> {
    const db = await this.conn();
    await tx(db, 'readwrite', (s) => s.put(snapshot));
  }

  async clear(attemptId: string): Promise<void> {
    const db = await this.conn();
    await tx(db, 'readwrite', (s) => s.delete(attemptId));
  }
}

export function createQueueStorage(): QueueStorage {
  return hasIdb() ? new IdbQueueStorage() : new MemoryQueueStorage();
}

/** WEB-9/WEB-10: logout removes every attempt queue from this device. */
export async function clearAllTestQueues(): Promise<void> {
  if (!hasIdb()) return;
  await new Promise<void>((resolve) => {
    try {
      const req = indexedDB.deleteDatabase(TEST_QUEUE_DB);
      req.onsuccess = req.onerror = req.onblocked = () => resolve();
    } catch {
      resolve();
    }
  });
}
