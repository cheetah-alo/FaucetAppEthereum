---
cover: >-
  https://images.unsplash.com/photo-1544383835-bda2bc66a55d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZXxlbnwwfHx8fDE2OTQ4OTU5Nzd8MA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# 👾 Database Connection Guide

## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/).&#x20;

This repository provides instructions on how to connect to different databases using Docker and DBeaver. It includes a Docker Compose setup to connect to various databases, including MYSQL, SQL Server, Oracle, and PostgreSQL. Additionally, you'll learn how to load data from the Northwind database and set up a web server to access these databases.

## Objectives

1. **Install Different Databases in Docker:**
   * MYSQL
   * SQL Server
   * Oracle
   * PostgreSQL
2. **Load Data from the Northwind Database**
3. **Create a Web Server to Access the Different Databases**

## Steps for SQL (MySQL, SQL Server, Oracle, PostgreSQL)

#### 1. Create a `docker.yaml` File

Create a `docker.yaml` file to define the Docker containers and directory structure for your application.

#### 2. Execute Docker Compose

Run the following command to start the Docker containers and your application directory:

```bash
bashCopy codedocker-compose up -d
```

Alternatively, you can execute separate Docker commands to run each database container individually. For example, to run a MySQL container:

```bash
bashCopy codedocker run --name curso-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=YOUR-PASSWORD -d mysql:8.0.28
```

#### 3. Check Running Containers

You can verify that the containers are running by executing:

```bash
bashCopy codedocker ps
```

#### 4. Connect to the Database Using DBeaver

1. Open DBeaver and connect to the database container.
2. Configure the necessary database settings, including connection details and credentials.
3. If prompted, download and install any required database drivers.

#### 5. Test the Database Connection

Test the database connection using DBeaver. If you encounter a "Public Key Retrieval is not allowed" error, follow the instructions provided in this [guide](https://smarttechways.com/2022/07/22/mysql-public-key-retrieval-is-not-allowed/) to resolve it.

#### 6. Load the Northwind Database

1. Download the Northwind database ZIP file from [here](https://www.aspsnippets.com/Handlers/DownloadFile.ashx?File=9cb579c6-86db-4596-84c3-d549428fdcf5.zip).
2. Copy and paste the downloaded database file into the appropriate directory.
3. Execute the database script to load the Northwind database. Read and confirm any prompts that appear during the script execution.

#### 7. Access the Databases in Your Application

You can now access and interact with the connected databases within your application. Customize your application to meet your specific use cases.
