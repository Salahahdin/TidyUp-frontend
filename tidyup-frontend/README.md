# TidyUp Frontend

UI for the cleaning TODO app (React + TypeScript + Vite + MUI).

## Setup

```powershell
cd tidyup-frontend
npm install
```

## Run (tryb mock - bez backendu)

Upewnij się, że w pliku `.env` masz:

```
VITE_MOCK_API=true
```

Następnie:

```powershell
npm run dev
```

Otwórz http://localhost:5173  
Zaloguj się dowolnym emailem z listy mock (np. `admin@tidyup.pl`, hasło dowolne).

## Run (z backendem Spring)

W pliku `.env`:

```
VITE_API_URL=http://localhost:8080
VITE_MOCK_API=false
```

```powershell
npm run dev
```

## Build

```powershell
npm run build
```

