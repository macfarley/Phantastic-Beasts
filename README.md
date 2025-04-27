# 🐉 Phantastic Beasts and Where We Found Them

**Phantastic Beasts and Where We Found Them** is a crowd-sourced monster spotter's guide that matches mythical species to real-world locations. Users can log their sightings, view beast reports from around the world, and keep all their cryptid-hunting notes in one place.

## 🔮 Features

- Add and manage sightings of mythical creatures  
- Browse reported locations of various species  
- Search and filter reports by category.
- Store personal notes for each sighting  
- Simple and intuitive interface for enthusiasts and experts alike

## Accessability Concerns
- Meets **WCAG 2.1 AAA** contrast guidelines for improved readability. [Check contrast here](https://webaim.org/resources/contrastchecker/?fcolor=3B2A1A&bcolor=F5DEB3)
- Buttons and links are accessable by tab through and 44 pixels on smallest side.

## 🌍 Live Demo & Repository

👉 [Visit the app on Heroku](https://phantastic-beasts-d585c0bc1aa9.herokuapp.com/)  
👉 [Full GitHub Repository](https://github.com/macfarley/Phantastic-Beasts)

## ⚙️ Tech Stack

- **Node.js** – Backend runtime  
- **Express.js** – REST API framework  
- **Mongoose** – MongoDB object modeling for Node.js  
- **MongoDB Atlas** – Cloud database storage  
- **Heroku** – App hosting

## Site Structure

The app is structured with a public landing page, login/signup functionality, and user-only views for managing sightings. Navigation allows filtering sightings by **creature type**.


## 🧬 Entity Relationship Diagram (ERD)

The app includes three core models: `User`, `Species`, and `Locality`. Relationships are built around sightings and shared metadata.

![ERD](/public/images/PB-mvp-ERD.png)

### ⚡ Model Overview

#### `User`
- `Username`, `Password` (hashed and encrypted for security), `Hometown`
- `Sightings` (Array of associated reports)

#### `Creature`
- `Name`, `Category`, `Size`, `Habitat`, `Sightings` (an array of sightings referencing this Creature)

#### `Location`
- `City`, `Kingdom`, `HomeOf[]`, `Sightings[]`

#### `Sightings`
- `User`, `Location`, `Creature`, `Encounter`, `Notes`
## 📫 API Overview

| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| GET    | `/creatures`        | Get all reported beasts        |
| POST   | `/sightings/new`        | Add a new beast sighting       |
| GET    | `/creatures/species/:name`    | View a specific Creature       |
| PUT    | `/sightings/edit`    | Edit a sighting                |
| DELETE | `/sightings/edit`    | Delete a sighting              |

## 🚀 Deployment

The app is automatically deployed to Heroku. No installation is required—just visit the link and start spotting!

## 👥 Creator

**Macfarley**  
Founder of [Extra G Data Solutions](https://www.linkedin.com/in/travis-mccoy-630775b9/)

## 🧙‍♂️ Contributing

Found a bug, have a feature idea, or want to add some magic of your own?  
Fork the repo, make your changes, and open a pull request!

## 📄 Licenses

MIT License — feel free to fork, clone, and conjure your own version.
Special thanks to: phoenix icon by icon8
https://fonts.google.com/specimen/Qwigley/license
