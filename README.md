# Kindly App
(Works only with Metropolia VPN turned on)
### Link to the app: [Kindly.](https://users.metropolia.fi/~juanros/Kindly/)
### Accept https first: [Link](https://10.120.32.95/)

### Links to back-end "API" in use: 

(Works only with Metropolia VPN turned on)
1. [API-Server](http://10.120.32.95/api-server/api/v1)
2. [AUTH-Server](https://10.120.32.95/auth-server/api/v1/)
3. [Upload-Server](https://10.120.32.95/upload-server/api/v1/)

- Link to auth API docs:
[AUTH-Docs](https://10.120.32.95/auth-server/)

## Tech Stack
### Client
- React Native
- TypeScript
- Expo
- React Native Papers (RN Library)


### Server
- RestAPI
- TypeScript



## Database 
- Created with MYSQL script provided here: 
[link to script](/db/kindly-db.sql)

- DB Diagram image: 
![image](/db/Kindly-diagram-2.jpg)


## Functionalities / bugs
### Functionalities: 
- CRUD Operations
- Post Approvals

### Bugs:
- Some bugs

## Study References
- [React Native Docs](https://reactnative.dev/docs/getting-started) 
- [Expo Docs](https://docs.expo.dev/)
- [React Native Papers Docs](https://callstack.github.io/react-native-paper/)
- [Metropolia old materials](https://github.com/ilkkamtk/hybridisovellukset)

# Kindly CI/CD

### Link to CI/CD folder: [.github](/.github/workflows/KindlyTest.yml)

### Link to Testing folders:
- [API Test](/server/api-server/test/) 
- [Auth Test](/server/auth-server/test/) 

### This workflow uses docker mysql container and test:
 - API server
 - Auth server

## CI/CD Test stack:
 - Supertest
 - Jest
 - Docker
 - MySQL
 - GitHub actions
