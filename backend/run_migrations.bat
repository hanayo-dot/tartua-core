@echo off
REM Run database migrations for tartua

SET DB_HOST=localhost
SET DB_PORT=5432
SET DB_USER=postgres
SET DB_PASSWORD=clessy2225
SET DB_NAME=tartua

REM Create database if it doesn't exist
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -tc "SELECT 1 FROM pg_database WHERE datname = '%DB_NAME%'" | findstr /C:"1" >nul
if errorlevel 1 (
    echo Creating database tartua...
    psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "CREATE DATABASE tartua;"
) else (
    echo Database tartua already exists
)

REM Run migrations
echo Running migrations...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f internal/database/migrations/000002_create_users_table.up.sql
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f internal/database/migrations/000003_create_creators_table.up.sql
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f internal/database/migrations/000004_create_goals_table.up.sql
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f internal/database/migrations/000005_create_tasks_table.up.sql

echo All migrations completed!
pause
