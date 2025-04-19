# 🐉 Phantastic Beasts and Where We Found Them

**Phantastic Beasts and Where We Found Them** is a crowd-sourced monster spotter's guide that matches mythical species to real-world locations. Users can log their sightings, view beast reports from around the world, and keep all their cryptid-hunting notes in one place.

## 🔮 Features

- Add and manage sightings of mythical creatures  
- Browse reported locations of various species  
- Search and filter reports by species, region, or date  
- Store personal notes for each sighting  
- Simple and intuitive interface for enthusiasts and experts alike

## 🌍 Live Demo & Repository

👉 [Visit the app on Heroku](https://your-heroku-app-url.com)  
👉 [Full GitHub Repository](https://github.com/macfarley/Phantastic-Beasts)

## ⚙️ Tech Stack

- **Node.js** – Backend runtime  
- **Express.js** – REST API framework  
- **Mongoose** – MongoDB object modeling for Node.js  
- **MongoDB Atlas** – Cloud database storage  
- **Heroku** – App hosting

## 🗺️ Site Map

The app is structured with a public landing page, login/signup functionality, and user-only views for managing sightings. Navigation allows filtering sightings by **location** or **creature type**.

![Site Map](./Phantastic%20Site%20Map.png)

## 🧬 Entity Relationship Diagram (ERD)

The app includes three core models: `User`, `Species`, and `Locality`. Relationships are built around sightings and shared metadata.

![ERD](./Phantastic%20ERD.png)

### ⚡ Model Overview

#### `User`
- `Username`, `Password`, `Hometown`
- `Sightings` (Array of associated reports)

#### `Species`
- `Name`, `Category`, `Location[]`, `Size`, `Notes[]`
- `SpottedBy[]` (Users who reported sightings)

#### `Locality`
- `Name`, `Kingdom`, `HometownOf[]`, `Species[]`

## 📫 API Overview

| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| GET    | `/beasts`        | Get all reported beasts        |
| POST   | `/beasts`        | Add a new beast sighting       |
| GET    | `/beasts/:id`    | View a specific sighting       |
| PUT    | `/beasts/:id`    | Edit a sighting                |
| DELETE | `/beasts/:id`    | Delete a sighting              |

## 🚀 Deployment

The app is automatically deployed to Heroku. No installation is required—just visit the link and start spotting!

## 👥 Creator

**Macfarley**  
Founder of [Extra G Data Solutions](https://www.linkedin.com/in/travis-mccoy-630775b9/)

## 🧙‍♂️ Contributing

Found a bug, have a feature idea, or want to add some magic of your own?  
Fork the repo, make your changes, and open a pull request!

## 📄 License

MIT License — feel free to fork, clone, and conjure your own version.
