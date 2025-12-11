\# Café Fausse – Full-Stack Restaurant Web App



A fictional neighbourhood bistro site built as a full-stack project with a Flask backend and a React frontend. The app lets guests browse the menu, make table reservations, and subscribe to a newsletter.



---



\## Tech Stack



\*\*Backend\*\*



\- Python 3

\- Flask

\- Flask-CORS

\- SQLAlchemy

\- PostgreSQL (or any SQL DB supported by SQLAlchemy)

\- python-dotenv



\*\*Frontend\*\*



\- React (Create React App)

\- JavaScript (ES6+)

\- CSS modules / custom styles



---



\## Project Structure



```text

cafe-fausse/

├── backend/

│   ├── app.py

│   ├── config.py

│   ├── database.py

│   ├── models.py

│   └── routes/

│       ├── \_\_init\_\_.py

│       ├── reservations.py

│       └── newsletter.py

├── frontend/

│   ├── public/

│   └── src/

│       ├── App.js

│       ├── App.css

│       ├── pages/

│       │   ├── Home.js

│       │   ├── Menu.js

│       │   ├── Gallery.js

│       │   ├── Reservations.js

│       │   └── About.js

│       └── components/

│           └── NewsletterSignup.js

└── .gitignore



