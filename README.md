# DevTeamCIX-DiscordBot

Discord bot for the DevTeamCIX of the UTP university

# Requeriments

- nodejs v18+
- MongoDB (solo si no tienes una base de datos externa)

# Set-up development environment

1. Clonar el repositorio:

```
git clone git@github.com:luisBazanDev/DevTeamCIX-DiscordBot.git
```

2. Entrar al directorio del repositorio

```
cd ./DevTeamCIX-DiscordBot
```

3. Instalar las dependencias

```
npm install
```

4. Instalar las dependencias de desarrollo

```
npm install -D
```

5. Correr el bot en modo desarrollo

```
npm run dev
```

6. Crear una copia del archivo `example.env` y llamarlo `.env`

To Do's

- [ ] Log system
- [ ] Welcome system
- [ ] Experience system
- [ ] User information system
- [ ] Polls system
- Projects manager
  - [x] Project model
  - [ ] Role manager
  - [ ] Members manager
  - [ ] Create project method
- Configs files
  - [x] guils
  - [ ] `...`
- Handlers
  - Event handler
    - [x] Ready
    - [x] Application command interaction
    - [x] Modal submit interactions
    - [ ] Create message
    - [ ] `...`
  - Command handler
    - [x] example
    - [x] edit-info
    - [x] information
    - [x] create-project
    - Project
      - [x] list
    - [ ] `...`
  - Modal handler
    - [ ] create project
    - [ ] `...`
- Database
  - Models
    - [x] Users
      - displayName
      - username
      - email
      - universityCode
      - information
        - grade
        - social
        - description
        - technologies
        - projects
        - level
        - exp
      - createdAt
      - updateAt
    - [x] Projects
      - name
      - description
      - channels
      - roles
      - administrators
      - state
      - createdAt
      - updateAt
