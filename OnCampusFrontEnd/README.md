# OnCampus
It is a site for connecting all the students of BUET through a common platform to organize their daily necessary needs like posting academic activities, voting for a particular purpose, notices that are done through many third party apps by just one platform.

Club activities, competitions, seminars, hall related activities will be easily accessible.

![logo](https://github.com/user-attachments/assets/04777759-4c06-4bb0-ab13-a2c76423afe1)

## Motivation
- Educational and Social platform for an university for
  -   Optimized control
  - Student’s social media distraction decrease
- Using a common platform instead of using multiple third party apps
- Easy and organized access to necessary notices and events

## Key Functionalities

### 1. Post Sharing and Editing in Different Groups

Users can share and edit posts across four different types of groups:

- **Public Group**:
  - Open to all users.
  - Posts shared are visible to everyone.
  
- **Batchwise Groups**:
  - Posts are visible to users from a specific batch (e.g., Class of 2024).
  
- **Department-wise Groups**:
  - Posts are visible to users within a specific department (e.g., Computer Science).
  
- **Batch & Department-wise Groups**:
  - Posts are visible to users within a specific batch and department (e.g., Computer Science, Class of 2024).

**Features**:
- Create, edit, and delete posts.
- Rich text formatting (bold, italic, lists, etc.).
- Group-specific visibility ensures content is shared with the right audience.

---

### 2. Parallel File and Image Uploading, Editing, Deleting

- Users can upload multiple files and images simultaneously.
- Real-time progress tracking for uploads.
- **Editing**:
  - Replace or update uploaded files and images.
- **Deleting**:
  - Users can delete previously uploaded files or images.

---

### 3. Nested Comments like Reddit, Editing and Deleting Comments

- Supports **nested comments** with multiple levels of replies (similar to Reddit).
- **Edit Comments**:
  - Users can edit their comments at any level of nesting.
- **Delete Comments**:
  - Users can delete their own comments, with options for soft or hard delete.

---

### 4. JavaScript-Based Editing Text Box

- Rich text editor built with JavaScript for inline editing.
- **Features**:
  - Real-time text editing with support for bold, italic, underline, etc.
  - Live preview of changes.

---

### 5. Add Votes and Polls, Editing and Deleting

- Users can create **polls** and allow others to vote.
- **Editing**:
  - Users can edit the poll options or questions after creation.
- **Deleting**:
  - Polls can be deleted by the creator or an admin.
  
---

### 6. Notice Add and Show, Edit

- **Notices** can be added by authorized users (e.g., CR).
- Notices are visible to relevant groups.
- **Editing**:
  - Notices can be edited for content updates.

---

### 7. Club Info Show

- Users can view detailed information about various campus **clubs**.
- Includes club descriptions, member lists, upcoming events, and announcements.

---

### 8. Add Club and Edit

- Admins can **add new clubs** to the platform.
- **Editing**:
  - Club information (name, description, etc.) can be updated by club admins.

---

### 9. Event Add and Edit, Flexible Event Calendar Show and Adding Notification in Google Calendar

- Users can **add new events**.
- **Editing**:
  - Event details (title, date, description) can be updated.
- **Flexible Calendar**:
  - A user-friendly calendar displays upcoming events with filtering options.
- **Google Calendar Integration**:
  - Users can add event notifications to their Google Calendar directly from the platform.

---

### 10. Assign Roles to Users by Admin for Access Rights

- Admins can **assign roles** to users, such as:
  - BR
  - CR
  - USER
  - ADMIN
- Admins can **assign club roles** to users, such as:
  - PRESIDENT
  - VICE_PRESIDENT
  - GENERAL_SECRETARY
  - ASSISTANT_GENERAL_SECRETARY
  - SECRETARY
  - JOINT_SECRETARY
  - OFFICE_SECRETARY
  - EXECUTIVE
  - GENERAL
- **Role-based access control** allows users different levels of access based on their roles.

---

### 11. 360 degree Campus Tour

- A **360 degree  campus tour** feature allowing users to explore the campus online.
- Interactive walkthroughs with 360 degree pictures (buildings, landmarks).

## Technology Stack

### Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Component Library**: Material Tailwind
- **Text Box**: jodit-react (JavaScript-based rich text editor)
- **PDF Viewer**: react-pdf
- **360° Virtual Tour**: react-photo-sphere-viewer
- **Language**: TypeScript

### Backend
- **Backend Framework**: Node.js, Express
- **Architecture**: Microservice Architecture
  - **API Gateway**
  - **Service Registry**
  - **Microservices**:
    - User Service
    - Post Service
    - Event Service
- **Authentication**:
  - Keycloak (Dockerized)
  - NextAuth.js
  - JSON Web Tokens (jsonwebtoken)
- **ORM**: Prisma ORM
- **Security**:
  - Secure Express.js app using Helmet
  - SSL Certificate: Namecheap
- **Database**: PostgreSQL (hosted on Supabase)
- **File Storage**: Edgestore
- **Google Calendar Integration**: Google Cloud API

### DevOps and Deployment
- **Domain**: Purchased from Namecheap
- **SSL Certificate**: Provided by Namecheap
- **Deployment**:
  - MS Azure Virtual Machines (Backend micro-services & Frontend)
  - Supabase for PostgreSQL database hosting
- **Containerization**: Docker (for Keycloak)

### Tools and Utilities
- **Version Control**: Git, GitHub
- **Package Manager**: npm

### API Documentation
- **postman**

## Installation instructions
### Clone the repository:
```
git clone https://github.com/nafiislam/OnCampusFrontEnd.git
```
## Navigate to the project directory:
```
cd OnCampusFrontEnd
```
### First install all dependencies using the following command:
```
npm install
```

### Then run the following command to execute the website:
```bash
npm run dev
```

### KeyCloak installation

- **Pull and run the docker image**

```
docker pull nafiislam964/oncampus:0.0.4.RELEASE
docker run -d -p 4000:8080 -e KEYCLOAK_ADMIN=oncampusbuet@gmail.com -e KEYCLOAK_ADMIN_PASSWORD=admin nafiislam964/oncampus:0.0.4.RELEASE start-dev
```
### Access the application:
Open your browser and navigate to http://localhost:3000.
