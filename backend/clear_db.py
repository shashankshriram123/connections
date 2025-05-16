import sqlite3

conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()
cursor.execute("DELETE FROM connections")
conn.commit()
conn.close()

print("✅ All records deleted.")
