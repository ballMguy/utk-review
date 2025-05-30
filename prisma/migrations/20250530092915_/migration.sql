-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Teacher" ("createdAt", "firstName", "id", "lastName", "updatedAt") SELECT "createdAt", "firstName", "id", "lastName", "updatedAt" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_id_key" ON "Teacher"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
