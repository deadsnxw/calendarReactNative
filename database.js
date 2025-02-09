import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('control.db');
}

export const createTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                date TEXT NOT NULL,
                user TEXT NOT NULL
            );
        `);
        console.log('Table created')
    } catch (error) {
        console.error("Error creating table:", error)
    }
}

export const insertEvent = async (name, date, user) => {
    if (!name || !date || !user) {
        return;
    }
    const database = await openDatabase();
    try {
        const result = await database.runAsync('insert into events (name, date, user) values (?, ?, ?)', name, date, user);
        console.log('Event inserted with id:', result.lastInsertRowId);
    } catch (error) {
        console.error('Error insert event:', error);
    }
}

export const fetchEvents = async (user) => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync('select * from events where user = ?', user);
        console.log('All Events:', allRows);
        return allRows;
    } catch (error) {
        console.error('Error fetching events:', error)
    }
};

export const updateEvent = async (id, name) => {
    if (!id || !name) {
        return;
    }
    const database = await openDatabase();
    try {
        const res = await database.runAsync('update events set name = ? where id = ?', name, id)
        console.log('Event updated: ', res);
    } catch (error) {
        console.error('Error updating event: ', error)
    }
}

export const deleteEvent = async (id) => {
    const database = await openDatabase();
    if (!id) {
        return;
    }
    try {
        const result = await database.runAsync('delete from events where id = ?', id);
        console.log('Event deleted:', result);
    } catch (error) {
        console.error('Error deleting event: ', error)
    }
}