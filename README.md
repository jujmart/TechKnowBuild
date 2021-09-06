# TechKnowBuild

TechKnowBuild is an Instructables clone for people to find, share, and comment on instructions for how to build different technological items, such as computers, phones, tablets, and even their components like microchips. It is a fullstack React App made with a Redux state manager and a backend using Python, Flask, SQL-Alchemy, PostgresSQL and other technologies.

-   View the <a href='https://techknowbuild.herokuapp.com/'>TechKnowBuild</a> App Live

-   Reference to the TechKnowBuild <a href='https://www.github.com/jujmart/TechKnowBuild/wiki'>Wiki Docs</a>

| Table of Contents                                                        |
| ------------------------------------------------------------------------ |
| 1. [Features](#features)                                                 |
| 2. [Installation](#installation)                                         |
| 3. [Technical Implementation Details](#technical-implementation-details) |
| 4. [Future Features](#future-features)                                   |
| 5. [Contact](#contact)                                                   |
| 6. [Special Thanks](#special-thanks)                                     |

## Technologies

-   <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
-   <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
-   <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
-   <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
-   <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
-   <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
-   <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=ffd343" /></a>
-   <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
-   <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>
-   <a href="https://alembic.sqlalchemy.org/">Alembic</a>
-   <a href="https://aws.amazon.com/s3/?hp=tile&so-exp=below&ct=fs">S3 Amazon Web Services (AWS) API</a>

## Features

### Log In and Sign Up

![Sign Up](./readme-assets/images/signup.png)
![Login](./readme-assets/images/login.png)

### Home

The TechKnowBuild home page displays all projects by category
![Home Page](./readme-assets/images/home.png)

### View Project and Steps

View of single project title, photos, description, and associated steps
![Project Page](./readme-assets/images/project-page.png)

### Create Project

Add a new project to the site
![Create Project](./readme-assets/images/project-create.png)

### Edit Project

Edit a project on the site
![Edit Project](./readme-assets/images/project-edit.png)

### Create Step

Create a step on the site
![Create Step](./readme-assets/images/step-create.png)

### Edit Step

Edit a step on the site
![Edit Step](./readme-assets/images/step-edit.png)

### Delete Project/Step

Delete a project or step on the site using the associated buttons
![Delete](./readme-assets/images/delete.png)

## Installation

To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/jujmart/TechKnowBuild.git
```

2. Install Pipfile dependencies and create the virtual environment

```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:

```shell
pipenv shell
```

6. In the root folder, migrate tables to the database by running in the terminal:

```shell
flask db upgrade
```

7. In the root folder, seed the database by running in the terminal:

```shell
flask seed all
```

8. Start the flask backend in the `/` root directory

```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```shell
npm start
```

## Technical Implementation Details

### Updated Step Re-render

During this project, I was particularly happy when I was able to find a more efficient way to render updated information for a step on the project page without having to re-render every other step using the principles of React in conjunction with Redux. Rather than have my Redux state veer away from a normalized state, I added a local state variable that contained all of the ids of the steps that are to be shown on the project page. At first, I was relying on the Redux state to recognize a change in state and rerender the desired information on the page, however, because of the nesting of the normalized state, the changes were not being recognized and the old information remained on the page. I then added a thunk to get all of the steps on the page again even though I only needed to update the information for a single step. This is ultimately why I knew there had to be a more efficient way to populate the updated information on the page and discovered that a local state variable would be able to recognize the changes made more easily, and would allow a rerender of a single step rather than a rerender of every step on the page, creating a better user experience. The code I ended up using can be seen below:

```javascript
const project = useSelector((state) => state.projects[projectId]);
const [currentStepIds, setCurrentStepIds] = useState([]);

.
.
.

useEffect(() => {
	if (project) {
		setCurrentStepIds(project.stepIds);
	}
}, [project]);

.
.
.

<div className="step_container">
	{currentStepIds.map((stepId, stepNum) => (
		<Step
			key={stepId}
			stepId={stepId}
			stepNum={stepNum + 1}
			setCurrentStepIds={setCurrentStepIds}
		/>
	))}
</div>;
```

## Future Features

1. **Search** - search through project titles to find the desired tech build

2. **Youtube API** - project creators can house and show youtube videos on the site to give additional support to a project or step

3. **Multiple File Upload** - project creators can add more than one image or video as support for their project or step

4. **User Profile Page** - users can go to theirs or other users' profile pages to see the projects that they have created on the site and delete or edit more easily

## Contact

### Justice Martin

<a href="https://www.linkedin.com/in/justice-martin-34043340/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>
<a href="https://github.com/jujmart"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

jujmart12@gmail.com

## Special Thanks

-   Fellow peers who have given me support and community: [Andrew](https://github.com/andru17urdna), [Henry](https://github.com/hnrywltn), [Pierre](https://github.com/TheGuilbotine), [Lema](https://github.com/lemlooma), [Meagan](https://github.com/meagan13), [Simon](https://github.com/Simonvargas), [Michelle](https://github.com/michellekontoff), [Nico](https://github.com/nicopierson), [John](https://github.com/Jomix-13), [Manna](https://github.com/makon57), [Monte](https://github.com/theflaggship), [Kagen](https://github.com/KagenLH), [Jubin](https://github.com/Jubintgh), [Torrell](https://github.com/tkenned2020), [Irina](https://github.com/IrinaAmzashvili), [Joe](https://github.com/joejunkim), [Diana](https://github.com/dianabeatriztinoco), and [Justice](https://github.com/jujmart)
-   Mentors who have given me their time and effort: [Zach](https://github.com/zdwatts), [Olivia](https://github.com/OByrnes), [Ed](https://github.com/edherm), and [Javier](https://github.com/javiermortiz)
